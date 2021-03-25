import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import Sidebar from './Sidebar';
import Footer from '../..//layout/footer';
import { Link } from "react-router-dom";



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
			<div style={{ height: '15vh' }} className='container valign-wrapper'>
					<div className='row'>
						<div className='col s6 center-align'>
				<Sidebar/>
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
