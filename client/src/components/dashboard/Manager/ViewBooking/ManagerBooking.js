import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';


class ManagerBooking extends Component {
	constructor() {
		super();
		this.state = {
			booking: {},
	}}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Reservations/BookingPage')
			.then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ booking: {} });
			})
			.catch((err) => this.setState({ error: err }));
		this.setState({ loading: false });
	}
    
	render() {
		const { booking, error, loading } = this.state;
		return (
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
  <h2>All Bookings</h2>
  <Link to=''>
    <FiEdit size={16} color="#0c71c3"/>
    Create Booking  
  </Link> 
  <h3>bookings details</h3>
  <ul>
     {booking.map((bk, index) => (
      <li key={index}>
        <strong>Booking ID:</strong>
        <p>{index}</p>

        <strong>Date:</strong>
        <p>{bk.ReservationTime}</p>

        <strong>Number of People:</strong>
        <p>{bk.coverNo}</p>

        <strong>phone:</strong>
        <p>{bk.phone}</p>

        <strong>First Name:</strong>
        <p>{bk.FirstName}</p>

        <strong>Last Name:</strong>
        <p>{bk.lastName}</p>
      </li>
    ))}
  </ul>
</div>

    <div>
						<Link className='botton' to='/dashboard/manager/ManagerDashboard'>
							Back To Dashboard
						</Link>
					</div>
				</div>
			
      
		);
	}
}
export default ManagerBooking;
