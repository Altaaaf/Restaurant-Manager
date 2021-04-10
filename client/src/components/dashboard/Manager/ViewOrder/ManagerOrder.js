import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import './ManagerOrder.css';
class ManagerOrder extends Component {
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
				//console.log(data);
				this.setState({ orders: data.Orders });
			})
			.catch((err) => this.setState({ error: err }));
	}

	render() {
		const { orders } = this.state;
		return (
			<div className='admin-view-order-container'>
				<div className='admin-view-order-content'>
					<h2>All orders</h2>
					
					<ul>
						{orders.map((order, index) => (
							<li key={index}>
								<strong>Order ID:</strong>
								<p>{index}</p>

								<strong>Customer Name:</strong>
								<p>{order.CustomerName}</p>

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

											<strong>Order Total: </strong>
											<p>{item.Total}</p>
										</li>
									
									);
								})}
								
							</li>
						))}
					</ul>
					<div>
						<Link to='/dashboard/manager/ManagerDashboard'>
							<button>Back To Dashboard</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ManagerOrder;
