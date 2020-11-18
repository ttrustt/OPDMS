import React, { Component } from 'react';
import { Navbar ,  Nav, Button,Form} from 'react-bootstrap'
import axios from 'axios'
import SlidingBar from './SlidingBar'
import RegisterPaneContent from './RegisterPaneContent'
import LoginPaneContent from './LoginPaneContent'
import 'bootstrap/dist/css/bootstrap.css';

class Header extends Component {
  //header menu 
  state = {
    toggleLoginPane:false,
    toggleRegisterPane:false,
    usertype:'Guest',
    logged:false,
    
  }
  onClickLogin=()=>{
    this.setState({toggleLoginPane:!this.state.toggleLoginPane})
  }
  onClickRegister=()=>{
    this.setState({toggleRegisterPane:!this.state.toggleRegisterPane})
  }
  onClickLogout=()=>{
    this.setState({logged:false,usertype:'Guest'})
  }
  onChangeUserType=(e)=>{
    this.setState({usertype:e})
    if(this.state.usertype != 'Guest'){
      this.setState({logged:true})
    }
  }


  render() {
    let headerContent = <div></div>
    if(this.state.usertype==='User'){
        headerContent=<div>User</div>
    }else if(this.state.usertype==='Doctor'){
        headerContent=<div>Doctor</div>
    }else if(this.state.usertype==='Guest'){
        headerContent=<div>Guest</div>
    }else if(this.state.usertype==='Patient'){
    headerContent=<div>Patient</div>
    }

    const paneContent_Login = <div><LoginPaneContent onChangeUserType={(e)=>this.onChangeUserType(e)}></LoginPaneContent></div>
    const paneContent_Register = <div><RegisterPaneContent/></div>
    let logButton = !this.state.logged? <Nav.Link onClick={this.onClickLogin}>Login</Nav.Link> : <Nav.Link onClick={this.onClickLogout}>Logout</Nav.Link>
    let regButton = !this.state.logged?<Nav.Link onClick={this.onClickRegister}>Register</Nav.Link>:<div></div>
    return (
      <Navbar bg='light'>
        <Navbar.Brand href="#">OPDMS</Navbar.Brand>
        {headerContent}
        <Navbar.Collapse className="justify-content-end">
        <Nav>
          {logButton}
          {regButton}
          </Nav>
          </Navbar.Collapse>
        <Nav className="mr-auto">

      <SlidingBar 
        onClickToggleLogin={this.onClickToggleLogin}
        isPaneOpen={this.state.toggleLoginPane} 
        onTogglePane={this.onClickLogin} 
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
        </Nav>
      </Navbar>
    );
  }
  componentDidMount(){

  }

}



export default Header;