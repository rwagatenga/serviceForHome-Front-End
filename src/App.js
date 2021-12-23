import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
 
import './App.css';
import Logo from './components/logo/Logo';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from './components/menu/Menu';
// core components
import Admin from "layouts/Admin.js";
import Client from "layouts/Client.js"
import RTL from "layouts/RTL.js";
import ClientRTL from "layouts/ClientRTL.js"
import * as actions from './store/actions/index';

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true
    }
  };
  componentDidMount () {
    this.props.onTryAutoSignup();
    this.props.onDetectingLocation()
  }
  
  render() {
    let apps = (
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    );
    if (this.props.isAuthenticated && this.props.userType === "Worker") {
      return (apps)
    }
    if (this.props.isAuthenticated && this.props.userType === "Client") {
      return (
			<Router history={hist}>
				<Switch>
					<Route path="/admin" component={Client} />
					<Route path="/rtl" component={ClientRTL} />
					<Redirect from="/" to="/admin/dashboard" />
				</Switch>
			</Router>
		);
    }
    apps = (
      <div style={{backgroundColor: "#0E3D51", color: "white"}}>
        <Container fixed style={{backgroundColor: "#0E3D51", color: "white"}}>
        <Typography component="div" style={{ backgroundColor: '#0E3D51', height: '100vh' }} >
          <Logo />
          <Menu />
        </Typography>
        </Container>
      </div>);

    return (
      <div>
        { apps }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userType: state.auth.user.userType,
    location: state.auth.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onDetectingLocation: () => dispatch(actions.detectLocation())
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( App );
