import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { Link } from 'react-router-dom';
import { FiHome, FiMenu, FiBookOpen, FiLogOut } from 'react-icons/fi';
import { MdRateReview } from 'react-icons/md';

import './Dashboards.css';

import barnsLink from '../../../img/BarnsLinkLogo.png';

class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { user } = this.props.auth;

		console.log(user);

		return (
			<div className='home-page-body'>
				<div className='navigation-menu'>
					<div className='left-links'>
						<Link to='/'>
							<FiHome size={16} color='#e02041' />
							Home
						</Link>
						<Link to='/customer/menus'>
							<FiMenu size={16} color='#e02041' />
							Menu
						</Link>
						<Link to='/customer/booking'>
							<FiBookOpen size={16} color='#e02041' />
							Bookings
						</Link>
					</div>
					<img src={barnsLink} alt='' />

					<div className='logged-right-links'>
						<Link to='/customer/Orders'>
							<FiBookOpen size={16} color='#e02041' />
							Orders
						</Link>

						<Link to='/customer/Contact'>
							<MdRateReview size={16} color='#e02041' />
							Contact Us
						</Link>
						<Link to='/Logout'>
							<FiLogOut size={16} color='#e02041' />
							Logout
						</Link>
					</div>
				</div>
				<section className='banner1' id='banner1'>
					<div className='content1'>
						<h1>About us</h1>
						<p>
							{' '}
							We are the last authentic Amrican restaurant in New York, serving delicious Amrican
							cuisine cooked by the best chefs. It only takes a few minutes to browse through our
							website and check out our menu. We hope you'll soon join us for a superb Amrican
							culinary experience.
						</p>
					</div>
				</section>
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
