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
import Landing from "./views/Landing/index"
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
    setTimeout(() => {this.props.onFetchFirebase(this.props.transactionId)}, 2000)
    setTimeout(() => {
		console.log("TRANS", this.props.transactionId);
	}, 2000);
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
    apps = <Landing />;

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
    location: state.auth.location,
    transactionId: state.order.transactionId
  };
};

const mapDispatchToProps = dispatch => {
  return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
		onDetectingLocation: () => dispatch(actions.detectLocation()),
		onFetchFirebase: () => dispatch(actions.initFirebase()),
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( App );
