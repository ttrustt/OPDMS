import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class OrderPaneContent extends Component {
    state = {
        pharma_room_id: null,
        supplier_id: null,
        manufacturing_date: null,
        expired_date: null,
        quantity: null,
        price: null,
        pharma_code: null,

        response: '',
        loading: false,
        status:''
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/order', {
            pharma_room_id: this.state.pharma_room_id,
            supplier_id: this.state.supplier_id,
            manufacturing_date: this.manufacturing_date.time_in,
            expired_date: this.state.expired_date,
            quantity: this.state.quantity,
            price: this.state.price,
            pharma_code: this.state.pharma_code,
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
                    <Form.Control placeholder="Pharma Room ID" onChange={(e) => this.setState({ pharma_room_id: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Supplier ID" onChange={(e) => this.setState({ supplier_id: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Manufacturing Date" onChange={(e) => this.setState({ manufacturing_date: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Expired Date" onChange={(e) => this.setState({ expired_date: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Quantity" onChange={(e) => this.setState({ quantity: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Price" onChange={(e) => this.setState({ price: e.target.value })} />
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

export default OrderPaneContent;