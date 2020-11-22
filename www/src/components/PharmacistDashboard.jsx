import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import { Navbar ,  Nav, Button, Form, FormControl} from 'react-bootstrap'
import ShowTable from './ShowTable'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom'
class PharmacistDashboard extends Component {//Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
state = { toggleActiveUserTable: false, 
    renders:<div></div>, medId:'',
    storageTable:<div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicinesq" payload={{PC:""}}></ShowTable></div>,
    redirect:false,
    redirect2:false
}
constructor(props) {
    super(props);
    

}


componentDidUpdate(){
    // console.log(this.props.username)
    // console.log(this.state.medId)
}


toggleShowActiveUser = () => {
    this.setState({ toggleActiveUserTable: !this.state.toggleActiveUserTable })
}
changeMedicine=(e)=>{
    // console.log(e.target.value)
    this.setState({medId:e.target.value})
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
onKeyDown=(e)=>{
    if (e.keyCode === 13) {
        e.preventDefault()
        this.refreshTable()
    }
}

render() {
    const fillH = { width: '100%', height: '55%' }
    return (
        
        <Router>
            {!this.state.redirect && !this.state.redirect2? (<Redirect push to="/"/>):null}
            {this.state.redirect ? (<Redirect push to="/storage"/>):null}
            {this.state.redirect2? (<Redirect push to="/storage "/>):null}
        <Navbar style={{backgroundColor:"#eeeeee" ,height:40}}>
            {/* <Navbar.Brand as={Link} to='/home'>Menu</Navbar.Brand> */}
            <Nav className="mr-auto">
                {/* <Nav.Link as={Link} to='/dispensation'>View Dispensation</Nav.Link> */}
                <Nav.Link onClick={this.refreshTable} >Search Medicine</Nav.Link>
                <Form inline>
      <FormControl type="text" placeholder="Medicine ID" className="mr-sm-2"  size='sm' onChange={this.changeMedicine} onKeyDown={(e)=> this.onKeyDown(e)}/>
      {/* <Button variant="outline-success" size='sm' onClick={this.refreshTable}>Search</Button> */}
    </Form>
            </Nav>
        </Navbar>
        <Switch>
            <Route exact path="/">
                {/* Welcome {this.props.username} */}
            </Route>
            <Route exact path="/storage ">
                <div></div>
                {this.state.storageTable}
            </Route>
            <Route exact path="/storage">
                {this.state.storageTable}
            </Route>
        </Switch>
    </Router>
    );
}
}

export default withRouter(PharmacistDashboard);