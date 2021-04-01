import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit FiTrash2 } from 'react-icons/fi';
import axios from 'axios';


class ManagerBooking extends Component {
	constructor() {
		super();
		this.state = {
			booking: {},
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Reservation/BookingPage')
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
                <div className="admin-view-bookings-container">

<div className="admin-view-bookings-content">
  <h1>All Bookings</h1>

  <Link to=''>
    <FiEdit size={16} color="#0c71c3"/>
    Create Booking  
  </Link> 

  <ul>
    {booking.map((booking, index) => (
      <li key={index}>
        <strong>Booking ID:</strong>
        <p>{index}</p>

        <strong>Date:</strong>
        <p>{booking.ReservationTime}</p>

        <strong>Number of People:</strong>
        <p>{booking.coverNo}</p>

        <strong>First Name:</strong>
        <p>{booking.FirstName}</p>

        <strong>Last Name:</strong>
        <p>{booking.lastName}</p>

        <button onClick={(event) => handleBookingDeletion(event, booking.id)}>
          <FiTrash2 size={20} color="#a8a8b3"/>
        </button>
      </li>
    ))}
  </ul>
</div>

</div>
						<Link className='botton' to='/dashboard/manager/ManagerDashboard'>
							Back To Dashboard
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ManagerMenu;
