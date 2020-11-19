import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
import TableComponent from './TableComponent'
import DataTable from './DataTable'

class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  constructor(props) {
    super(props);
  }


  
  
  render() {
    
    const dataSource = [
      {
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
        id: 1
      },
      {
        name: 'John',
        age: 42,
        address: '10 Doning Street',
        id: 2
      },
    ];
    const columns = [
      {
        title: 'name',
        dataKey: 'name',
        key: 'name',
        width:150
      },
      {
        title: 'age',
        dataKey: 'age',
        key: 'age',
        width:150
      },
      {
        title: 'address',
        dataKey: 'address',
        key: 'address',
        width:150
      },
    ];    
    return (
      <React.Fragment>
      <Header></Header>
      <DataTable data={dataSource} columns={columns}></DataTable>
      </React.Fragment>
    );
  }
}

export default DashBoard;