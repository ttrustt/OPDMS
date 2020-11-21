import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class DiagnosisPaneContent extends Component {
    state = {
        visit_number: '',
        schedule_number: '',
        doctors_recommendation: '',
        clinic_id: '',
        icd_code_1: '',
        icd_code_2: '',
        icd_code_3: '',
        icd_code_4: '',
        icd_code_5: '',

        response: '',
        loading: false,
        status:''
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/creatediagnosis', {
            visit_number: this.state.visit_number,
            schedule_number: this.state.schedule_number,
            doctors_recommendation: this.state.doctors_recommendation,
            clinic_id: this.state.clinic_id,
            icd_code_1: this.state.icd_code_1,
            icd_code_2: this.state.icd_code_2,
            icd_code_3: this.state.icd_code_3,
            icd_code_4: this.state.icd_code_4,
            icd_code_5: this.state.icd_code_5
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
                    <Form.Control placeholder="Visit Number" onChange={(e) => this.setState({ visit_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Schedule Number" onChange={(e) => this.setState({ schedule_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Doctor's Recommendation" onChange={(e) => this.setState({ doctors_recommendation: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Clinic ID" onChange={(e) => this.setState({ clinic_id: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="ICD Code 1" onChange={(e) => this.setState({ icd_code_1: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="ICD Code 2" onChange={(e) => this.setState({ icd_code_2: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="ICD Code 3" onChange={(e) => this.setState({ icd_code_3: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="ICD Code 4" onChange={(e) => this.setState({ icd_code_4: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="ICD Code 5" onChange={(e) => this.setState({ icd_code_5: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                    {this.state.loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Submit Diagnosis
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default DiagnosisPaneContent;