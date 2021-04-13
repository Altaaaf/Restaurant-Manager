import React, { Component } from 'react';
import { UnderlinedTitle, InfoTitle } from './infoHelp';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import axios from 'axios';
import Total from '../menus/Total';
import { Provider } from '../menus/Context';
class OrdersPage extends Component {
	constructor() {
		super();
		this.onSaveForm = this.onSaveForm.bind(this);
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Orders/Create')
			.then((res) => {
				const data = res.data;
				//console.log(data);
				this.setState({ Order: data });
			})
			.catch((err) => this.setState({ error: err }));
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
			<Provider>
			<div className='container'>
				
				<section className='mains'>
				
				<h2 className='mains-heading'>Order Detail</h2>
						{Order.map((Item, index) => (
							<li className='mains-item' key={index}>
							<h3 className='extras-name'>{Item.Name}</h3>
					
							<strong className='extras-price'>${Item.Price}</strong>
							
							
							
							</li>
						))}
						</section>
						
						<Total data={this.props.location.state.Order} />
						
						<div className='col s6 center-align'>
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
					
			</Provider>
		);
	}
}
export default OrdersPage;
