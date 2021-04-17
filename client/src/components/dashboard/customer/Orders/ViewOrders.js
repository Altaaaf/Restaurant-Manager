import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';

import './OrdersCss.css';
import Button from '@material-ui/core/Button';
import Card from './Card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
		console.log(orders);
		return (
			<div className='order_container'>
				<div className='create_order_link'>
					<Link to='/customer/menus'>
						<FiEdit size={16} color='#0c71c3' />
						Place another order
					</Link>
				</div>
				<div className='back_button'>
					<Link to='/dashboard/customer/Dashboards'>
						<Button variant='contained' color='secondary'>
							<ArrowBackIosIcon />
							Dashboard
						</Button>
					</Link>
				</div>
				<h2 className='mains-heading'>Order History</h2>
				<div className='recomendedVideo_video'>
					{orders &&
						orders.map((order, index) => {
							console.log('===', order.createdDate);
							return (
								<div key={index}>
									<Card orders={order.Order} id={index + 1} createdDate={order.createdDate} />
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}
export default ViewOrders;
