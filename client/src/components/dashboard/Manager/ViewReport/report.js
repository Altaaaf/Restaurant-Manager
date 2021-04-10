import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modules: AllModules,
			columnDefs: [],
			rowData: [],
			changes: [],
			DataSource: '',
		};
		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.handleDataSourceChange = this.handleDataSourceChange.bind(this);
	}
	handleDataSourceChange(event) {
		const target = event.target;
		const value = event.target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
		if (
			value == 'Reservations' ||
			value == 'Orders' ||
			value == 'Users' ||
			value == 'Customers' ||
			value == 'Managers'
		) {
			axios.get('http://localhost:5000/Api/Reports/' + value).then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ rowData: data.RowInformation });
				this.setState({ columnDefs: data.Columns });
			});
		}
	}
	onGridReady = (params) => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
	};
	onBtExport = () => {
		this.gridApi.exportDataAsExcel({});
	};

	updateRow = () => {
		axios
			.put('http://localhost:5000/Api/Reports/Modify/' + this.state.DataSource, {
				updates: this.state.changes,
			})
			.then((res) => {
				const data = res.data;
				console.log(data);
				alert(data.status);
			});
		console.log('updating changes');
	};

	onSelectionChange = (event) => {
		console.log(event.api.getSelectedRows());
		this.setState({ changes: event.api.getSelectedRows() });
	};

	render() {
		const { DataSource } = this.state;
		return (
			<div className='admin-home-main-container'>
				<div className='admin-home-main-content'>
					<label>
						<button onClick={() => this.onBtExport()} style={{ margin: '5px', fontWeight: 'bold' }}>
							Export to Excel
						</button>
					</label>
					<label>
						<button onClick={() => this.updateRow()} style={{ margin: '5px', fontWeight: 'bold' }}>
							Update selected rows!
						</button>
					</label>
					<input
						list='DataSource'
						name='DataSource'
						placeholder='DataSource'
						value={DataSource}
						onChange={this.handleDataSourceChange}
					/>
					<select value={this.state.DataSource} onChange={this.handleDataSourceChange}>
						<datalist id='DataSource'>
							<option value='Reservations' />
							<option value='Orders' />
							<option value='Customers' />
							<option value='Managers' />
						</datalist>
					</select>
					<div
						className='ag-theme-balham'
						style={{
							height: '90%',
							width: '100%',
						}}>
						<AgGridReact
							modules={this.state.modules}
							enterMovesDown={true}
							enterMovesDownAfterEdit={true}
							onGridReady={this.onGridReady}
							onSelectionChanged={this.onSelectionChange}
							defaultColDef={{
								flex: 1,
								minWidth: 100,
								filter: true,
								resizable: true,
								sortable: true,
							}}
							rowMultiSelectWithClick={true}
							rowSelection='multiple'
							sideBar={'filters'}
							pagination={true}
							columnDefs={this.state.columnDefs}
							rowData={this.state.rowData}></AgGridReact>
						<div>
							<Link to='/dashboard/manager/ManagerDashboard'>
								<button style={{ margin: '5px', fontWeight: 'bold' }}>Back To Dashboard</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default report;
