import React from 'react';
import toastr from 'toastr';
import BookingApi from '../api/BookingApi';
import BookingForm from './BookingForm';

class BookingPage extends React.Component {
	constructor() {
		super ()
		this.state = {
			booking: {},
		};

		this.onFieldChange = this.onFieldChange.bind(this);
		this.onSaveForm = this.onSaveForm.bind(this);
		this.handleDate = this.onSaveForm.bind(this);
	}

	handleDate(date) {
		let booking = this.state.booking;
		booking['ReservationTime'] = date;
		return this.setState({ booking: booking });
	}

	onFieldChange(event) {
		try {
			const field = event.target.name;
			console.log(field);
			let booking = this.state.booking;
			booking[field] = event.target.value;
			return this.setState({ booking: booking });
		} catch {
			let booking = this.state.booking;
			booking['ReservationTime'] = event;
			console.log(event);
			return this.setState({ booking: booking });
		}
	}

	onSaveForm(event) {
		event.preventDefault();
		BookingApi.saveBooking(this.state.booking);
		toastr.success('Successfully created booking!');
		this.setState({ booking: {} });
	}

	render() {
		return (
			<div className='container'>
					<div className='dark-text center-align'>
						<BookingForm
							booking={this.state.booking}
							onSave={this.onSaveForm}
							onChange={this.onFieldChange}
							updateDate={this.handleDate}
						/>
					</div>
				</div>
		);
	}
}

export default BookingPage;
