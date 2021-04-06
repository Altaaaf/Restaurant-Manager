import React, { Component } from 'react';
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
			components: { datePicker: getDatePicker() },
        
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
			</div>
            </div>
            </div>
		);

	}

}
function getDatePicker() {
	function Datepicker() {}
	Datepicker.prototype.init = function (params) {
	  this.eInput = document.createElement('input');
	  this.eInput.value = params.value;
	  this.eInput.classList.add('ag-input');
	  this.eInput.style.height = '100%';
	  this.eInput.$(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
	};
	Datepicker.prototype.getGui = function () {
	  return this.eInput;
	};
	Datepicker.prototype.afterGuiAttached = function () {
	  this.eInput.focus();
	  this.eInput.select();
	};
	Datepicker.prototype.getValue = function () {
	  return this.eInput.value;
	};
	Datepicker.prototype.destroy = function () {};
	Datepicker.prototype.isPopup = function () {
	  return false;
	};
	return Datepicker;
  }

  function getBooleanValue(cssSelector) {
	return document.querySelector(cssSelector).checked === true;
  }
  

export default report;