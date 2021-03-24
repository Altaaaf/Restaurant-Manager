import React from 'react';
import BookingApi from '../api/BookingApi';
import PropTypes from 'prop-types';
const BookingView = ({ booking, assignSeat }) => {
	let onSeatAssign = function () {
		// I think confirm is a function that's missing -
		// Find the function and add it to this so it can be used..
		// Commented it out for now
		//if (confirm(`Are you sure you want to seat ${booking.firstName}?`)) {
		//	assignSeat(booking);
		//}
	};
	
		
};

BookingView.propTypes = {
	booking: PropTypes.object.isRequired,
	assignSeat: PropTypes.func,
};

export default BookingView;
