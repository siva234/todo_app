import React from 'react';
import './App.css';

import { Tab, Tabs, Typography, Box, AppBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import TodoMain from './pages/TodoMain/TodoMain';
import Social from './pages/Social/Social';
import Aboutme from './pages/AboutMe/Aboutme';

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

function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <div className="appHeader">
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
          </Tabs>
        </AppBar>
      </div>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Aboutme />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TodoMain />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Social />
        </TabPanel>
    </div>
  );
}

export default App;
