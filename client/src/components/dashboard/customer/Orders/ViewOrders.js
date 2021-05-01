import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import toastr from 'toastr';
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
	uuid() {
		var uuid = Math.random().toString(36).slice(-6);
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Orders/View')
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					toastr.success('Successfully retrieved data');
					this.setState({ orders: data.Orders.reverse() });
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
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
									<Card
										orders={order.Order}
										id={order.ID}
										createdDate={order.createdDate}
										Status={order.Status}
									/>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}
export default ViewOrders;
