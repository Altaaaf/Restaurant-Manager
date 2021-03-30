import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import './EditMenu.css';

class EditMenu extends Component {
    constructor(props) {
        super(props);

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

    validateForm() {
        return this.state.itemName.length > 0 && this.state.price.length > 0;
    };

    handleSubmit = () => {
        this.props.addItem(this.state, this.props.menu);
        this.props.addItemRow(this.state);
    };

    render() {
        const { menu, error, loading } = this.state;
        return (
            <div className='admin-create-menu-container'>
            <div className="admin-create-menu-content">
            <h1>Create Menu Item</h1>

            <Link to='Manager/ManagerMenu'>
            <FiArrowLeft size={16} color="#0c71c3"/>
            All Menu Items 
            </Link> 
                <input name='itemType' placeholder='Types' value={this.state} onChange={this.handleChange} />
                <input name='itemName' placeholder='Name' value={this.state.Name} onChange={this.handleChange} />
                <input name='price' placeholder='Price' value={this.state.Price} onChange={this.handleChange}/>
                <input name='description' placeholder='Description' value={this.state.Description} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit} disabled={!this.validateForm()} className='btn_primary' type='submit'>Add Item</button>
            </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        menu: state.menu
    };
};

function mapDispatchToProps() {
    return {
        addItem
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(EditMenu);