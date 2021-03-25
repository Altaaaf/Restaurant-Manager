import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { FiUsers, FiMenu, FiBookOpen, FiClock, FiHome } from 'react-icons/fi';
import { Link } from "react-router-dom";
import './ManagerDashboard.css';


//<b>Hey there,</b> {user.name.split(' ')[0]}


class ManagerDashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	  

	render() {
		const { user } = this.props.auth;

		console.log(user);

		return (
			<div className="admin-home-main-container">
      <div className="admin-home-main-content">
        <h1 className="center-align">Welcome to the Admin Panel</h1>

        <div className="links">


        <FiUsers className="users-icon" size={75} color="#0c71c3"/>
        <Link className="users-text" to='/admin/users'>Users</Link>

        <FiClock className="slots-icon" size={75} color="#0c71c3"/>
        <Link className="slots-text" to='/admin/slots'>Slots</Link>

		<FiMenu className="menu-icon" size={75} color="#0c71c3"/>
        <Link className="menu-text" to='/admin/menu'>Menu</Link>

        <FiBookOpen className="bookings-icon" size={75} color="#0c71c3"/>
        <Link className="bookings-text" to='/admin/bookings'>Bookings</Link>
        </div>

      </div>
    </div>
		);
	}
}

ManagerDashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(ManagerDashboard);
