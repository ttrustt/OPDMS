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
    userType:'user',
    
  }
  onClickLogin=()=>{
    this.setState({toggleLoginPane:!this.state.toggleLoginPane})
  }
  onClickRegister=()=>{
    this.setState({toggleRegisterPane:!this.state.toggleRegisterPane})
  }
  onClickLogout=()=>{
  }
  onChangeUserType=()=>{
    this.setState({userType:"doctor"})
    this.props.onClickToggleLogin()
  }
  

  render() {
    let headerContent = <div></div>
    if(this.state.userType==='user'){
        headerContent=<div>User</div>
    }else if(this.state.userType==='doctor'){
       headerContent=<div>Docter</div>
    }

    const paneContent_Login = <div><LoginPaneContent></LoginPaneContent></div>
    const paneContent_Register = <div><RegisterPaneContent/></div>
    let logButton = !this.props.logged? <Nav.Link onClick={this.onClickLogin}>Login</Nav.Link> : <Nav.Link onClick={this.props.onClickToggleLogin}>Logout</Nav.Link>
    let regButton = !this.props.logged?<Nav.Link onClick={this.onClickRegister}>Register</Nav.Link>:<div></div>
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