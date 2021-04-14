import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toastr from 'toastr';

class Edit extends Component {
	constructor() {
		super();

		this.state = {
			Name: '',
			Product: '',
            Manager:'',
            Email:'',
            Number:'',
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
			Product: this.state.Product,
            Manager: this.state.Manager,
            Email: this.state.Email,
            Number: this.state.Number,
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
		const { Name, Product, Manager, Email, Number } = this.state;
		return (
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
					<h2>Add Distbutors</h2>

					<Link to='/Manager/View'>
						<FiArrowLeft size={13} color='#0c71c3' />
						View Distbutors
					</Link>
					<form onSubmit={this.handleSubmit}>
						<strong>Company:</strong>
						<input name='Name' placeholder='Name' value={Name} onChange={this.handleChange} />
						<strong>Product:</strong>
						<input
							name='Product'
							placeholder='Product'
							value={Product}
							onChange={this.handleChange}
						/>
                        <strong>Manager:</strong>
						<input
							name='Manager'
							placeholder='Manager'
							value={Manager}
							onChange={this.handleChange}
						/>
                        <strong>Email:</strong>
						<input
							name='Email'
							placeholder='Email'
							value={Email}
							onChange={this.handleChange}
						/>
                        <strong>Number:</strong>
						<input
							name='Number'
							placeholder='Number'
							value={Number}
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

export default Edit;
