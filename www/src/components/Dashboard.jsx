import React, { Component } from 'react';
// import BarChart from './BarChart'
import { Jumbotron, Container, Button } from 'react-bootstrap'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import ShowTable from './ShowTable'
import PatientDashboard from './PatientDashboard'
import GuestDashboard from './GuestDashboard'
import DoctorDashboard from './DoctorDashboard'
import PharmacistDashboard from './PharmacistDashboard'
// import ReactSpinner from 'react-bootstrap-spinner'
import { withRouter } from 'react-router-dom'
let dashboard = <div></div>
class DashBoard extends Component {
  //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
  state = { toggleActiveUserTable:false,
            username:null,
            usertype:'Guest',
            dashboard:<GuestDashboard></GuestDashboard>,
            logged:false,
            logged_id:null}
            
  constructor(props) {
    super(props);
  }
  
  toggleShowActiveUser=()=>{
    this.setState({toggleActiveUserTable:!this.state.toggleActiveUserTable})
  }
  onClickLogout = () => {
    this.onLoggedOut()
   }
  onLoggedIn=(e)=>{
    console.log(e.usertype)
    this.setState({usertype:e.usertype,username:e.username,logged:true,fname:e.fname,lname:e.lname})
    if(this.state.usertype==='Patient'){
      this.setState({dashboard:<PatientDashboard usertype={this.state.usertype} username={this.state.username}/>})
    }else if(this.state.usertype==='Doctor'){
      this.setState({dashboard:<DoctorDashboard usertype={this.state.usertype} username={this.state.username}></DoctorDashboard>})
    }else if(this.state.usertype==='Pharmacist'){
      this.setState({dashboard:<PharmacistDashboard usertype={this.state.usertype} username={this.state.username}></PharmacistDashboard>})
    }else{
      this.setState({dashboard:<GuestDashboard></GuestDashboard>})
    }
   
  }
  onLoggedOut=()=>{
    this.setState({logged:false,usertype:'Guest',username:null,dashboard:<GuestDashboard></GuestDashboard>})
    this.props.history.push('')
    // history.push("/");
  }
  componentDidUpdate(){
    // console.log(this.state.usertype)
    // if(this.state.usertype==='patient')dashboard=<div>Hello patient</div>
    // else dashboard=<div>Hello dashboard</div>
  }
  render() {
    // const history = useHistory();
    const fillH = { width: '100%',height:'55%' }

    
    return (
      <React.Fragment>
        <Header username={this.state.username}
                fname={this.state.fname}
                lname={this.state.lname}
                logged={this.state.logged} 
                onLoggedIn={(e)=>this.onLoggedIn(e)} 
                usertype={this.state.usertype}
                onLoggedOut={this.onLoggedOut}
                onClickLogout={this.onClickLogout}
                />
                {/* <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showuser" payload={{}}></ShowTable></div> */}
        
        {this.state.dashboard}

        
        
        
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

export default withRouter(DashBoard);