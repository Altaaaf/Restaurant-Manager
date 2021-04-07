import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
class ViewOrders extends Component {
	constructor() {
		super();
		this.state = {
			orders: [],
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Orders/View')
			.then((res) => {
				const data = res.data;
				this.setState({ orders: data.Orders });
			})
			.catch((err) => this.setState({ error: err }));
	}

	render() {
		const { orders } = this.state;
		return (
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
					<h2>All Bookings</h2>
					<Link to=''>
						<FiEdit size={16} color='#0c71c3' />
						Create Booking
					</Link>
					<ul>
						{orders.map((order, index) => (
							<li key={index}>
								<strong>Order ID:</strong>
								<p>{index}</p>
								{order.Order.map((item, idx) => {
									return (
										<li key={idx}>
											<strong>Item Number: </strong>
											<p>{idx}</p>

											<strong>Item Name: </strong>
											<p>{item.Name}</p>

											<strong>Item Quantity: </strong>
											<p>{item.Quantity}</p>

											<strong>Item Price: </strong>
											<p>{item.Price}</p>
											
											<strong>Total price for item</strong>
											<p>{item.Price * item.Quantity}</p>

										</li>
									);
								})}
							</li>
						))}
					</ul>
					<div>
						<Link to='/dashboard/customer/Dashboards'>
							<button>Back To Dashboard</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ViewOrders;
