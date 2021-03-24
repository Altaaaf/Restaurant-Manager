import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { Link } from "react-router-dom";




class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	  

	render() {
		const { user } = this.props.auth;

		console.log(user);

		return (

			<div style={{ height: '75vh' }} className='container valign-wrapper'>
				<div className='row'>
					<div className='landing-copy col s12 white-text center-align'>
						<h4>
							<b>Hey there,</b> {user.name.split(' ')[0]}
							<p className='flow-text white-text text-darken'>
								Restaurant Automation Management Hub{' '}
								<span style={{ fontFamily: 'monospace' }}>Barns</span> Link 👏
							</p>
						</h4>
						<div className="col s6">
              			<Link
               			 	to="/customer/menus"
                			style={{
                 			width: "140px",
                  			borderRadius: "3px",
                  			letterSpacing: "1.5px",
							marginTop: '1rem',
                			}}
                			className="btn btn-large waves-effect waves-light hoverable navy accent-3"
            			  >
                		Menu
             		 </Link>
            		</div>
					<div className="col s6">
              			<Link
               			 	to="/customer/booking"
                			style={{
                 			width: "140px",
                  			borderRadius: "3px",
                  			letterSpacing: "1.5px",
							marginTop: '1rem',
                			}}
                			className="btn btn-large waves-effect waves-light hoverable navy accent-3"
            			  >
                		Book
             		 </Link>
            		</div>
					<div className="col s6">
						<button
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginTop: '1rem',
							}}
							onClick={this.onLogoutClick}
							className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
							Logout
						</button>
						</div>
					</div>
				</div>
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
