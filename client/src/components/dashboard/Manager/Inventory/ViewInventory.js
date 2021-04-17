import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import toastr from 'toastr';
class ViewInventory extends Component {
	constructor() {
		super();
		this.state = {
			inventory: [
				{
					Name: 'churro',
					Quantity: 100,
					ProjectedProfit: 0,
					LastRequested: 0,
					TotalRequests: 0,
				},
			],
		};
		this.handleDelete = this.handleDelete.bind(this);
	}
	handleDelete(event) {
		try {
			const name = event.target.name;
			const index = event.target.index;

			console.log('Deleting: ' + name);

			// remove item from state
			var array = [...this.state.inventory]; // make a separate copy of the array
			if (index !== -1) {
				array.splice(index, 1);
				this.setState({ inventory: array });
			}

			// delete item from database!
			axios
				.delete('http://localhost:5000/Api/Inventory/item', { data: { Name: name } })
				.then((res) => {
					const data = res.data;
					console.log(data);
					toastr.success('Successfully removed item from inventory!');
				})
				.catch((err) => {
					console.log(err);
					toastr.error('Error occured when attempting to remove item!');
				});
		} catch (err) {
			toastr.error('Error occured when attempting to remove item!');
		}
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Inventory/View')
			.then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ inventory: data.Inventory });
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { inventory } = this.state;
		return (
			<div className='admin-view-menu-container'>
				<div className='admin-view-menu-content'>
					<h3>Current Inventory</h3>
					<Link to='/Manager/EditInventory'>
						<FiEdit size={15} color='#0c71c3' />
						Add items to Inventory!
					</Link>
					{console.log(inventory)}
					<ul>
						{inventory.map((item, index) => (
							<li key={index}>
								<strong>Item ID:</strong>
								<p>{index}</p>

								<strong>Name:</strong>
								<p>{item.Name}</p>

								<strong>Quantity:</strong>
								<p>{item.Quantity.toLocaleString()}</p>

								<strong>Possible Profits:</strong>
								<p>${item.ProjectedProfit.toLocaleString()}</p>

								<strong>Dish last purchased </strong>
								<p>{item.LastRequested}</p>

								<strong>Total time dish requested </strong>
								<p>{item.TotalRequests.toLocaleString()}</p>

								<button
									className='button'
									type='submit'
									name={item.Name}
									index={index}
									onClick={this.handleDelete}>
									Delete Item
								</button>
							</li>
						))}
					</ul>
					<div>
						<Link to='/dashboard/manager/ManagerDashboard'>
							<button>Dashboard</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default ViewInventory;
