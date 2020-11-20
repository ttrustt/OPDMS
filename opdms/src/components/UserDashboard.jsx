import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import { Navbar ,  Nav, Button, Form} from 'react-bootstrap'
import ShowTable from './ShowTable'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

class UserDashboard extends Component { //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
    state = { toggleActiveUserTable: false}
    constructor(props) {
        super(props);
        

    }
    componentDidUpdate(){
        // console.log(this.props.username)
        console.log(this.props.username)
    }


    toggleShowActiveUser = () => {
        this.setState({ toggleActiveUserTable: !this.state.toggleActiveUserTable })
    }
    render() {
        const fillH = { width: '100%', height: '55%' }
        return (
            <Router>
                <Navbar style={{backgroundColor:"#eeeeee" ,height:35}}>
                    {/* <Navbar.Brand href="#">Menu</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/dispensation'>View Dispensation</Nav.Link>
                        <Nav.Link as={Link} to='/schedule'>View Schedule</Nav.Link>
                    </Nav>
                </Navbar>

                    {/* <Button onClick={this.toggleShowActiveUser}>{this.state.toggleActiveUserTable ? <div>Hide Active User</div> : <div>Active User</div>}</Button> */}
                    {/* {this.state.toggleActiveUserTable ? <div style={fillH}><ShowTable APIendpoint="showmedicine" payload={{ user_id: 1 }}></ShowTable></div> : <div></div>} */}
                <Switch>
                    <Route exact path="/">
                        Hello
                    </Route>
                    <Route path="/dispensation">
                    <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showuser" payload={{}}></ShowTable></div>
                    </Route>
                    <Route path="/schedule">
                    <div style={{width: '100%', height: '55%'}}><ShowTable APIendpoint="showmedicine" payload={{ username:this.props.username}}></ShowTable></div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default UserDashboard;