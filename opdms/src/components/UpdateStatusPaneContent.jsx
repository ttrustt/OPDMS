import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class UpdateStatusPaneContent extends Component {
    state = {
        receipt_number: null,
        order_id: null,

        response: '',
        loading: false,
        status:''
    }

    onRequestBill = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/updatebill', {
            receipt_number: this.state.receipt_number,
        })
        .then((response) => {
            this.setState({ loading: false })
            console.log(response.data.status);
            this.setState({status:response.data.status})
        }, (error) => {
            console.log(error);
        });
    }

    onRequestOrder = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/updateorder', {
            order_id: this.state.order_id,
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

    handleSubmitBill = () => {
        this.setState({ loading: true })
        this.onRequestBill()
    }

    handleSubmitOrder = () => {
        this.setState({ loading: true })
        this.onRequestOrder()
    }
    
    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control placeholder="Receipt Number" onChange={(e) => this.setState({ receipt_number: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmitBill}>
                    {this.state.loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Mark as PAID
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
                {'\u00A0'}
                <Form.Group >
                    <Form.Control placeholder="Order ID" onChange={(e) => this.setState({ order_id: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmitOrder}>
                    {this.state.loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Mark as RECEIVED
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default UpdateStatusPaneContent;