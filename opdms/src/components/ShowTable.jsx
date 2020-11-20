import React, { Component } from 'react';
import DataTable from './DataTable'
import axios from 'axios'
class ShowTable extends Component {
    state = { data:[], columns:[] ,table:<div></div>}

    componentDidMount(){
        axios.post('http://127.0.0.1:5000/'+this.props.APIendpoint, this.props.payload)
        .then((response) => {
            console.log(response)
            this.setState({status:response.data.status, data:response.data.data, columns:response.data.columns})
            this.setState({table:<DataTable data={this.state.data} columns={this.state.columns}></DataTable>})
        }, (error) => {
            console.log(error);
        });
    }
    render() {
        
        return (
            <React.Fragment>
            {this.state.table}
            </React.Fragment>
        );
    }
}

export default ShowTable;