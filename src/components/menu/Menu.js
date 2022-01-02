import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Home from '../home/Home';
import About from '../about/About';
import './Menu.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
		<React.Fragment>
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`nav-tabpanel-${index}`}
				aria-labelledby={`nav-tab-${index}`}
				{...other}
				style={{ backgroundColor: "#1C3956" }}>
				{value === index && (
					<Box p={3}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		</React.Fragment>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginLeft: 173
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{background: "#0E3D51", color: "white" }}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{style: {background:'white'}}}
          aria-label="nav tabs example"
          style={{background: "#0E3D51", color: "white"}}
        >
          <LinkTab label="Home" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="About" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Contact" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    <div style={{backgroundColor: "#0E3D51", marginTop: 40, marginLeft: -195 }}>
      <TabPanel value={value} index={0} className="tabPanel"
      >
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1} className="tabPanel">
        <About />
      </TabPanel>
      <TabPanel value={value} index={2} className="tabPanel">
        {/*<Contact />*/}
      </TabPanel>
     </div>
    </div>
  );
}