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
    
    const data = [
      {
        name: 'Mike',
      },
      {
        name: 'Peem',
      },
      {
        name: 'Mic',
      },
      {
        name: 'Piano',
    
      },
    ];
    const columns = [
      {
        title: 'name',
        dataKey: 'name',
        key: 'name',
      },
      {
        title: 'id',
        dataKey: 'id',
        key:'id'
      }
    ];    
    return (
      <React.Fragment>
      <Header></Header>
      <DataTable data={data} columns={columns} ></DataTable>
      </React.Fragment>
    );
  }
}

export default DashBoard;