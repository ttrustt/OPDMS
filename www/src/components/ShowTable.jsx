import React, { Component ,useState, render} from 'react';
import DataTable from './DataTable'
import axios from 'axios'
import ReactSpinner from 'react-bootstrap-spinner'
import {Alert,Button} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
class ShowTable extends Component {
    state = { data:[], columns:[] ,table:<div></div>,loading:false,failed_indicator:false}

    componentDidMount(){
        this.setState({loading:true})
        console.log('API request to '+'http://127.0.0.1:5000/'+this.props.APIendpoint, this.props.payload)
        axios.post('http://127.0.0.1:5000/'+this.props.APIendpoint, this.props.payload)
        .then((response) => {
            console.log(response)
            if(response.data.success){
            this.setState({status:response.data.status, data:response.data.data, columns:response.data.columns,loading:false,failed_indicator:false})
            this.setState({table:<DataTable data={this.state.data} columns={this.state.columns} width={this.props.width}></DataTable>})
            }else{
                this.setState({loading:false,table:null,failed_indicator:true})
            }
        }, (error) => {
            console.log(error);
            this.setState({loading:false,table:null,failed_indicator:true})
        });
    }
    render() {
        // function AlertDismissibleExample() {
        //     const [show, setShow] = useState(this.props.failed_indicator);
        //     // const [failed_indicator,setFailed] = useState(this.prop.)
        //     if (show) {
        //       return (
        //         <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        //           <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        //           <p>
        //             Change this and that and try again. Duis mollis, est non commodo
        //             luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
        //             Cras mattis consectetur purus sit amet fermentum.
        //           </p>
        //         </Alert>
        //       );
        //     }
        //     return <Button onClick={() => setShow(true)}>Show Alert</Button>;
        //   }
        return (
            <React.Fragment>


                {/* <Row> */}
                {this.state.loading?<div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                // color:'#000'
                 }}
            ><ReactSpinner type="grow" color="primary" size="7.5" /></div>:<div></div>}
                {/* </Row> */}
            {this.state.table}
            {this.state.failed_indicator?<div style={{padding:10}}> <Alert variant="danger" onClose={() => this.setState({failed_indicator:false})} dismissible>
                  <Alert.Heading>Database failed!</Alert.Heading>
                  <p>
                     MySQL failed: Chaichana Thavornthaveekul's lack of responsibility
                      <br></br>
                      MongoDB failed: Saranthorn Juramongkol's lack of responsibility 

                      {/* Supervise failed: ปิยะวัด อำนวย กระจอก */}
                  </p>
                </Alert></div>:null}
            </React.Fragment>
        );
    }
}

export default ShowTable;