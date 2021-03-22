import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import Sidebar from './Sidebar';



//<b>Hey there,</b> {user.name.split(' ')[0]}


class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	  

	render() {
		const { user } = this.props.auth;

		console.log(user);

		return (
			
			<div className="dashboard container">
				<Sidebar/>
						<button
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginLeft: '60rem',
							}}
							onClick={this.onLogoutClick}
							className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
							Logout
						</button>		
			</div>
			
		);
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
