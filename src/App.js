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
import RTL from "layouts/RTL.js";
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
    if (this.props.isAuthenticated) {
      return apps
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
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( App );
