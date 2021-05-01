import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManagerOrder.css';
import OrderCard from './OrderCard';
import toastr from 'toastr';
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
				if (res.status == 200) {
					const data = res.data;
					this.setState({ orders: data.Orders.reverse() });
					toastr.success('Successfully retrieved data');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
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
										id={order.ID}
										Status={order.Status}
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
