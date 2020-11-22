import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class ReceiptPaneContent extends Component {
    state = {
        receipt_number: null,
        rn: null,

        response: '',
        loadingBill: false,
        loadingDelete: false,
        status:'',
        billStatus:''
    }

    onRequestBill = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/updatebill', {
            receipt_number: this.state.receipt_number,
        })
        .then((response) => {
            this.setState({ loadingBill: false })
            console.log(response.data.billStatus);
            this.setState({billStatus:response.data.billStatus})
        }, (error) => {
            console.log(error);
        });
    }

    onRequestDelete = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/deletereceipt', {
            receipt_number: this.state.rn,
        })
        .then((response) => {
            this.setState({ loadingDelete: false })
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
        this.setState({ loadingBill: true })
        this.onRequestBill()
    }

    handleDelete = () => {
        this.setState({ loadingDelete: true })
        this.onRequestDelete()
    }
    
    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control placeholder="Receipt Number" onChange={(e) => this.setState({ receipt_number: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmitBill}>
                    {this.state.loadingBill ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Mark as PAID
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.billStatus}
                </Form.Text>
                {'\u00A0'}
                <Form.Group >
                    <Form.Control placeholder="Receipt Number" onChange={(e) => this.setState({ rn: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleDelete}>
                    {this.state.loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Delete Receipt
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default ReceiptPaneContent;