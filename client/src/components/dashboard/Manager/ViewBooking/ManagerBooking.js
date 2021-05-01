import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookingCard from './BookingCard';
import './ManagerBooking.css';
import toastr from 'toastr';
class ManagerBooking extends Component {
	constructor() {
		super();
		this.state = {
			booking: [],
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Reservations/View')
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					this.setState({ booking: data.Bookings.reverse() });
					toastr.success('Successfully retrieved data');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}

	pageHandler = (offset) => {
		this.setState(({ paging }) => ({
			paging: { ...paging, offset: offset },
		}));
	};
	render() {
		const { booking, error, loading } = this.state;
		return (
			<div className='order_container'>
				<h2 className='mains-heading'>Reservation Details</h2>
				<div className='recomendedVideo_video'>
					{booking &&
						booking.map((BookingsList, index) => {
							return (
								<div key={index}>
									<BookingCard
										id={BookingsList.ID}
										CustomerName={BookingsList.lastName}
										createdDate={BookingsList.ReservationTime}
										coverNo={BookingsList.coverNo}
										phone={BookingsList.phone}
									/>
								</div>
							);
						})}
				</div>
				<div>
					<Link to='/dashboard/manager/ManagerDashboard'>
						<button>Back To Dashboard</button>
					</Link>
				</div>
			</div>
		);
	}
}
export default ManagerBooking;
