import React, { Component } from 'react';
import { Navbar ,  Nav, Button} from 'react-bootstrap'
import axios from 'axios'
class registerMenu extends Component {
    state = {
        fname:'',
        lname:'',
        religion:'',
        address:'',
        province:'',
        postal_code:'',
        identification_number:'',
        passport_number:'',
        mobile_number:'',
        nationality:'',
        sex:'',
        birthdate:'',
        email:'',
        username:'',
        password:'',
        user_type:''
    }

    onRequest = () => {
        axios.post('http://127.0.0.1:5000/datasets/', {
            fname:this.state.fname,
            lname:this.state.lname,
            religion:this.state.religion,
            address:this.state.adress,
            province:this.state.province,
            postal_code:this.state.postal_code,
            identification_number:this.state.identification_number,
            passport_number:this.state.passport_number,
            mobile_number:this.state.mobile_number,
            nationality:this.state.nationality,
            sex:this.state.sex,
            birthdate:this.state.birthdate,
            email:this.state.email,
            username:this.state.username,
            password:this.state.password,
            user_type:this.state.user_type
        })
          .then((response) => {
            console.log(response.data.cols, 'onRequest');
            this.setState({ cols: response.data.cols })
            if(this.state.cols===null)this.setState({cols:[]})
          }, (error) => {
            console.log(error);
          });
      }

    render() {
        return (
            
        );
    }
}

export default registerMenu;