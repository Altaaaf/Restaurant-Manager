import React, { Component, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toastr from 'toastr';
import './EditMenu.css';

import MenuApi from './api';

class EditMenu extends Component {
	constructor() {
		super();
		this.state = {
			menu: {
				mains: [
					{
						Name: 'testing',
						Description: 'testing',
						Price: '1',
					},
				],
				sides: [
					{
						Name: 'testing',
						Price: '1',
					},
				],
				drinks: [
					{
						Name: 'testing',
						Price: '1',
					},
				],
			},
			error: '',
			loading: true,
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Menu/View')
			.then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ menu: data });
			})
			.catch((err) => this.setState({ error: err }));
		this.setState({ loading: false });
	}
    
	onFieldChange(event) {
		const field = event.target.name;
		let mains = this.state.menu;
		mains[field] = event.target.value;
		return this.setState({ mains: mains });
	}

	onSaveForm(event) {
		event.preventDefault();
		MenuApi.CreateMenu(this.state.mains);
		toastr.success('Successfully created mains item!');
		this.setState({ mains: {} });
	}
	render() {
       

        return (
        <div className="admin-create-menu-container">
        <div className="admin-create-menu-content">
        <h1>Create Menu Item</h1>

        <Link to='/Manager/ManagerMenu'>
          <FiArrowLeft size={16} color="#0c71c3"/>
          All Menu Items 
        </Link> 
        <form onSubmit={this.onSaveForm}>
          <strong>Name:</strong>
          <input 
            type="text"
            placeholder="Menu Item Name"
            value={Name}
            onChange={event => this.setState(event.target.value)}
          />
          <strong>Price:</strong>
          <input 
            type="number"
            placeholder="Item Price"
            value={Price}
            onChange={event => setPrice(event.target.value)}
          />
          <strong>Description:</strong>
          <input 
            type="text" 
            placeholder="Item Description"
            value={Description}
            onChange={event => setDescription(event.target.value)}
          />

          <button className="button" type="submit">Create Menu Item</button>

        </form>
      </div>
    </div>
  );
}
}

export default EditMenu;