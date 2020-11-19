import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import ShowTable from './ShowTable'
class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  constructor(props) {
    super(props);
  }
  


  render() {    
    return (
      <React.Fragment>
      <Header></Header>
      {/* <DataTable data={data} columns={columns} ></DataTable> */}
      {/* <ShowTable APIendpoint="showmedicine" payload={{user_id:'1'}}></ShowTable> */}
      <ShowTable APIendpoint="showuser" payload={{}}></ShowTable>
      </React.Fragment>
    );
  }
}

export default DashBoard;