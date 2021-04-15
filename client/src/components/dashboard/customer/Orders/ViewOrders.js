import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import { Provider } from '../menus/Context';
import Order from './Order/Order';


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
				this.setState({ orders: data.Orders.reverse() });
			})
			.catch((err) => this.setState({ error: err }));
	}

	render() {
		const { orders } = this.state;
		console.log(orders)

		const allOrders = orders.map((order, index) => {
			return (
				<Order order={order.Order} index={index} key={index} ordersLength={orders.length}/>
			)
		})

		return (
			<Provider>
			<div className="container" >
					
					<Link to='/customer/menus'>
						<FiEdit size={16} color='#0c71c3' />
						Place another order:
					</Link>
					<br />
					<section className='extras'>
						<h2 className='extras-heading'>Order History</h2>
						{allOrders}
					</section>
						
					<div>
						<Link to='/dashboard/customer/Dashboards'>
							<button>Back To Dashboard</button>
						</Link>
					</div>
				</div>
			</Provider>
		);
	}
}
export default ViewOrders;
