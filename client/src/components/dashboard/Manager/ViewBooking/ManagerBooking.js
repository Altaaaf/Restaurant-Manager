import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import './ManagerBooking.css'

class ManagerBooking extends Component {
	constructor() {
		super();
		this.state = {
			booking: [
				{
					firstName: 'Testing',
					lastName: 'Testing',
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
					<h2>All Bookings</h2>
					<Link to=''>
						<FiEdit size={16} color='#0c71c3' />
						Create Booking
					</Link>
					<h3>bookings details</h3>
					<ul>
						{booking.map((BookingsList, index) => (
							<li key={index}>
								<strong>Booking ID:</strong>
								<p>{index}</p>

								<strong>Date:</strong>
								<p>{BookingsList.ReservationTime}</p>

								<strong>Number of People:</strong>
								<p>{BookingsList.coverNo}</p>

								<strong>phone:</strong>
								<p>{BookingsList.phone}</p>

								<strong>First Name:</strong>
								<p>{BookingsList.FirstName}</p>

								<strong>Last Name:</strong>
								<p>{BookingsList.lastName}</p>
							</li>
						))}
					</ul>
					<div>
					<Link to='/dashboard/manager/ManagerDashboard'>
						<button >
							Back To Dashboard
						</button>
					</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ManagerBooking;
