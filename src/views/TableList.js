import React, {useState} from "react";
import firebase from '../config/fbconfig';
import ClassesForm from './ClassesForm';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
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
    classesRef.child(obj.id).set(obj);
  }
  
render(){
  const { auth } = this.props;
  if (!auth.uid) return <Redirect to='/login' />
  return (
    <>
    <ClassesForm callForm={this.callForm} />
    </>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Tables);
