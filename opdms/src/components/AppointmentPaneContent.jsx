import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class AppointmentPaneContent extends Component {
    state = {
        patient_id: null,
        doctor_id: null,
        time_in: null,
        time_out: null,
        diagnosis_room_id: null,

        response: '',
        loading: false,
        status:''
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/appointment', {
            patient_id: this.state.patient_id,
            doctor_id: this.state.doctor_id,
            time_in: this.state.time_in,
            time_out: this.state.time_out,
            diagnosis_room_id: this.state.diagnosis_room_id
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
                    <Form.Control placeholder="Doctor ID" onChange={(e) => this.setState({ doctor_id: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Time In" onChange={(e) => this.setState({ time_in: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Time Out" onChange={(e) => this.setState({ time_out: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Diagnosis Room" onChange={(e) => this.setState({ diagnosis_room_id: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                    {this.state.loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Submit
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default AppointmentPaneContent;