import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import './ManagerBooking.css';

class ManagerBooking extends Component {
	constructor() {
		super();
		this.state = {
			booking: [
				{
					Name: 'Testing',
					phone: 'Testingggggg',
					diningDate: 'Testing',
					coverNo: 5,
				},
			],
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Reservations/View')
			.then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ booking: data.Bookings });
			})
			.catch((err) => this.setState({ error: err }));
		this.setState({ loading: false });
	}
	render() {
		const { booking, error, loading } = this.state;
		return (
			<div className='admin-view-bookings-container'>
				<div className='admin-view-bookings-content'>
					<h2>Reservations</h2>
					<div className='new-form-button'>
						<Link to=''>
							<FiEdit size={16} color='grey' />
							<button> Create Reservation</button>
						</Link>
					</div>
					<h3>Reservation Details</h3>
					<ul>
						{booking.map((BookingsList, index) => (
							<li key={index}>
								<strong>Booking ID:</strong>
								<p>{index}</p>

								<strong>Name:</strong>
								<p>{BookingsList.Name}</p>

								<strong>Date:</strong>
								<p>{BookingsList.ReservationTime}</p>

								<strong>Number of People:</strong>
								<p>{BookingsList.coverNo}</p>

								<strong>Phone:</strong>
								<p>{BookingsList.phone}</p>

								<strong>Time:</strong>
								<p>{BookingsList.lastName}</p>
							</li>
						))}
					</ul>
					<div>
						<Link to='/dashboard/manager/ManagerDashboard'>
							<button>Back To Dashboard</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ManagerBooking;
