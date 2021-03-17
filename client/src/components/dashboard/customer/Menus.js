import React, { Component } from 'react';
import Mains from './Mains';
import Extras from './Extras';
import { Provider } from './Context';
import './MenuStyles.css';
import Total from './Total';
import axios from 'axios';
class Menus extends Component {
	constructor() {
		super();
		this.state = {
			menu: {
				mains: [
					{
						name: 'loading',
						description: 'loading',
						price: 'loading',
					},
				],
				sides: [
					{
						name: 'loading',
						price: 'loading',
					},
				],
				drinks: [
					{
						name: 'loading',
						price: 'loading',
						category: 'loading',
					},
				],
			},
			error: '',
			loading: true,
		};
	}

	componentWillMount() {
		axios
			.get('http://localhost:5000/api/Menu/View')
			.then((res) => this.setState({ menu: res.data }))
			.catch((err) => this.setState({ error: err }));
		this.setState({ loading: false });
	}

	// add a loading page while retrieving data from back end
	render() {
		const { menu, error, loading } = this.state;
		return (
			<Provider>
				<div className='menu'>
					<Mains meals={menu.mains} />
					<aside className='aside'>
						<Extras type='Sides' items={menu.sides} />
						<Extras type='Drinks' items={menu.drinks} />
					</aside>
					<Total data={this.state.menu} />
				</div>
			</Provider>
		);
	}
}
export default Menus;
