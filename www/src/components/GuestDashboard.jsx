import React, { Component } from 'react';
// import BarChart from './BarChart'
import { Jumbotron, Container, Button } from 'react-bootstrap'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import ShowTable from './ShowTable'
import PatientDashboard from './PatientDashboard'
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
class GuestDashboard extends Component {
    state = { toggleActiveUserTable:false}

    toggleShowActiveUser=()=>{
        this.setState({toggleActiveUserTable:!this.state.toggleActiveUserTable})
      }
    render() {
        return (
            <React.Fragment>
<Jumbotron fluid style={{marginBottom:0}}>
          <Container>
            <h1>Welcome to OPDMS</h1>
            <p>OPDMS - OutPatient Department Management System</p>
    <Button onClick={this.toggleShowActiveUser}>{this.state.toggleActiveUserTable?<div>Hide Active User</div>:<div>Active User</div>}</Button>
          </Container>
        </Jumbotron>
          {this.state.toggleActiveUserTable?<div  style={{width: '100%', height: '68%'}}><ShowTable APIendpoint="showuser" payload={{}}></ShowTable></div>:<div></div>}
            </React.Fragment>
        );
    }
}

export default GuestDashboard;