import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import './ManagerMenu.css';
class ManagerMenu extends Component {
	constructor() {
		super();
		this.state = {
			menu: {
				mains: [
					{
						Name: 'testing',
						Description: 'testing',
						Price: '1',
					},
				],
				sides: [
					{
						Name: 'testing',
						Price: '1',
					},
				],
				drinks: [
					{
						Name: 'testing',
						Price: '1',
					},
				],
			},
			error: '',
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Menu/View')
			.then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ menu: data });
			})
			.catch((err) => this.setState({ error: err }));
		this.setState({ loading: false });
	}
	render() {
		const { menu, error, loading } = this.state;
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
    {bookings.map(booking => (
      <li key={booking.id}>
        <strong>Booking ID:</strong>
        <p>{booking.id}</p>

        <strong>Slot ID:</strong>
        <p>{booking.slot_id}</p>

        <strong>Date:</strong>
        <p>{booking.date}</p>

        <strong>Date:</strong>
        <p>{booking.data}</p>

        <strong>People:</strong>
        <p>{booking.coverNo}</p>

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
