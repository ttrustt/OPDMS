import React, { Component } from 'react';
import { Navbar ,  Nav, Button} from 'react-bootstrap'
import axios from 'axios'
import SlidingBar from './SlidingBar'
import 'bootstrap/dist/css/bootstrap.css';
class Header extends Component {
  //header menu 
  state = {
    toggleLoginPane:false,
    toggleRegisterPane:false,
    datasets:[],
    
  }
  onClickLogin=()=>{
    this.setState({toggleLoginPane:!this.state.toggleLoginPane})
  }
  onClickRegister=()=>{
    this.setState({toggleRegisterPane:!this.state.toggleRegisterPane})
  }
  onClickLogout=()=>{
  }
  

  render() {
    const paneContent_Login = <div>
      <Button onClick={this.props.onClickToggleLogin}>Toggle Log in</Button>
      
      </div>
    const paneContent_Register = <div><Button onClick={this.props.onClickToggleLogin}>Toggle Log in</Button></div>
    let logButton = !this.props.logged? <Nav.Link onClick={this.onClickLogin}>Login</Nav.Link> : <Nav.Link onClick={this.props.onClickToggleLogin}>Logout</Nav.Link>
    let regButton = !this.props.logged?<Nav.Link onClick={this.onClickRegister}>Register</Nav.Link>:<div></div>
    return (
      <Navbar bg='light'>
        <Navbar.Brand href="#">OPDMS</Navbar.Brand>
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