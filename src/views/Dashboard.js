import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { NavLink } from 'react-router-dom'
import firebase from '../config/fbconfig';

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
  // const [bigChartData, setbigChartData] = React.useState("data1");
  // const setBgChartData = (name) => {
  //   setbigChartData(name);
  // };

  constructor(props){
    super(props);
    this.state = {
      users: []
    };
  };

  componentDidMount() {
    const userRef = firebase.database().ref('Users');
    userRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for(let user in users) {
        newState.push({
          // id: user,
          // user: users[user].userDetails,
          // userClass: users[user].userClasses,
          // userPackage: users[user].userPackages
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
  return (
    <>
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
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Classes</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
              {this.state.users.map((user) => {
                return (
                    <tr>
                      <td>{ user.userDetails.fullName }</td>
                      <td>{ user.userDetails.email }</td>
                      <td>{ user.userDetails.age }</td>
                      <td>{ user.userDetails.phone }</td>
                      <td>{ user.userClasses }</td>
                      <td>{ user.userDetails.userRole }</td>
                      <td>
                        <NavLink to={'/admin/edit-user-profile/'+user.id}><Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button></NavLink></td>
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
    </>
  );
}
}
export default Dashboard;