import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import { Navbar ,  Nav, Button, Form,FormControl} from 'react-bootstrap'
import ShowTable from './ShowTable'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

class PatientDashboard extends Component { //Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
    state = { toggleActiveUserTable: false, renders:<div></div> ,redirect:false ,redirect2:false, redirect3:false, redirect4:false, redirect5:false ,redirect6:false,doctor_id:''}
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

    refreshDispensation=()=>{
        console.log('Refresh')
        if(this.state.redirect){
            this.setState({redirect:false, redirect2:true})
        }else{
            this.setState({redirect:true, redirect2:false})
        }
        // this.setState({redirect:!this.state.redirect})
        // this.setState({redirect2:temp})
        console.log(this.state.redirect,this.state.redirect2)
    }
    refreshSchedule=()=>{
        console.log('Refresh')
    if(this.state.redirect3){
        this.setState({redirect3:false, redirect4:true})
    }else{
        this.setState({redirect3:true, redirect4:false})
    }
    // this.setState({redirect:!this.state.redirect})
    // this.setState({redirect2:temp})
    console.log(this.state.redirect3,this.state.redirect4)
        
        
    }
    refreshExpertise=()=>{
        console.log('Refresh')
        if(this.state.redirect5){
            this.setState({redirect5:false, redirect6:true})
        }else{
            this.setState({redirect5:true, redirect6:false})
        }
        // this.setState({redirect:!this.state.redirect})
        // this.setState({redirect2:temp})
        console.log(this.state.redirect5,this.state.redirect6)
        // this.setState({redirect:false})

    }
    onKeyDown=(e)=>{
        if (e.keyCode === 13) {
            e.preventDefault()
            this.refreshExpertise()
        }
    }
    render() {
        const fillH = { width: '100%', height: '55%' }
        return (
            <Router>
            {!this.state.redirect && !this.state.redirect2? (<Redirect push to="/"/>):null}
            {this.state.redirect ? (<Redirect push to="/dispensation"/>):null}
            {this.state.redirect2? (<Redirect push to="/dispensation "/>):null}

            {this.state.redirect3? (<Redirect push to="/schedule"/>):null}
            {this.state.redirect4? (<Redirect push to="/schedule "/>):null}

            {this.state.redirect5? (<Redirect push to="/expertise"/>):null}
            {this.state.redirect6? (<Redirect push to="/expertise "/>):null}

            <Navbar style={{backgroundColor:"#eeeeee" ,height:40}}>
                {/* <Navbar.Brand as={Link} to=''>Menu</Navbar.Brand> */}
                <Nav >
                    <Nav.Link onClick={this.refreshDispensation}>View Dispensation</Nav.Link>
                    <Nav.Link onClick={this.refreshSchedule}>View Schedule</Nav.Link>
                    <Nav.Link onClick={this.refreshExpertise}>Search Doctor Expertise: </Nav.Link>
                    <Form inline>
                    <FormControl type="text" placeholder="Doctor ID" className="mr-sm-2"  size='sm' onChange={(e)=>{this.setState({doctor_id:e.target.value})}} onKeyDown={(e)=> this.onKeyDown(e)}/>
                    </Form>
                </Nav>
            </Navbar>

                {/* <Button onClick={this.toggleShowActiveUser}>{this.state.toggleActiveUserTable ? <div>Hide Active User</div> : <div>Active User</div>}</Button> */}
                {/* {this.state.toggleActiveUserTable ? <div style={fillH}><ShowTable APIendpoint="showmedicine" payload={{ user_id: 1 }}></ShowTable></div> : <div></div>} */}
            <Switch>
                <Route exact path="/">
                    {/* Hello */}
                </Route>
                <Route exact path="/dispensation">
                <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicine" payload={{username:this.props.username}}></ShowTable></div>
                </Route>
                <Route exact path="/dispensation ">
                <div></div>
                <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicine" payload={{username:this.props.username}}></ShowTable></div>
                </Route>
                <Route exact path="/schedule">
                <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showschedule" payload={{ username:this.props.username}}></ShowTable></div>
                </Route>
                <Route exact path="/schedule ">
                    <div></div>
                <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showschedule" payload={{ username:this.props.username}}></ShowTable></div>
                </Route>
                <Route exact path="/expertise">
                    <div></div>
                    <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="findexpertise" payload={{ doctor_id:this.state.doctor_id}}></ShowTable></div>
                </Route>
                <Route exact path="/expertise ">
                <div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="findexpertise" payload={{ doctor_id:this.state.doctor_id}}></ShowTable></div>
                </Route>
            </Switch>
        </Router>
        );
    }
}

export default PatientDashboard;