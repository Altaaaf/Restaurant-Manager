import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';
import { FiUsers, FiMenu, FiShoppingBag, FiLogOut,FiBarChart } from 'react-icons/fi';
import { FaTruckMoving } from "react-icons/fa";
import { RiCalendar2Fill } from 'react-icons/ri';
import { GoChecklist,GoListOrdered } from 'react-icons/go';
import { Link } from 'react-router-dom';
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
			<div className='admin-home-main-container'>
				<div className='admin-home-main-content center-align'>
					
						<div className='admin-home-main-content-welcome-text'>
						<h4>
						<b>Welcome back,</b> {user.name.split(' ')[0]}
						<p className='flow-text dark-text text-darken'>
							Your Restaurant Automation Management Hub{' '}
							<span style={{ fontFamily: 'monospace' }}></span> 👏
						</p>
					  </h4>
					  </div>

					<div className='links'>
						<FiUsers className='users-icon' size={35} color='black' />
						<Link className='users-text' to='/Manager/Users'>
							Users Details
						</Link>

						<FiMenu className='menu-icon' size={35} color='black' />
						<Link className='menu-text' to='/Manager/ViewMenu'>
							Menu Summary
						</Link>

						<RiCalendar2Fill className='bookings-icon' size={35} color='black' />
						<Link className='bookings-text' to='/Manager/ViewBooking'>
							Reservations
						</Link>

						<GoChecklist className='Order-icon' size={35} color='black' />
						<Link className='order-text' to='/Manager/ViewOrder'>
							Order Summary
						</Link>

						<FiShoppingBag className='Inventory-icon' size={35} color='black' />
						<Link className='Inventory-text' to='/Manager/ViewInventory'>
							Inventory
						</Link>

						<FiBarChart className='report-icon' size={35} color='black' />
						<Link className='report-text' to='/Manager/ViewReport'>
							Reports
						</Link>

						<GoListOrdered className='task-icon' size={35} color='black' />
						<Link className='task-text' to='/Manager/ManagerTask'>
							To Do List
						</Link>

						<FaTruckMoving className='distbute-icon' size={35} color='black' />
						<Link className='dist-text' to='/Manager/View'>
							Disbutors
						</Link>

						<FiLogOut className='logout-icon' size={35} color='black' />
						<Link className='logout-text' to='/Logout'>
							Logout
						</Link>
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
