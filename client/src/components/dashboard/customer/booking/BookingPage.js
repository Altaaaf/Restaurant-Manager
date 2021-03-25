import React from 'react';

import toastr from 'toastr';
import BookingApi from '../api/BookingApi';
import BookingForm from './BookingForm';
import BookingsList from './BookingList';
import './booking.css';

class BookingPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			booking: {},
			bookingsList: [],
		};

		this.onFieldChange = this.onFieldChange.bind(this);
		this.onSaveForm = this.onSaveForm.bind(this);
	}

	componentDidMount() {
		BookingApi.listBookings().then((bookings) => {
			this.setState({ bookingsList: bookings });
		});
	}

	onFieldChange(event) {
		const field = event.target.name;
		let booking = this.state.booking;
		booking[field] = event.target.value;
		return this.setState({ booking: booking });
	}

	onSaveForm(event) {
		event.preventDefault();
		// let history = this.props.history;
		BookingApi.saveBooking(this.state.booking).then(() => {
			toastr.success('Booking saved');
			this.setState({ booking: {} });
			// browserHistory.push('/seatings');
		});
	}

	render() {
		return (
			<div className='row'>
				<div className='center-align'>
					<h1>Make a booking</h1>
					<BookingForm
						booking={this.state.booking}
						onSave={this.onSaveForm}
						onChange={this.onFieldChange}
					/>
				</div>
				
			</div>
		);
	}
}

export default BookingPage;
