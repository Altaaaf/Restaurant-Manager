import { Component } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columnDefs: [
				{headerName: 'First Name', field: 'FirstName'},
                {headerName: 'Last Name', field: 'lastName'},
                {headerName: 'phone', field: 'phone'},
                {headerName: 'Number of People', field: 'coverNo', editable: true},
                {headerName: 'Reservation Time', field: 'ReservationTime',editable: true},
			],
        
			rowData: []
            
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
    render() {
        
		return (
            <div className='admin-home-main-container'>
				<div className='admin-home-main-content'>
			<div
				className="ag-theme-balham"
				style={{
					height: '500px',
					width: '1770px'
				}}
			>
				<AgGridReact
                defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
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

export default report;