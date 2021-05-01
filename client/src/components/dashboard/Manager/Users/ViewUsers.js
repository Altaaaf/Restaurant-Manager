import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewUsers.css';
import toastr from 'toastr';
class ViewUsers extends Component {
	constructor() {
		super();
		this.state = {
			Customers: [
				{
					Username: 'testing',
					Email: 'testing',
					PhoneNumber: 'testing',
					FirstName: 'Testing',
					LastName: 'LastName',
				},
			],
			Managers: [
				{
					Username: 'testing',
					Email: 'testing',
					PhoneNumber: 'testing',
					FirstName: 'Testing',
					LastName: 'LastName',
				},
			],
			error: '',
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Users/View')
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					this.setState({ Customers: data.Customers });
					this.setState({ Managers: data.Managers });
					toastr.success('Successfully retrieved data!');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}
	render() {
		const { Customers, Managers } = this.state;
		return (
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
					<h3>Managers</h3>
					<ul>
						{Managers.map((user, index) => (
							<li key={index}>
								<strong>User ID:</strong>
								<p>{index}</p>

								<strong>Username:</strong>
								<p>{user.Username}</p>

								<strong>Email:</strong>
								<p>{user.Email}</p>

								<strong>Number:</strong>
								<p>{user.PhoneNumber}</p>

								<strong>Name:</strong>
								<p>{user.FirstName}</p>

								<strong></strong>
								<p>{user.LastName}</p>
							</li>
						))}
					</ul>
					<h3>Customers</h3>
					<ul>
						{Customers.map((user, index) => (
							<li key={index}>
								<strong>User ID:</strong>
								<p>{index}</p>

								<strong>Username:</strong>
								<p>{user.Username}</p>

								<strong>Email:</strong>
								<p>{user.Email}</p>

								<strong>Number:</strong>
								<p>{user.PhoneNumber}</p>

								<strong> Name:</strong>
								<p>{user.FirstName}</p>

								<strong></strong>
								<p>{user.LastName}</p>
							</li>
						))}
					</ul>
					<div>
						<Link to='/dashboard/manager/ManagerDashboard'>
							<button>Dashboard</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ViewUsers;
