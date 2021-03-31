import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { Link } from "react-router-dom";
import { FiHome,  FiMenu, FiLogIn, FiEdit, FiUser, FiBookOpen, FiLogOut } from 'react-icons/fi';
import { MdRateReview }from 'react-icons/md';

import './Dashboards.css';

import barnsLink from '../../../img/BarnsLinkLogo.png';
import Dining from '../../../img/dining.jpeg';


class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	  

	render() {
		const { user } = this.props.auth;

		console.log(user);

		return (
			<div className="home-page-body">
				<div className="navigation-menu">
				  <div className="left-links">
					<Link to="/">
					  <FiHome size={16} color="#e02041"/>
					  Home
					</Link>
					<Link to="/customer/menus">
					  <FiMenu size={16} color="#e02041"/>
					  Menu
					</Link>
				  <Link to="/customer/booking">
					<FiBookOpen size={16} color="#e02041"/>
					  Bookings
					</Link>
					</div>
				  <img src={barnsLink} alt=""/>
			
				  <div className="logged-right-links">
					<Link to="">
					<FiUser size={16} color="#e02041"/>
					  Profile
					</Link>
					
					<Link className="Review" to="/customer/review">
					<MdRateReview size={16} color="#e02041"/>
					  Review
					</Link>
					 <Link className="logout-text" to='/Logout'>
					  <FiLogOut size={16} color="#e02041"/>
					  Logout
					  </Link>
				  </div>
				</div>
				<img src={Dining}/>
				</div>
				
			  )
			}
		}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
