import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';
import { FiUsers, FiMenu, FiBookOpen, FiClock, FiLogOut } from 'react-icons/fi';
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
      <div className="admin-home-main-content center-align">
	  <h4>
							<b>Welcome back,</b> {user.name.split(' ')[0]}
							<p className='flow-text dark-text text-darken'>
								Your Restaurant Automation Management Hub{' '}
								<span style={{ fontFamily: 'monospace' }}></span> 👏
							</p>
						</h4>

        <div className="links">


        <FiUsers className="users-icon" size={35} color="#0c71c3"/>
        <Link className="users-text" to='/admin/users'>Users</Link>

        <FiClock className="slots-icon" size={35} color="#0c71c3"/>
        <Link className="slots-text" to='/admin/slots'>Slots</Link>

		<FiMenu className="menu-icon" size={35} color="#0c71c3"/>
        <Link className="menu-text" to='/Manager/ViewMenu'>Menu</Link>

        <FiBookOpen className="bookings-icon" size={35} color="#0c71c3"/>
        <Link className="bookings-text" to='/admin/bookings'>Bookings</Link>

		 <FiLogOut className="logout-icon" size={35} color="#0c71c3"/>
        <Link className="logout-text" to='/Logout'>Logout</Link>

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
