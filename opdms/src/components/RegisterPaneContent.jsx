import React, { Component } from 'react';
import { Navbar, Nav, Button, Form} from 'react-bootstrap'
import axios from 'axios'

class RegisterPaneContent extends Component {
    state = {
        fname: '',
        lname: '',
        religion: '',
        address: '',
        province: '',
        postal_code: '',
        identification_number: '',
        passport_number: '',
        mobile_number: '',
        nationality: '',
        sex: '',
        birthdate: '',
        email: '',
        username: '',
        password: '',
        user_type: '',
        response: ''
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/register', {
            fname: this.state.fname,
            lname: this.state.lname,
            religion: this.state.religion,
            address: this.state.adress,
            province: this.state.province,
            postal_code: this.state.postal_code,
            identification_number: this.state.identification_number,
            passport_number: this.state.passport_number,
            mobile_number: this.state.mobile_number,
            nationality: this.state.nationality,
            sex: this.state.sex,
            birthdate: this.state.birthdate,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            user_type: this.state.user_type
        })
            .then((response) => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            });
    }
    componentDidUpdate(){
        // console.log(this.state)
    }

    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control  placeholder="First name" onChange={(e)=>this.setState({fname:e.target.value})} />
                    <Form.Control  placeholder="Last name" onChange={(e)=>this.setState({lname:e.target.value})} />
                    <Form.Control  placeholder="Religion" onChange={(e)=>this.setState({religion:e.target.value})} />
                    <Form.Control  placeholder="Address" onChange={(e)=>this.setState({address:e.target.value})} />
                    <Form.Control  placeholder="Province" onChange={(e)=>this.setState({province:e.target.value})} />
                    <Form.Control  placeholder="Postal_code" onChange={(e)=>this.setState({postal_code:e.target.value})} />
                    <Form.Control  placeholder="Id" onChange={(e)=>this.setState({identification_number:e.target.value})} />
                    <Form.Control  placeholder="Passport" onChange={(e)=>this.setState({passport_number:e.target.value})} />
                    <Form.Control  placeholder="Mobile no" onChange={(e)=>this.setState({mobile_number:e.target.value})} />
                    <Form.Control  placeholder="Nationality" onChange={(e)=>this.setState({nationality:e.target.value})} />
                    <Form.Control  placeholder="Sex" onChange={(e)=>this.setState({sex:e.target.value})} />
                    <Form.Control  placeholder="Birthdate" onChange={(e)=>this.setState({birthdate:e.target.value})} />
                    <Form.Control  placeholder="Email" onChange={(e)=>this.setState({email:e.target.value})} />
                    <Form.Control  placeholder="Username" onChange={(e)=>this.setState({username:e.target.value})} />
                    <Form.Control  placeholder="Password" onChange={(e)=>this.setState({password:e.target.value})} />
                    <Form.Control  placeholder="User type" onChange={(e)=>this.setState({user_type:e.target.value})} />


                </Form.Group>
                <Button variant="primary" onClick={this.onRequest}>
                    Submit
                </Button>
            </Form>
        );
    }
}

export default RegisterPaneContent;