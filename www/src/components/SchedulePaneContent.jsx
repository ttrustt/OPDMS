import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

class SchedulePaneContent extends Component {
    state = {
        schedule_number: '',

        response: '',
        loading: false,
        status:''
    }

    onRequest = () => {
        console.log(this.state)
        axios.post('http://127.0.0.1:5000/deleteschedule', {
            schedule_number: this.state.schedule_number
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
                    <Form.Control placeholder="Schedule Number" onChange={(e) => this.setState({ schedule_number: e.target.value })} />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                    {this.state.loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />:<div></div>}
                        Delete Schedule
                </Button>
                <Form.Text id="passwordHelpBlock" muted>
                {this.state.status}
                </Form.Text>
            </Form>
        );
    }
}

export default SchedulePaneContent;