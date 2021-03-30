import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import './EditMenu.css';

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
	
        this.handleSubmit = this.handleSubmit.bind(this)
    };

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

    handleChange = (event) => {   
        const target = event.target;
        const value = event.target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });     
    };

   

    handleSubmit= (event) => {
        event.preventDefault();

    };

    render() {
        const { menu } = this.state;
        return (
            <div className='admin-create-menu-container'>
            <div className="admin-create-menu-content">
            <h2>Create Menu Item</h2>

            <Link to='/Manager/ViewMenu'>
            <FiArrowLeft size={13} color="#0c71c3"/>
            All Menu Items 
            </Link> 
            <form>
               <strong>Name:</strong>
                <input name='itemName' placeholder='Name' value={this.state.Name} onChange={this.handleChange} />
                <strong>Price:</strong>
                <input name='price' placeholder='Price' value={this.state.Price} onChange={this.handleChange}/>
                <strong>Description:</strong>
                <input name='description' placeholder='Description' value={this.state.Description} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit} className='botton' type='submit'>Add Item</button>
                </form>
            </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};



export default connect(mapStateToProps)(EditMenu);