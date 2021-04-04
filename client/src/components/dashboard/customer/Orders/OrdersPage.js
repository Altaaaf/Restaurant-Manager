import React, { Component } from 'react';
import './OrdersCss.css';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import axios from 'axios';
class OrdersPage extends Component {
	constructor() {
		super();
		this.onSaveForm = this.onSaveForm.bind(this);
	}

	onSaveForm(event) {
		event.preventDefault();
		const { Order } = this.props.location.state;
		axios
			.post('http://localhost:5000/Api/Orders/Create', { Order: Order })
			.then((res) => console.log('Successfully created reservation '))
			.catch((err) => console.log('Error occured: ' + err));
		toastr.success('Successfully saved order');
	}

	// add a loading page while retrieving data from back end
	render() {
		const { Order } = this.props.location.state;
		return (
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
					<ul>
						{Order.map((Item, index) => (
							<li key={index}>
								<strong>Name:</strong>
								<p>{Item.Name}</p>

								<strong>Quantity</strong>
								<p>{Item.Quantity}</p>

								<strong>Price of each</strong>
								<p>{Item.Price}</p>

								<strong>Total price for item</strong>
								<p>{Item.Price * Item.Quantity}</p>
							</li>
						))}
					</ul>
					<div>
						<Link
							to='/customer/menus'
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
							}}
							className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
							Previous
						</Link>
						<Link
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginTop: '3rem',
							}}
							onClick={this.onSaveForm}
							className='btn btn-small waves-effect waves-light hoverable navy accent-3'>
							Purchase!
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default OrdersPage;
