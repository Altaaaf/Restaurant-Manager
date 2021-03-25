import React from 'react';
import toastr from 'toastr';
import BookingApi from '../api/BookingApi';
import BookingForm from './BookingForm';
import './booking.css';

class BookingPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			booking: {},
		};

		this.onFieldChange = this.onFieldChange.bind(this);
		this.onSaveForm = this.onSaveForm.bind(this);
	}

	onFieldChange(event) {
		const field = event.target.name;
		let booking = this.state.booking;
		booking[field] = event.target.value;
		return this.setState({ booking: booking });
	}

	onSaveForm(event) {
		event.preventDefault();
		BookingApi.saveBooking(this.state.booking);
		toastr.success('Successfully created booking!');
		this.setState({ booking: {} });
	}

	render() {
		return (
			<div className='row'>
				<div className='col-xs-8'>
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
