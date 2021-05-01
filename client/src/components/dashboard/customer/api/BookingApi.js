import axios from 'axios';
import toastr from 'toastr';
class BookingApi {
	static saveBooking(booking) {
		axios
			.post('http://localhost:5000/Api/Reservations/BookingPage', booking)
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					toastr.success('Successfully created reservation');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}
}

export default BookingApi;
