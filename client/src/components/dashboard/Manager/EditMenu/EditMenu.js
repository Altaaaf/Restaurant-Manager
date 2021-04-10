import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toastr from 'toastr';
import './EditMenu.css';

class EditMenu extends Component {
	constructor() {
		super();

		this.state = {
			Name: '',
			Price: '',
			Description: '',
			ItemType: '',
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
			Price: this.state.Price,
			Description: this.state.Description,
			Type: this.state.ItemType,
		};
		axios
			.post('http://localhost:5000/Api/Menu/item', PostRequestData)
			.then((res) => {
				const data = res.data;
				console.log(data);
				if (res.status == 200) {
					toastr.success('Successfully added item to menu!');
				} else {
					toastr.error('Unexpected failure when adding item to menu!');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}

	render() {
		const { Name, Price, Description, ItemType } = this.state;
		return (
			<div className='admin-create-menu-container'>
				<div className='admin-create-menu-content'>
					<h2>Create Menu Item</h2>

					<Link to='/Manager/ViewMenu'>
						<FiArrowLeft size={13} color='#0c71c3' />
						All Menu Items
					</Link>
					<form onSubmit={this.handleSubmit}>
						<strong>Name:</strong>
						<input name='Name' placeholder='Name' value={Name} onChange={this.handleChange} />
						<strong>Price:</strong>
						<input name='Price' placeholder='Price' value={Price} onChange={this.handleChange} />
						<strong>Description:</strong>
						<input
							name='Description'
							placeholder='Description'
							value={Description}
							onChange={this.handleChange}
						/>
						<strong>Item Type:</strong>
						<input
							list='browsers'
							name='ItemType'
							placeholder='ItemType'
							value={ItemType}
							onChange={this.handleChange}
						/>
						<select value={this.state.ItemType} onChange={this.handleChange}>
							<datalist id='browsers'>
								<option value='sides' />
								<option value='mains' />
								<option value='drinks' />
							</datalist>
						</select>
						<button className='botton' type='submit'>
							Add Item
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default EditMenu;
