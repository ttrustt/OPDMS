import React, { Component } from 'react';
import { Navbar, Nav, Button, Form} from 'react-bootstrap'
import axios from 'axios'
class LoginPaneContent extends Component {
    state = { 
        username:'',
        password:''
     }

     onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/login', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((response) => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control  placeholder="Username" onChange={(e)=>this.setState({username:e.target.value})} />
                    <Form.Control  placeholder="Password" onChange={(e)=>this.setState({password:e.target.value})} />
                </Form.Group>
                <Button variant="primary" onClick={this.onRequest}>
                    Submit
                </Button>
            </Form>
        );
    }
}

export default LoginPaneContent;