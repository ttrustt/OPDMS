import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class OrderPaneContent extends Component {
    state = {
        pharma_room_id: null,
        supplier_id: null,
        pharma_code: null,
        manufacturing_date: null,
        expired_date: null,
        quantity: null,
        price: null,

        order_id: null,

        response: '',
        loadingCreate: false,
        loadingOrder: false,
        createStatus:'',
        orderStatus:''
    }

    onRequestCreate = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/createorder', {
            pharma_room_id: this.state.pharma_room_id,
            supplier_id: this.state.supplier_id,
            manufacturing_date: this.state.manufacturing_date,
            expired_date: this.state.expired_date,
            quantity: this.state.quantity,
            price: this.state.price,
            pharma_code: this.state.pharma_code,
        })
        .then((response) => {
            this.setState({ loadingCreate: false })
            console.log(response.data.createStatus);
            this.setState({createStatus:response.data.createStatus})
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
            this.setState({ loadingOrder: false })
            console.log(response.data);
            this.setState({orderStatus:response.data.status})
        }, (error) => {
            console.log(error);
        });
    }

    componentDidUpdate() {
        // console.log(this.state)
    }

    handleSubmitCreate = () => {
        this.setState({ loadingCreate: true })
        this.onRequestCreate()
    }

    handleSubmitOrder = () => {
        this.setState({ loadingOrder: true })
        this.onRequestOrder()
    }
    
    render() {
        return (
            <Form>
                <Form.Group >
                    <Form.Control placeholder="Pharma Room ID" onChange={(e) => this.setState({ pharma_room_id: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Supplier ID" onChange={(e) => this.setState({ supplier_id: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Pharma Code" onChange={(e) => this.setState({ pharma_code: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Manufacturing Date" onChange={(e) => this.setState({ manufacturing_date: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Expired Date" onChange={(e) => this.setState({ expired_date: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Quantity" onChange={(e) => this.setState({ quantity: e.target.value })} />
                    {'\u00A0'}
                    <Form.Control placeholder="Price" onChange={(e) => this.setState({ price: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmitCreate}>
                    {this.state.loadingCreate ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="createStatus"
                        aria-hidden="true"
                    />:<div></div>}
                        Submit Order
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.createStatus}
                </Form.Text>
                {'\u00A0'}
                <Form.Group >
                    <Form.Control placeholder="Order ID" onChange={(e) => this.setState({ order_id: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmitOrder}>
                    {this.state.loadingOrder ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Mark as RECEIVED
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.orderStatus}
                </Form.Text>
            </Form>
        );
    }
}

export default OrderPaneContent;