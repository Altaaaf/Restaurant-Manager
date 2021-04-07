import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';

import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class report extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			modules: AllModules,
			columnDefs: [
				{headerName: 'First Name', field: 'FirstName'},
                {headerName: 'Last Name', field: 'lastName'},
                {headerName: 'phone', field: 'phone',editable: true},
                {headerName: 'Number of People', field: 'coverNo', editable: true},
                {field: 'ReservationTime', editable: true},
			],
			
        
			rowData: [],
			
            
		}
	}
	
    componentDidMount() {
		
		axios
			.get('http://localhost:5000/Api/Reservations/View')
			.then((res) => {
				const data = res.data;
				console.log(data);
				this.setState({ rowData: data.Bookings });
			})
			
	}
	onGridReady = (params) => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
	
		const updateData = (data) => {
		  this.setState({ rowData: data.Bookings });
		};
	}
	onBtExport = () => {
		this.gridApi.exportDataAsExcel({});
	  };
	
	
	
	
		
    render() {
        
		return (
            <div className='admin-home-main-container'>
				<div className='admin-home-main-content'>
				<label>
              <button
                onClick={() => this.onBtExport()}
                style={{ margin: '5px', fontWeight: 'bold' }}
              >
                Export to Excel
              </button>
            </label>
			<div
				className="ag-theme-balham"
				style={{
					height: '90%',
					width: '100%'
				}}
			>
				<AgGridReact
				modules={this.state.modules}
				enterMovesDown={true}
           		 enterMovesDownAfterEdit={true}
           		 onGridReady={this.onGridReady}
				defaultColDef={{
				flex: 1,
				minWidth: 100,
				filter: true,
				resizable: true,
				sortable: true,
			  }}
                
          sideBar={'filters'}
                    pagination={true}
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}>
                    <AgGridColumn
            field="FirstName"
            minWidth={200}
            filter="agTextColumnFilter"
          />
          <AgGridColumn field="lastName" />
          <AgGridColumn field="phone" minWidth={200} />
          <AgGridColumn field="people" />
          <AgGridColumn field="ReservationTime" minWidth={180} />
		  
       
				</AgGridReact>
				<div>
					<Link to='/dashboard/manager/ManagerDashboard'>
						<button style={{ margin: '5px', fontWeight: 'bold' }} >
							Back To Dashboard
						</button>
					</Link>
				</div>
			</div>
            </div>
            </div>
		);

	}

}

  

export default report;