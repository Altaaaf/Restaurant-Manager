import React from 'react';
import toastr from 'toastr';
import BookingApi from '../api/BookingApi.js';
import BookingForm from './BookingForm';
import BookingSlot from './bookingSloat';


class BookingPage extends React.Component {
	constructor() {
		super()
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
		this.setState({ booking: {} });
	}

	render() {
		return (
<<<<<<< HEAD
			<div className='col s18 dark-text center-align'>
				<BookingForm
					booking={this.state.booking}
					onSave={this.onSaveForm}
					onChange={this.onFieldChange}
					updateDate={this.handleDate}
				/>
			</div>
=======
			<div>
				<h2 style={{ textAlign: 'center' }}>Book Your Slot</h2>
				<div className='booking__sloat__container'>
					<BookingSlot />
				</div>

			</div>
			// <div style={{ height: '65vh' }} className='container valign-wrapper'>
			// 	<div className='row'>
			// 		<div className='col s18 dark-text center-align'>
			// 			{/* <BookingForm
			// 				booking={this.state.booking}
			// 				onSave={this.onSaveForm}
			// 				onChange={this.onFieldChange}
			// 				updateDate={this.handleDate}
			// 			/> */}

			// 		</div>
			// 	</div>
			// </div>
>>>>>>> 3aa9f7bbd6dfbbe30220d7947ce1efa251389c50
		);
	}
}

export default BookingPage;
