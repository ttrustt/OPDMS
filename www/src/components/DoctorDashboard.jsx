import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import { Navbar ,  Nav, Button, Form} from 'react-bootstrap'
import ShowTable from './ShowTable'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
class DoctorDashboard extends Component {//Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
state = { toggleActiveUserTable: false, renders:<div></div>,redirect:false,redirect2:false}
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
refreshTable=()=>{
    console.log('Refresh',this.state.medId)
    if(this.state.redirect){
        this.setState({redirect:false, redirect2:true})
    }else{
        this.setState({redirect:true, redirect2:false})
    }
    // this.setState({redirect:!this.state.redirect})
    // this.setState({redirect2:temp})
    console.log(this.state.redirect,this.state.redirect2)
    // this.setState({redirect:false})
    this.setState({storageTable:<div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicinesq" payload={{PC:this.state.medId}}></ShowTable></div>})

}
render() {
    const fillH = { width: '100%', height: '55%' }
    return (
        <Router>
            {!this.state.redirect && !this.state.redirect2? (<Redirect push to="/"/>):null}
            {this.state.redirect ? (<Redirect push to="/schedule"/>):null}
            {this.state.redirect2? (<Redirect push to="/schedule "/>):null}
        <Navbar style={{backgroundColor:"#eeeeee" ,height:40}}>
            {/* <Navbar.Brand as={Link} to=''>Menu</Navbar.Brand> */}
            <Nav className="mr-auto">
                {/* <Nav.Link as={Link} to='/dispensation'>View Dispensation</Nav.Link> */}
                <Nav.Link onClick={this.refreshTable}>View Schedule</Nav.Link>
                <Form inline>
                {/* <Button variant="outline-success" size='sm' as={Link} to='/schedule' >View</Button> */}
                </Form>
            </Nav>
        </Navbar>

            {/* <Button onClick={this.toggleShowActiveUser}>{this.state.toggleActiveUserTable ? <div>Hide Active User</div> : <div>Active User</div>}</Button> */}
            {/* {this.state.toggleActiveUserTable ? <div style={fillH}><ShowTable APIendpoint="showmedicine" payload={{ user_id: 1 }}></ShowTable></div> : <div></div>} */}
        <Switch>
            <Route exact path="/">
                {/* Welcome {this.props.username} */}
            </Route>
            {/* <Route exact path="/dispensation">
            <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicine" payload={{username:this.props.username}}></ShowTable></div>
            </Route> */}
            <Route exact path="/schedule">
                <div></div>
            <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showschedulefordoctor" payload={{ username:this.props.username}}></ShowTable></div>
            </Route>
        </Switch>
    </Router>
    );
}
}

export default DoctorDashboard;