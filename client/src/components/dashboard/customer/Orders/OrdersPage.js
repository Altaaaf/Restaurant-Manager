import React, { Component } from 'react';

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
			.then((res) => console.log('Successfully created order '))
			.catch((err) => console.log('Error occured: ' + err));
		toastr.success('Successfully saved order');
	}

	// add a loading page while retrieving data from back end
	render() {
		const { Order } = this.props.location.state;
		return (
			
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
				<Link to='/customer/menus' className='btn-flat waves-effect'>
					<i className='material-icons left'>keyboard_backspace</i> Back to home
				</Link>
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
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginTop: '3rem',
								textSize:'12px',
							}}
							onClick={this.onSaveForm}
							className='btn small waves-effect waves-light hoverable navy accent-3'>
							Submit
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default OrdersPage;
