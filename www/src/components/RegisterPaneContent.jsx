import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
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
        response: '',
        loading: false,
        status:''
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/register', {
            fname: this.state.fname,
            lname: this.state.lname,
            religion: this.state.religion,
            address: this.state.address,
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
            this.setState({ loading: false })
            console.log(response.data.status);
            this.setState({status:response.data.status})
        }, (error) => {
            console.log(error);
        });
    }

    componentDidUpdate() {
        // console.log(this.state)
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        this.onRequest()
    }
    
    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control placeholder="First Name" onChange={(e) => this.setState({ fname: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Last Name" onChange={(e) => this.setState({ lname: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Religion" onChange={(e) => this.setState({ religion: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Address" onChange={(e) => this.setState({ address: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Province" onChange={(e) => this.setState({ province: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Postal Code" onChange={(e) => this.setState({ postal_code: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Identification Number or" onChange={(e) => this.setState({ identification_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Passport Number" onChange={(e) => this.setState({ passport_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Mobile Number" onChange={(e) => this.setState({ mobile_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Nationality" onChange={(e) => this.setState({ nationality: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Sex" onChange={(e) => this.setState({ sex: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Birthdate (YYYY-MM-DD)" onChange={(e) => this.setState({ birthdate: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="User Type (Patient/Doctor/Pharmacist)" onChange={(e) => this.setState({ user_type: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                    {this.state.loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Register
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default RegisterPaneContent;