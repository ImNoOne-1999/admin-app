/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import firebase from '../config/fbconfig';
import ClassesForm from './ClassesForm';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  FormGroup,
  Input,
  CardFooter,
  Button,
  Row,
  Form,
  Col,
} from "reactstrap";



class Tables extends React.Component {

  state = {
    classes: []
  }

  callForm = (obj) => {
    const classesRef = firebase.database().ref('Classes');
    classesRef.push(obj);
  }
  //const {values,setValues} 
  //{values, setValues} = useState(this.state);

  // handleInputChange = (e) =>{
  //   {values, setValues} = useState(this.state);
  //   var [name , value] = e.target
  //   setValues({
  //       ...values,
  //       [name]: value
  //   })
    
  // }

  // handleSubmit = (e) =>{
  //   e.preventDefault();
  //   //props.callForm(values);
  //   //const classesRef = firebase.database().ref('Classes');
  //   //console.log(this.state);
  //   //const id = this.props.match.params.id;
  //   //userRef.child(id).child('userDetails').update({fullName: this.state.users[0].user.fullName });
  //   //console.log(this.state.users[0]);
  //   this.props.history.push('/');
  // }

  
  
  
render(){
  return (
    <>
    <ClassesForm callForm={this.callForm} />
    </>
  );
  }
}

export default Tables;
