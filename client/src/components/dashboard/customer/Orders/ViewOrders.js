import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import Total from './OrderTotal';
import { Provider } from '../menus/Context';

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
			<Provider>
				<div className='container'>
					<h2>Your Orders</h2>
					<Link to='/customer/menus'>
						<FiEdit size={16} color='#0c71c3' />
						Place another order:
					</Link>
					<br />
					<section className='extras'>
						<h2 className='mains-heading'>Order History</h2>
						{orders.map((order, index) => (
							<article key={index}>
								<p>{index}</p>
								{order.Order.map((item, idx) => {
									return (
										<li key={idx}>
											<h3 className='extras-name'>{item.Name}</h3>
											<strong className='mains-price'>${item.Price}</strong>
										</li>
									);
								})}
								;
								<Total data={this.state.order} />
							</article>
						))}
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
