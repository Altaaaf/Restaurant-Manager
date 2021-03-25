import React from 'react';
import toastr from 'toastr';
import BookingApi from '../api/BookingApi';
import BookingForm from './BookingForm';
<<<<<<< HEAD
import './booking.css';
=======
import BookingsList from './BookingList';

>>>>>>> 1fdf56a5c3730bccd7e794dfa438948c75f13e3a

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
			<div style={{ height: '65vh' }} className='container valign-wrapper'>
			<div className='row'>
			<div className='col s12 center-align'>

					<BookingForm
						booking={this.state.booking}
						onSave={this.onSaveForm}
						onChange={this.onFieldChange}
					/>
				</div>
<<<<<<< HEAD
=======
				</div>
>>>>>>> 1fdf56a5c3730bccd7e794dfa438948c75f13e3a
			</div>
		);
	}
}

export default BookingPage;
