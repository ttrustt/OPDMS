import React, { Component } from 'react';
import DataTable from './DataTable'
import axios from 'axios'
class ShowMedicineTable extends Component {
    state = { data:[], columns:[] ,table:<div></div>}

    componentDidMount(){
        axios.post('http://127.0.0.1:5000/showmedicine', {
            user_id: this.props.user_id,
        })
        .then((response) => {
            // console.log(response.data.data, response.data.columns);
            this.setState({status:response.data.status, data:response.data.data, columns:response.data.columns})
            // console.log(this.state.data,this.state.columns)
        }, (error) => {
            console.log(error);
        });
    }
    render() {
        
        return (
            <React.Fragment>
            {/* {this.state.table} */}
            <DataTable data={this.state.data} columns={this.state.columns}></DataTable>
            </React.Fragment>
        );
    }
}

export default ShowMedicineTable;