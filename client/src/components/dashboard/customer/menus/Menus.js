import React, { Component } from 'react';
import Mains from './Mains';
import Extras from './Extras';
import { Provider } from './Context';
import './MenuStyles.css';
import Total from './Total';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GatherOrder from '../Orders/GatherOrder';
import toastr from 'toastr';
class Menus extends Component {
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
			Order: {
				total: '???',
			},
			error: '',
			loading: true,
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Menu/View')
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					this.setState({ menu: data });
					toastr.success('Successfully retrieved data!');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}

	// add a loading page while retrieving data from back end
	render() {
		const { menu } = this.state;
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
				<div style={{ height: '15vh' }} className='container valign-wrapper'>
					<div className='row'>
						<div className='col s6 center-align'>
							<Link
								to='/dashboard/customer/Dashboards'
								style={{
									width: '140px',
									borderRadius: '3px',
									letterSpacing: '1.5px',
								}}
								className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
								Previous
							</Link>
						</div>
						<div className='col s6 center-align'>
							<GatherOrder data={this.state.menu} />
						</div>
					</div>
				</div>
			</Provider>
		);
	}
}
export default Menus;
