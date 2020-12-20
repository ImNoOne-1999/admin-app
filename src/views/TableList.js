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
import React from "react";
import firebase from '../config/fbconfig';

// reactstrap components
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

class Tables extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {
      classes: [{
        classDetails: {
          coach: null,
          description: null,
          capacity: null,
          timing: null,
          date: null,
          name: null
        }
      }]
    };
  };

  handleChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    })
    
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const userRef = firebase.database().ref('Classes');
    const id = this.props.match.params.id;
    //userRef.child(id).child('userDetails').update({fullName: this.state.users[0].user.fullName });
    //console.log(this.state.users[0]);
    this.props.history.push('/');
  }
  render(){
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
          <Card>
              <CardHeader>
                <h5 className="title">Create Class</h5>
              </CardHeader>
              <Form>
              <CardBody>
               
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Class Name</label>
                        <Input
                          defaultValue=""
                          placeholder="Full Name"
                          type="text"
                          id="classNameId"
                          onChange={this.handleChange} 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Coach Name
                        </label>
                        <Input placeholder="" type="text" id="coach"
                           />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Capacity</label>
                        <Input
                          defaultValue=""
                          
                          placeholder="capacity"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          defaultValue=""
                          id="name"
                          
                          placeholder="Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Timings</label>
                        <Input
                          defaultValue=""
                          placeholder="timings"
                          id="timing"
                          
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Date</label>
                      <Input
                        defaultValue=""
                        type="date"
                        id="startDate"
                          
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        defaultValue=""
                        type="textarea"
                        id="description"
                         
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  </CardBody>
                
              
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" >
                  Create
                </Button>
              </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
  }
}

export default Tables;
