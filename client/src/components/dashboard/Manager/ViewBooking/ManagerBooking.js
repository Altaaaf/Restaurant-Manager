import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookingCard from './BookingCard';
import './ManagerBooking.css';
import toastr from 'toastr';
import Timeslot from "../../customer/booking/Timeslot";
class ManagerBooking extends Component {
	constructor() {
		super();
		this.state = {
			booking: [],
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/booking/View')
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
				<h6>Select dates to view booking</h6>
				<Timeslot/>
				<div className='recomendedVideo_video'>
					{booking &&
						booking.map((BookingsList, index) => {
							return (
								<div key={index}>
									{console.log(BookingsList)}
									<BookingCard
										BookingDate={BookingsList.booking_date}
										Email={BookingsList.email}
										Area={BookingsList.area_type}
										Comment={BookingsList.comment}
										SlotID={BookingsList.slot_id}
										id={index}
										CustomerName={BookingsList.FirstName + ' ' + BookingsList.lastName}
										createdDate={BookingsList.booking_time}
										members={BookingsList.members}
										phone={BookingsList.phone}
										FirstName={BookingsList.FirstName}
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
