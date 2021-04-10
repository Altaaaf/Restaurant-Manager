import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import Mains from '../menus/Mains';
import Extras from '../menus/Extras';
import { Provider } from '../menus/Context';
import '../menus/MenuStyles.css';
import Total from '../menus/Total';

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
			<div className="container">
					<h2>Your Orders</h2>
					<Link to='/customer/menus'>
						<FiEdit size={16} color='#0c71c3' />
						Add more to your cart
					</Link>
					<div className="order-container">
					<ul>
						{orders.map((order, index) => (
							<li key={index}>
								<strong>Order ID:</strong>
								<p>{index}</p>
								{order.Order.map((item, idx) => {
									return (
										<li key={idx}>
											
											<p>{item.Name}</p>
											
											<p>{item.Price}</p>	
											<strong>Total price for item</strong>
											<p>{item.Price * item.Quantity}</p>
										</li>
									);
								})}
							</li>
						))}
					</ul>
					</div>
					<div>
						<Link to='/dashboard/customer/Dashboards'>
							<button>Back To Dashboard</button>
						</Link>
					</div>
				</div>
				
				
				
		);
	}
}
export default ViewOrders;

