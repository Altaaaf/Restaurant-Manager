import axios from 'axios';
class BookingApi {
	static saveBooking(booking) {
		axios
			.post('http://localhost:5000/Api/Reservations/CreateReservation', booking)
			.then((res) => console.log('Successfully created reservation '))
			.catch((err) => console.log('Error occured: ' + err));
	}
}

export default BookingApi;
