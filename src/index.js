import React from "react";
import ReactDOM from "react-dom";

import JavascriptTimeAgo from 'javascript-time-ago'
 
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';

import authReducer from './store/reducers/authReducer';
import serviceReducer from './store/reducers/serviceReducer';
import ordersReducer from './store/reducers/ordersReducer';
import bidsReducer from './store/reducers/bidsReducer';
import cartsReducer from './store/reducers/cartsReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    service: serviceReducer,
    order: ordersReducer,
    bid: bidsReducer,
    cart: cartsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)

ReactDOM.render(
	<Provider store={store}>
	  <React.StrictMode>
	    <App />
	  </React.StrictMode>
	</Provider>,
  document.getElementById("root")
);
