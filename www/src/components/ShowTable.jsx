import React, { Component } from 'react';
import DataTable from './DataTable'
import axios from 'axios'
import ReactSpinner from 'react-bootstrap-spinner'
import {Row} from 'react-bootstrap'
class ShowTable extends Component {
    state = { data:[], columns:[] ,table:<div></div>,loading:false}

    componentDidMount(){
        this.setState({loading:true})
        axios.post('http://127.0.0.1:5000/'+this.props.APIendpoint, this.props.payload)
        .then((response) => {
            console.log(response)
            this.setState({status:response.data.status, data:response.data.data, columns:response.data.columns,loading:false})
            this.setState({table:<DataTable data={this.state.data} columns={this.state.columns}></DataTable>})
        }, (error) => {
            console.log(error);
        });
    }
    render() {
        
        return (
            <React.Fragment>
                {/* <Row> */}
                {this.state.loading?<div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                // color:'#000'
                 }}
            ><ReactSpinner type="grow" color="primary" size="8" /></div>:<div></div>}
                {/* </Row> */}
            {this.state.table}
            </React.Fragment>
        );
    }
}

export default ShowTable;