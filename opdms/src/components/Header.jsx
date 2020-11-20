import React, { Component } from 'react';
import { Navbar ,  Nav, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import SlidingBar from './SlidingBar'
import RegisterPaneContent from './RegisterPaneContent'
import LoginPaneContent from './LoginPaneContent'
import AppointmentPaneContent from './AppointmentPaneContent'
import OrderPaneContent from './OrderPaneContent'
import ReceiptPaneContent from './ReceiptPaneContent'
import { withRouter } from 'react-router-dom'
// import TableComponent from './TableComponent'
import 'bootstrap/dist/css/bootstrap.css';

class Header extends Component {
  //header menu 
  state = {
    toggleLoginPane:false,
    toggleRegisterPane:false,
    toggleAppointmentPane:false,
    toggleOrderPane:false,
    toggleReceiptPane:false,
    // usertype:'Guest',
    // logged:false,
    // logged_id:null,
  }
  
  onClickLogin = () => {
    this.setState({toggleLoginPane:!this.state.toggleLoginPane})

  }
  onClickRegister = () => {
    this.setState({toggleRegisterPane:!this.state.toggleRegisterPane})
  }
  onClickAppointment = () => {
    this.setState({toggleAppointmentPane:!this.state.toggleAppointmentPane})
  }
  onClickOrder = () => {
    this.setState({toggleOrderPane:!this.state.toggleOrderPane})
  }
  onClickReceipt = () => {
    this.setState({toggleReceiptPane:!this.state.toggleReceiptPane})
  }
  // onClickLogout = () => {
  //  this.onLoggedOut()
  // }
  // onLoggedIn = (e) => {/////
    // console.log(e.username)
    // this.setState({usertype:e.usertype,username:e.username,logged:true})
    // this.props.onLoggedIn(e)
  // }
  // onLoggedOut =()=>{////////
    // this.setState({logged:false,usertype:'Guest',username:null})
  // }
  handleOnClickLogout(){
    // this.routerChange()
    // this.props.history.push('/')
    this.props.onClickLogout()
  }
  routerChange=()=>{
    this.props.history.push('/')
  }
  render() {
    

    let userContent = <div></div>
    if(this.props.usertype==='Pharmacist'){////
      userContent=<div>Pharmacist: {this.props.fname} {this.props.lname}</div>
    } else if(this.props.usertype==='Doctor') {////
    userContent=<div>Doctor: {this.props.fname} {this.props.lname}</div>
    } else if(this.props.usertype==='Guest') {////
      userContent=<div>Guest</div>
    } else if(this.props.usertype==='Patient') {////
      userContent=<div>Patient: {this.props.fname} {this.props.lname}</div>
    }

    let headerContent1 = <div></div>
    let headerContent2 = <div></div>
    let headerContent3 = <div></div>
    if (this.props.usertype==='Patient') {
      headerContent1 = <Nav.Link onClick={this.onClickAppointment}>Make Appointment</Nav.Link>
      // headerContent2 = <Nav.Link onClick={this.onClickRegister}>View Schedule</Nav.Link>
      // headerContent3 = <Nav.Link onClick={this.onClickRegister}>View Dispensation</Nav.Link>
    } else if (this.props.usertype==='Doctor') {
      headerContent1 = <Nav.Link onClick={this.onClickRegister}>Manage Schedule</Nav.Link>
      headerContent2 = <Nav.Link onClick={this.onClickRegister}>Create Diagnosis</Nav.Link>
      headerContent3 = <Nav.Link onClick={this.onClickRegister}>Create Dispensation</Nav.Link>
    } else if (this.props.usertype==='Pharmacist') {
      headerContent1 = <Nav.Link onClick={this.onClickOrder}>Manage Medicine Order</Nav.Link>
      // headerContent2 = <Nav.Link onClick={this.onClickRegister}>View Storage</Nav.Link>
      headerContent3 = <Nav.Link onClick={this.onClickReceipt}>Manage Receipt</Nav.Link>
    } 

    const paneContent_Login = <div><LoginPaneContent onLoggedIn={(e)=>this.props.onLoggedIn(e)} onClickLogin={this.onClickLogin} onLoggedOut={this.props.onClickLogout} logged={this.props.logged}></LoginPaneContent></div>////
    const paneContent_Register = <div><RegisterPaneContent/></div>
    const paneContent_Appointment = <div><AppointmentPaneContent/></div>
    const paneContent_Order = <div><OrderPaneContent/></div>
    const paneContent_Receipt = <div><ReceiptPaneContent/></div>
    let logButton = !this.props.logged ? <Nav.Link onClick={this.onClickLogin}>Login</Nav.Link> : <Nav.Link onClick={this.props.onClickLogout}>Logout</Nav.Link>///
    let regButton = !this.props.logged ? <Nav.Link onClick={this.onClickRegister}>Register</Nav.Link> : <div></div>////
    
    return (
      <React.Fragment>
        {/* <Button onClick={this.routerChange}>Change link</Button> */}
      <Navbar bg='light'>
        <Navbar.Brand href="#">OPDMS</Navbar.Brand>
        {userContent}
        <Navbar.Collapse className="justify-content-end">
        <Nav>
          {headerContent1}
          {headerContent2}
          {headerContent3}
          {logButton}
          {regButton}
        </Nav>
        </Navbar.Collapse>
        <Nav className="mr-auto">
          <SlidingBar 
            onClickToggleLogin={this.onClickToggleLogin}
            isPaneOpen={this.state.toggleLoginPane} 
            onTogglePane={this.onClickLogin} ///
            paneContent={paneContent_Login}
            title={'Login'}
          ></SlidingBar>
          <SlidingBar 
            onClickToggleLogin={this.onClickToggleRegister}
            isPaneOpen={this.state.toggleRegisterPane} 
            onTogglePane={this.onClickRegister} 
            paneContent={paneContent_Register}
            title={'Register'}
          ></SlidingBar>
          <SlidingBar 
            onClickToggleAppointment={this.onClickToggleAppointment}
            isPaneOpen={this.state.toggleAppointmentPane} 
            onTogglePane={this.onClickAppointment} 
            paneContent={paneContent_Appointment}
            title={'Make Appointment'}
          ></SlidingBar>
          <SlidingBar 
            onClickToggleOrder={this.onClickToggleOrder}
            isPaneOpen={this.state.toggleOrderPane} 
            onTogglePane={this.onClickOrder} 
            paneContent={paneContent_Order}
            title={'Manage Medicine Order'}
          ></SlidingBar>
          <SlidingBar 
            onClickToggleReceipt={this.onClickToggleReceipt}
            isPaneOpen={this.state.toggleReceiptPane} 
            onTogglePane={this.onClickReceipt} 
            paneContent={paneContent_Receipt}
            title={'Manage Receipt'}
          ></SlidingBar>
        </Nav>
      </Navbar>
        {/* <TableComponent></TableComponent> */}
       </React.Fragment>

      
    );
  }
  componentDidMount(){

  }

}



export default withRouter(Header);