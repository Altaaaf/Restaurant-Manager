import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toastr from 'toastr';

class EditInventory extends Component {
	constructor() {
		super();

		this.state = {
			Name: '',
			Quantity: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = event.target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const PostRequestData = {
			Name: this.state.Name,
			Quantity: this.state.Quantity,
		};
		axios
			.post('http://localhost:5000/Api/Inventory/item', PostRequestData)
			.then((res) => {
				const data = res.data;
				console.log(data);
				if (res.status == 200) {
					toastr.success('Successfully added item to Inventory!');
				} else {
					toastr.error('Unexpected failure when adding item to Inventory!');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}

	render() {
		const { Name, Quantity } = this.state;
		return (
			<div className='admin-create-menu-container'>
				<div className='admin-create-menu-content'>
					<h2>Add items to inventory</h2>

					<Link to='/Manager/ViewInventory'>
						<FiArrowLeft size={13} color='#0c71c3' />
						View Inventory
					</Link>
					<form onSubmit={this.handleSubmit}>
						<strong>Name:</strong>
						<input name='Name' placeholder='Name' value={Name} onChange={this.handleChange} />
						<strong>Quantity:</strong>
						<input
							name='Quantity'
							placeholder='Quantity'
							value={Quantity}
							onChange={this.handleChange}
						/>
						<button className='botton' type='submit'>
							Add Item
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default EditInventory;
