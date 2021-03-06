import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class DispensationPaneContent extends Component {
    state = {
        visit_number: '',
        receipt_number: '',
        pharma_code: '',
        quantity: '',
        description: '',
        generated_rn:'',

        response: '',
        loadingGenerate: false,
        loading: false,
        statusGenerate:'',
        status:''
    }

    onRequestGenerate = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/generatereceipt', {})
        .then((response) => {
            this.setState({ loadingGenerate: false })
            console.log(response.data.statusGenerate);
            this.setState({statusGenerate:response.data.status, generated_rn:response.data.data})
        }, (error) => {
            console.log(error);
        });
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/createdispensation', {
            visit_number: this.state.visit_number,
            receipt_number: this.state.receipt_number,
            pharma_code: this.state.pharma_code,
            quantity: this.state.quantity,
            description: this.state.description
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

    handleSubmitGenerate = () => {
        this.setState({ loadingGenerate: true })
        this.onRequestGenerate()
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        this.onRequest()
    }
    
    render() {
        return (
            <Form>
                <Button variant="primary" onClick={this.handleSubmitGenerate}>
                    {this.state.loadingGenerate ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Generate Receipt Number
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.statusGenerate}, Receipt Number : {this.state.generated_rn}
                </Form.Text>
                {'\u00A0'}
                <Form.Group >
                    <Form.Control placeholder="Visit Number" onChange={(e) => this.setState({ visit_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Receipt Number" onChange={(e) => this.setState({ receipt_number: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Pharma Code" onChange={(e) => this.setState({ pharma_code: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Quantity" onChange={(e) => this.setState({ quantity: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                    {this.state.loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Submit Dispensation
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default DispensationPaneContent;