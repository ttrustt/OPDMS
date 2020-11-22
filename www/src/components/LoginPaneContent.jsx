import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner} from 'react-bootstrap'
import axios from 'axios'
class LoginPaneContent extends Component {
    state = { 
        username:'',
        password:'',
        loading:false,
        status:'',
     }

     onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/login', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((response) => {
                console.log(response.data.status);
                this.setState({status:response.data.status})
                this.setState({loading:false})
                if(response.data.success)this.props.onClickLogin()
                if(response.data.success)this.props.onLoggedIn(response.data)
                else {this.props.onLoggedOut()}
            }, (error) => {
                console.log(error);
            });
    }

    handleSubmit = () => {
        this.setState({loading:true})
        this.onRequest()
    }
    onKeyDown=(e)=>{
        if (e.keyCode === 13) {
            e.preventDefault()
            this.handleSubmit()
        }
    }
    
    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control placeholder="Username" onChange={(e)=>this.setState({username:e.target.value})} />
                    {'\u00A0'}
                    <Form.Control type = "password" placeholder="Password" onChange={(e)=>this.setState({password:e.target.value})}onKeyDown={(e)=> this.onKeyDown(e)} />
                </Form.Group>
                <Button variant="primary" disabled={this.props.logged} onClick={this.handleSubmit}>
                    {this.state.loading ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : <div></div>}
                        Login

                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>

            </Form>
        );
    }
}

export default LoginPaneContent;