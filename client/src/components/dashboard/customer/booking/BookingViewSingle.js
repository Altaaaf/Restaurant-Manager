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
	return (
		<div>
			<h3>
				{booking.firstName} {booking.lastName}
			</h3>
			<small>Booking #{booking.bookingId}</small>
			<br />
			<small>Time: {booking.diningDate}</small>
			<br />
			<small>Cover: {booking.coverNo}</small>
			<br />
			<small>Phone: {booking.phone}</small>
			<br />
			<div>
				<p className='pull-right'>
					{(() => {
						if (!booking.isSeated) {
							return (
								<button
									type='button'
									title='click to seat'
									onClick={onSeatAssign}
									className='btn btn-warning'>
									Not seated
								</button>
							);
						} else {
							return <div className='success'>Seated</div>;
						}
					})()}
				</p>
				<br />
			</div>
			<hr />
		</div>
	);
};

BookingView.propTypes = {
	booking: PropTypes.object.isRequired,
	assignSeat: PropTypes.func,
};

export default BookingView;
