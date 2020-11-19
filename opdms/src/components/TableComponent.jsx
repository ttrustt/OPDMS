import React, { Component } from 'react';
import Table from "rc-table";

import MUIDataTable from "mui-datatables";
class TableComponent extends Component {
    state = {
        columns: [
            {
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "company",
                label: "Company",
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: "city",
                label: "City",
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: "state",
                label: "State",
                options: {
                    filter: true,
                    sort: false,
                },
            },
        ],
        data: [
            {
                name: "Joe James",
                company: "Test Corp",
                city: "Yonkers",
                state: "NY",
            },
            {
                name: "John Walsh",
                company: "Test Corp",
                city: "Hartford",
                state: "CT",
            },
            {
                name: "Bob Herm",
                company: "Test Corp",
                city: "Tampa",
                state: "FL",
            },
            {
                name: "James Houston",
                company: "Test Corp",
                city: "Dallas",
                state: "TX",
            },
        ]
    }
    render() {
        return (
            <div className='table-container'>
                <MUIDataTable
                    title={"Employee List"}
                    data={this.state.data}
                    columns={this.state.columns}
                    options={{selectableRowsHeader:false,selectableRows:'none'}}
                />
            </div>
        );
    }
}

export default TableComponent;