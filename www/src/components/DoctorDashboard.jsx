import React, { Component } from 'react';
// import BarChart from './BarChart'
import Header from './Header'
import _ from "lodash";
// import TableComponent from './TableComponent'
// import DataTable from './DataTable'
import { Navbar ,  Nav, Button, Form,FormControl,Row,Col, Container} from 'react-bootstrap'
import ShowTable from './ShowTable'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
class DoctorDashboard extends Component {//Wrap up component for Grid layout and header and all of the 'module' state being stored here from the react component map in docs
state = { toggleActiveUserTable: false, renders:<div></div>,redirect:false,redirect2:false, redirect3:false, redirect4:false, redirect5:false,redirect6:false, patient_id:'',patient_id2:''}
constructor(props) {
    super(props);
    

}
componentDidUpdate(){
    // console.log(this.props.username)
    // console.log(this.state.patient_id)
}


toggleShowActiveUser = () => {
    this.setState({ toggleActiveUserTable: !this.state.toggleActiveUserTable })
}
refreshSchedule=()=>{
    console.log('Refresh')
    if(this.state.redirect){
        this.setState({redirect:false, redirect2:true})
    }else{
        this.setState({redirect:true, redirect2:false})
    }
    // this.setState({redirect:!this.state.redirect})
    // this.setState({redirect2:temp})
    console.log(this.state.redirect,this.state.redirect2)
    // this.setState({redirect:false})
    // this.setState({storageTable:<div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicinesq" payload={{PC:this.state.medId}}></ShowTable></div>})
}
refreshDisease=()=>{
    console.log('Refresh')
    if(this.state.redirect3){
        this.setState({redirect3:false, redirect4:true})
    }else{
        this.setState({redirect3:true, redirect4:false})
    }
    // this.setState({redirect:!this.state.redirect})
    // this.setState({redirect2:temp})
    console.log(this.state.redirect3,this.state.redirect4)
    // this.setState({redirect:false})
    // this.setState({storageTable:<div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicinesq" payload={{PC:this.state.medId}}></ShowTable></div>})
}
refreshLimitation=()=>{
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
    // this.setState({storageTable:<div style={{width: '100%', height: '70%'}}><ShowTable APIendpoint="showmedicinesq" payload={{PC:this.state.medId}}></ShowTable></div>})
}
onKeyLimitationDown=(e)=>{
    if (e.keyCode === 13) {
        e.preventDefault()
        this.refreshLimitation()
    }
}
onKeyDiseaseDown=(e)=>{
    if (e.keyCode === 13) {
        e.preventDefault()
        this.refreshDisease()
    }
}
render() {
    const fillH = { width: '100%', height: '55%' }
    const styles = {
        grid: {
            paddingLeft: 0,
            paddingRight: 0
        },
        row: {
            marginLeft: 0,
            marginRight: 0
        },
        col: {
            paddingLeft: 0,
            paddingRight: 0
        }
    };
    return (
        <Router>
            {!this.state.redirect && !this.state.redirect2? (<Redirect push to="/"/>):null}
            {this.state.redirect ? (<Redirect push to="/schedule"/>):null}
            {this.state.redirect2? (<Redirect push to="/schedule "/>):null}

            {this.state.redirect3? (<Redirect push to="/underlyingdisease"/>):null}
            {this.state.redirect4? (<Redirect push to="/underlyingdisease "/>):null}

            {this.state.redirect5? (<Redirect push to="/limitation"/>):null}
            {this.state.redirect6? (<Redirect push to="/limitation "/>):null}
        <Navbar style={{backgroundColor:"#eeeeee" ,height:40}} className="justify-content-between">
            {/* <Navbar.Brand as={Link} to=''>Menu</Navbar.Brand> */}
            <Nav >
                {/* <Nav.Link as={Link} to='/dispensation'>View Dispensation</Nav.Link> */}
                <Nav.Link onClick={this.refreshSchedule}>View Schedule</Nav.Link>
                <br />
        
                <Form inline>
                <Nav.Link onClick={this.refreshDisease}>Search Underlying Disease and Limitation: </Nav.Link>
                <FormControl type="text" placeholder="Patient ID" className="mr-sm-2"  size='sm' onChange={(e)=>{this.setState({patient_id:e.target.value})}} onKeyDown={(e)=> this.onKeyDiseaseDown(e)}/>
                {/* <Nav.Link onClick={this.refreshLimitation}>Search Limitation: </Nav.Link> */}
                {/* <FormControl type="text" placeholder="Patient ID" className="mr-sm-2"  size='sm' onChange={(e)=>{this.setState({patient_id2:e.target.value})}} onKeyDown={(e)=> this.onKeyLimitationDown(e)}/> */}
                </Form>
                

            </Nav>
            <Nav >

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
                <div></div>
            <div style={{width: '100%', height: '88%'}}><ShowTable APIendpoint="showschedulefordoctor" payload={{ username:this.props.username}}></ShowTable></div>
            <div></div>
            <div></div>
            </Route>
            <Route exact path="/schedule ">
            <div></div>
            <div></div>
            <div></div>
            <div style={{width: '100%', height: '88%'}}><ShowTable APIendpoint="showschedulefordoctor" payload={{ username:this.props.username}}></ShowTable></div>
            </Route>

            <Route exact path="/underlyingdisease">
                <Container fluid>
                <Row>
                {/* <div>underlyingdisesae and limitation</div> */}
                <Col lg={true} style={styles.col}>
                <ShowTable APIendpoint="findlimitation" payload={{  patient_id:this.state.patient_id}}width='1'></ShowTable>
                </Col>
                <Col lg={true} style={styles.col}>
                <div style={{height:'88vh'}}>
                <ShowTable APIendpoint="findunderlyingdisease" payload={{ patient_id:this.state.patient_id}} width='1'></ShowTable>
                </div>
                
                </Col>
                </Row>
                </Container>
            </Route>
            <Route exact path="/underlyingdisease ">
            <Container fluid>
                <Row>
                    <Col lg={true} style={styles.col}>
                <div></div>
                <div></div>
               <ShowTable APIendpoint="findlimitation" payload={{  patient_id:this.state.patient_id}}width='1'></ShowTable>
                <div></div>
                </Col>
                <Col lg={true} style={styles.col}>
                <div style={{height:'88vh'}}>
                    <div></div>
                    <ShowTable APIendpoint="findunderlyingdisease" payload={{ patient_id:this.state.patient_id}} width='1'></ShowTable>
                </div>
                <div></div>
                </Col>
                </Row>
                </Container>
                {/* <div>underlylingdisease2 and limitation</div> */}
                
            </Route>
            <Route exact path="/limitation">
                <div>limitation</div>
            </Route>
            
            <Route exact path="/limitation ">
                <div></div>
                <div>limitation2</div>
            </Route>
        </Switch>
    </Router>
    );
}
}

export default DoctorDashboard;