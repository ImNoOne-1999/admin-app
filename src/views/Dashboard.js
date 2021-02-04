import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { NavLink,Redirect } from 'react-router-dom'
import firebase from '../config/fbconfig';
import { connect } from 'react-redux';
import * as admin from 'firebase-admin';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";


class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: []
    };
  };

  deleteUser = (id) => {
    console.log(id);
  //   var app = admin.initializeApp(firebase);
  //   var ad = app.auth()
  // .deleteUser(id)
  // .then(() => {
  //   console.log('Successfully deleted user');
  //   const userRef = firebase.database().ref('Users').child(id);
  //   userRef.remove();
  //   this.props.history.push({ pathname: "/admin/dashboard" });
  //   console.log('Successfully deleted user');
  // })
  // .catch((error) => {
  //   console.log('Error deleting user:', error);
  // });
    // user.delete().then(function() {
    //   // User deleted.
    
    // }).catch(function(error) {
    //   // An error happened.
    // });
    
  }

  componentDidMount() {
    const userRef = firebase.database().ref('Users');
    userRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for(let user in users) {
        newState.push({
          id: user,
          userPackages: users[user].userPackages,
          userDetails: users[user].userDetails,
          userClasses: users[user].userClasses,
        });
      }
      this.setState({
        users: newState
      });
    });
  };
render(){
  const { auth } = this.props;
  if (!auth.uid) return <Redirect to='/login' />
  return (
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">User Table</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter" responsive>
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Phone</th>
                  {/* <th>Role</th> */}
                </tr>
              </thead>
              <tbody>
              {this.state.users.map((user) => {
                return (
                    <tr>
                      <td>{ user.userDetails.fullName }</td>
                      <td>{ user.userDetails.email }</td>
                      <td>{ user.userDetails.dob }</td>
                      <td>{ user.userDetails.phone }</td>
                      {/* <td>{ user.userDetails.userRole }</td> */}
                      <td>
                        <NavLink to={'/admin/edit-user-profile/'+user.id}><Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button></NavLink></td>
                        <td>
                        <Button
                            color="link"
                            type="button"
                            onClick={()=>{if(window.confirm("Sure You Want To Delete This User?"))this.deleteUser(user.id)}}
                          >
                          <i className="tim-icons icon-simple-remove" />
                        </Button></td>
                    </tr>  
                )
              })}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            <NavLink to={'/admin/user-profile'}><Button className="btn-fill" color="primary" type="button">
              Add User
            </Button></NavLink>
          </CardFooter>
        </Card>
      </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Dashboard);