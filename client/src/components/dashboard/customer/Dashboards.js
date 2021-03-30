import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { Link } from "react-router-dom";
import { FiHome,  FiMenu, FiLogIn, FiEdit, FiUser, FiBookOpen, FiBook, FiLogOut } from 'react-icons/fi';

import './Dashboards.css';

import barnsLink from '../../../img/BarnsLink.png';


class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	  

	render() {
		const { user } = this.props.auth;

		console.log(user);

		return (
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
				  </div>
					
				  <img src={barnsLink} alt=""/>
			
				  <div className="logged-right-links">
					<Link to="">
					<FiUser size={16} color="#e02041"/>
					  Profile
					</Link>
					<Link to="/customer/booking">
					<FiBookOpen size={16} color="#e02041"/>
					  Bookings
					</Link>
					<Link className="book-online" to="/bookings/new">
					<FiBook size={16} color="#FFF"/>
					  Book Online
					</Link>
					 <Link className="logout-text" to='/Logout'>Logout
					  <FiLogOut size={16} color="#e02041"/>
					  </Link>
				  </div>
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
