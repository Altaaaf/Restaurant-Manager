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
					<h2>Menu Items</h2>
					<Link to='/Manager/EditMenu'>
						<FiEdit size={15} color='#0c71c3' />
						Add items to menu!
					</Link>
					<h3>Mains</h3>
					<ul>
						{menu.mains.map((meal, index) => (
							<li key={index}>
								<strong>Menu Item ID:</strong>
								<p>{index}</p>

								<strong>Name:</strong>
								<p>{meal.Name}</p>

								<strong>Price:</strong>
								<p>${meal.Price}</p>

								<strong>Description:</strong>
								<p>{meal.Description}</p>
							</li>
						))}
					</ul>
					<h3>Sides</h3>
					<ul>
						{menu.sides.map((meal, index) => (
							<li key={index}>
								<strong>Menu Item ID:</strong>
								<p>{index}</p>

								<strong>Name:</strong>
								<p>{meal.Name}</p>

								<strong>Price:</strong>
								<p>${meal.Price}</p>

								<strong>Description:</strong>
								<p>{meal.Description}</p>
							</li>
						))}
					</ul>
					<h3>Drinks</h3>
					<ul>
						{menu.drinks.map((meal, index) => (
							<li key={index}>
								<strong>Menu Item ID:</strong>
								<p>{index}</p>

								<strong>Name:</strong>
								<p>{meal.Name}</p>

								<strong>Price:</strong>
								<p>${meal.Price}</p>

								<strong>Description:</strong>
								<p>{meal.Description}</p>
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
export default ManagerMenu;
