import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";

class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  constructor(props) {
    super(props);
    this.state={
      logged:false,
    }
  }
  
  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  
  
  render() {
    return (
      <React.Fragment>
      <Header logged={this.state.logged} onClickToggleLogin={this.onClickToggleLogin}></Header>

      </React.Fragment>
    );
  }
}

export default DashBoard;