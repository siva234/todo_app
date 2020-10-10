import React , {useState, useEffect} from 'react';
import './App.css';
import styles from './components/Login/Login.module.css';

import { Tab, Tabs, Typography, Box, AppBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Login from './components/Login/Login';
import TodoMain from './pages/TodoMain/TodoMain';
import Social from './pages/Social/Social';
import Aboutme from './pages/AboutMe/Aboutme';
import { Modal, makeStyles, Button, Input } from '@material-ui/core';
import { auth } from './firebase';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [appUser, setAppUser] = useState(null);
  const classes = useStyles();
     const [modalStyle] = React.useState(getModalStyle);
     const [open, setOpen] = useState(false);
     const [openLogIn, setOpenLogIn] = useState(false);
     const [username, setUsername] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [user, setUser] = useState(null);
 

  
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleCallback(childUser){
    //this.setState({data: childData})
    setAppUser(childUser);
    console.log(appUser);
  };

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
          //Logged in
          console.log(authUser);
          setUser(authUser);         
        } else {
          //logged out
          setUser(null);
        }
      })
      return () => {
        //cleanup actions
        unsubscribe();
      }
    }, [user, username]);

    const handleClose = () => {
        setOpen(false);
    };

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            return authUser.user.updateProfile({
              displayName: username
            });
          })
          .catch((error) => alert(error.message))
          setOpen(false);
    };

    const logIn = (event) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username
          });
        })
        .catch((error) => alert(error.message))
        setOpenLogIn(false);
    };


  return (
    <div className="App">
      <div className="appHeader">
      <div className="Login">
            <Modal open={open} onClose={handleClose} >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Login</h2>
                    <form className={styles.signupForm}>
                      <Input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                      />
                      <Input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                      <Button type="submit" onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>
            <Modal open={openLogIn} onClose={() => setOpenLogIn(false)} >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Login</h2>
                    <form className={styles.signupForm}>
                      <Input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                      <Button type="submit" onClick={logIn}>Login</Button>
                    </form>
                </div>
            </Modal>
            {user?(
              <Button onClick={() => auth.signOut()}>Logout</Button>
              ): (
                <div className="loginContainer">
                  <Button onClick={() => setOpenLogIn(true)}>Login</Button>
                  <Button onClick={() => setOpen(true)}>SignUp</Button>
                </div>
            )}
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="About me" {...a11yProps(0)} />
            <Tab label="Todo App" {...a11yProps(1)} />
            <Tab label="Social" {...a11yProps(2)} />
            <Tab label="Videos" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
      </div>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Aboutme />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TodoMain user={user} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Social user={user} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Vidoes
        </TabPanel>
    </div>
  );
}

export default App;
