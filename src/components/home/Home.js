import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import './home.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/util';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Backdrop from '../backdrop/backdrop';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			services: [],
			signup: false,
			isAuth: false,
		   token: null,
		   userId: null,
		   authLoading: false,
		   error: this.props.error

		}
	};
	componentDidMount() {
		if (this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
		this.props.onFetchServices();
		this.props.onDetectingLocation();
	}
	loginHandler = (event, authData) => {
    event.preventDefault();
    // this.setState({authLoading: !this.state.authLoading});
    this.props.onAuth( authData.email, authData.password, this.props.location);
  	};
  	signupHandler = (event, data) => {
  		event.preventDefault();
  		const token = data.token;
  		const experesIn = data.experesIn;
  		const serviceId = data.serviceId;
  		const subServiceId = data.subServiceId;
  		const inputs = {
  			...data.userInputs, 
  			province: data.province, 
  			district: data.district, 
  			sector: data.sector,
  			password: data.password,
			location: {...this.props.location}
			
  		}
  		this.props.onCreateAccount(token, experesIn, serviceId, subServiceId, inputs);
  	}
	setAutoLogout = milliseconds => {
    	setTimeout(() => {
      	this.logoutHandler();
    	}, milliseconds);
  	};
  	errorHandler = () => {
    this.setState({ error: null });
  };
	showSignUp = () => {
		this.setState(prevState => {
			return { signup: !prevState.signup }
		})
	};
	
	render () {

		const bull = <span className="bullet">Form</span>;
			const signupForm = <Card className="root">
			      <CardContent>
				      <Typography variant="h5" component="h2">
			          SignUp {bull}
			        </Typography>
			        <br/>
			        <Signup {...this.props}
			        	onSignUp={this.signupHandler}
              		loading={this.props.loading}/>
			        <br/>
			        <Typography className="title" color="textSecondary" gutterBottom>
			          Do you have an Account? 
			          <Button color="primary" onClick={this.showSignUp}>
						  SignIn
						</Button>
			        </Typography>
			      </CardContent>
			    </Card>
		const signinForm = <CardContent>
				      <Typography variant="h5" component="h2">
			          SignIn {bull}
			        </Typography>
			        <br/>
			        <Login 
			        	{...this.props}
			        	onLogin={this.loginHandler}
              		loading={this.state.authLoading}
			        />
			        <br/>
			        <Typography className="title" color="textSecondary" gutterBottom>
			          Forgot Password? Don't have an Account?
			          <Button color="primary" onClick={this.showSignUp}>
						  SignUp
						</Button>
			        </Typography>
			      </CardContent>
		let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
		return (
			<div>
			<Fragment>
				{this.props.loading ? <Backdrop 
					open={ this.props.loading } 
					onClick={this.props.onCancel} 
				/> : null }
				{this.props.error ? (<ErrorHandler 
					error={this.props.error} 
					onHandle={this.props.onCancel} 
				/>) : null }
			{ authRedirect }
			</Fragment>
				This an awesome Web App that will helps Clients and Technicians to find each other so that it can help clients
				to offer or order a service at home and technician provide that service at home depends on a kind of issue.
				<br/><br/>
				We offer different services like {this.props.services.map(item => (<span>{item.serviceName}, </span>) )} It could be better to SignIn/SignUp to order a service or be active in order to be hired.
				<br/><br/>
				<Card className="root">
			      {this.state.signup ? signupForm : signinForm}
			    </Card>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
		services: state.service.services,
		location: state.auth.location
    };
};

const mapDispatchToProps = dispatch => {
    return {
		onAuth: (email, password, location) => dispatch(actions.auth(email, password, location)),
		onCreateAccount: (
			token,
			experesIn,
			serviceId,
			subServiceId,
			userInputs
		) =>
			dispatch(
				actions.createAccount(
					token,
					experesIn,
					serviceId,
					subServiceId,
					userInputs
				)
			),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
		onCancel: () => dispatch(actions.onCancel()),
		onFetchServices: () => dispatch(actions.initServices()),
		onDetectingLocation: () => dispatch(actions.detectLocation()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);