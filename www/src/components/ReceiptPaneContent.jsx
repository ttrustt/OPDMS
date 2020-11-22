import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class ReceiptPaneContent extends Component {
    state = {
        receipt_number: null,
        order_id: null,

        response: '',
        loadingBill: false,
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

    componentDidUpdate() {
        // console.log(this.state)
    }

    handleSubmitBill = () => {
        this.setState({ loadingBill: true })
        this.onRequestBill()
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
            </Form>
        );
    }
}

export default ReceiptPaneContent;