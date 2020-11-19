import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
import TableComponent from './TableComponent'
import DataTable from './DataTable'
import ShowMedicineTable from './ShowMedicineTable'
class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  constructor(props) {
    super(props);
  }
  


  render() {

    const data = [
      {
        name: 'Mike',
        fname: 'Passawit'
      },
      {
        name: 'Peem',
        fname: 'Peerawit'
      },
      {
        name: 'Mic',
        fname: 'Parawout'
      },
      {
        name: 'Piano',
        fname: 'Pafft'
    
      },
    ];
    const columns = [
      {
        title: 'name',
        dataKey: 'name',
        key: 'name',
      },
      {
        title: 'fname',
        dataKey: 'fname',
        key: 'fname',
      },
    ];    
    
    return (
      <React.Fragment>
      <Header></Header>
      {/* <DataTable data={data} columns={columns} ></DataTable> */}
      <ShowMedicineTable user_id="1"></ShowMedicineTable>
      </React.Fragment>
    );
  }
}

export default DashBoard;