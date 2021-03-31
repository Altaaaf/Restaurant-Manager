import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/customer/Dashboards';
import ManagerDashboard from './components/dashboard/Manager/ManagerDashboard/ManagerDashboard';
import Menus from './components/dashboard/customer/menus/Menus';
import ManagerMenu from './components/dashboard/Manager/ViewMenu/ManagerMenu';
import EditMenu from './components/dashboard/Manager/EditMenu/EditMenu';
import ViewInventory from './components/dashboard/Manager/Inventory/ViewInventory';
import EditInventory from './components/dashboard/Manager/Inventory/EditInventory';
import ContactForm from './components/dashboard/customer/Contact/Contact';

import './App.css';

import BookingPage from './components/dashboard/customer/booking/BookingPage';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = './login';
	}
}
export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className='App'>
					<Route exact path='/' component={Landing} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/logout' component={Logout} />
					<Route exact path='/customer/menus' component={Menus} />
					<Route exact path='/Manager/ViewMenu' component={ManagerMenu} />
					<Route exact path='/customer/booking' component={BookingPage} />
					<Route exact path='/Manager/EditMenu' component={EditMenu} />
					<Route exact path='/Manager/ViewInventory' component={ViewInventory} />
					<Route exact path='/Manager/EditInventory' component={EditInventory} />
					<Route exact path='/customer/Contact' component={ContactForm} />
					<Switch>
						<PrivateRoute exact path='/dashboard/customer/Dashboards' component={Dashboard} />
						<PrivateRoute
							exact
							path='/dashboard/manager/ManagerDashboard'
							component={ManagerDashboard}
						/>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
