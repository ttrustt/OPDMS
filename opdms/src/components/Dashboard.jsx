import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
import TableComponent from './TableComponent'

class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  constructor(props) {
    super(props);
  }

  
  
  render() {
    return (
      <React.Fragment>
      <Header></Header>
    
      </React.Fragment>
    );
  }
}

export default DashBoard;