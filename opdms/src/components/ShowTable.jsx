import React, { Component } from 'react';
import DataTable from './DataTable'
import axios from 'axios'
import ReactSpinner from 'react-bootstrap-spinner'
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
                {this.state.loading?<div style={{alignItems:"center" ,alignSelf:"center", alignContent:"center", marginLeft:100 , marginRight:100, marginTop:100}}><ReactSpinner type="border" color="primary" size="5"/></div>:<div></div>}
            {this.state.table}
            </React.Fragment>
        );
    }
}

export default ShowTable;