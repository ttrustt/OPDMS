import React, { Component } from 'react';
// import BarChart from './BarChart'
import { Jumbotron, Container, Button } from 'react-bootstrap'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import ShowTable from './ShowTable'
import UserDashboard from './UserDashboard'
class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  state = { toggleActiveUserTable:false,username:null,usertype:null}
  constructor(props) {
    super(props);
  
    
  }


  toggleShowActiveUser=()=>{
    this.setState({toggleActiveUserTable:!this.state.toggleActiveUserTable})
  }
  onLoggedIn=(e)=>{
    console.log(e)
    this.setState({username:e.username,usertype:e.usertype})
  }
  render() {
    const fillH = { width: '100%',height:'55%' }
    return (
      <React.Fragment>
        <Header onLoggedIn={(e)=>this.onLoggedIn(e)}/>
        <UserDashboard usertype={this.state.usertype} username={this.state.username}/>
        
        {/* <Jumbotron fluid>
          <Container>
            <h1>Welcome to OPDMS</h1>
            <p>OPDMS stands for Out Patient Management System</p>
    <Button onClick={this.toggleShowActiveUser}>{this.state.toggleActiveUserTable?<div>Hide Active User</div>:<div>Active User</div>}</Button>
          </Container>
        </Jumbotron>
          {this.state.toggleActiveUserTable?<div style={fillH}><ShowTable APIendpoint="showuser" payload={{}}></ShowTable></div>:<div></div>}
           */}
      </React.Fragment>
    );
  }
}

export default DashBoard;