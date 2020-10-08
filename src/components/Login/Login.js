import React, { useState, useEffect } from 'react'
import styles from './Login.module.css';

import { Modal, makeStyles, Button, Input } from '@material-ui/core';
import { db, auth } from '../../firebase';

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
function Login() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [openLogIn, setOpenLogIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

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
        <div>
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
    )
}

export default Login
