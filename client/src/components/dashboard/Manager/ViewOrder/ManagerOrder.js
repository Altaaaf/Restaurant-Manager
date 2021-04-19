import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import './ManagerOrder.css';
import OrderCard from './OrderCard';
import uuid from "react-uuid";



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
				this.setState({ orders: data.Orders.reverse() });
			})
			.catch((err) => this.setState({ error: err }));
	}
	pageHandler = (offset) => {
		this.setState(({ paging }) => ({
			paging: { ...paging, offset: offset },
		}));
	};
	render() {
		const { orders } = this.state;
		return (
			<div className='order_container'>
				<h2 className='mains-heading'>Customer Orders</h2>
				<div className='recomendedVideo_video'>
					{orders &&
						orders.map((order, index) => {
							return (
								<div key={index}>
									<OrderCard
										orders={order.Order}
										id={uuid()}
										CustomerName={order.CustomerName}
										createdDate={order.createdDate}
									/>
								</div>
							);
						})}
				</div>
				<div>
					<Link to='/dashboard/manager/ManagerDashboard'>
						<button> Dashboard</button>
					</Link>
				</div>
			
			</div>
		);
	}
}
export default ManagerOrder;
