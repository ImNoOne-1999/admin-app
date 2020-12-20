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
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class UserProfile extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      users: [{
        userClass: null,
        user: {
          age: null,
          email: null,
          fullName: null,
          imageUrl: null,
          phone: null,
          userRole: null
        },
        userPackage: {
          endDate: null,
          isActive: true,
          packageId: null,
          sessions: null,
          startDate: null
        }
      }]
    };
  };

  handleChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(this.state.users[0].user);
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const userRef = firebase.database().ref('Users');
    const id = this.props.match.params.id;
    userRef.child(id).child('userDetails').update({fullName: this.state.users[0].user.fullName });
    console.log(this.state.users[0]);
    this.props.history.push('/');
  }

  componentDidMount() {
    const userRef = firebase.database().ref('Users');
    userRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      const id = this.props.match.params.id;
      newState.push({
        id: id,
        userPackage: users[id].userPackages,
        user: users[id].userDetails,
        userClass: users[id].userClasses,
      });
      this.setState({
        users: newState
      });
    });
  };
  render(){
  return (
    <>
      <div className="content">
      {this.state.users.map((user) => {
        return (
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <form onSubmit={this.handleSubmit}>
              <CardBody>
               
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          defaultValue={ user.user.fullName }
                          placeholder="Full Name"
                          type="text"
                          id="fullName"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder={ user.user.email } type="email" id="email"
                          onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Phone (disabled)</label>
                        <Input
                          defaultValue={ user.user.phone }
                          disabled
                          placeholder="phone"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Age</label>
                        <Input
                          defaultValue={ user.user.age }
                          id="age"
                          onChange={this.handleChange}
                          placeholder="Age"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Role</label>
                        <Input
                          defaultValue={ user.user.userRole }
                          placeholder="Role"
                          id="role"
                          onChange={this.handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>Classes</label>
                        <Input
                          defaultValue={ user.userClass }
                          placeholder="Classes opted"
                          id="classes"
                          onChange={this.handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {}
                  <CardHeader>
                  <h5 className="title">Class Packages</h5>
                  </CardHeader>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Start Date</label>
                      <Input
                        defaultValue={ user.userPackage.startDate && user.userPackage.startDate ? user.userPackage.startDate : " "}
                        type="date"
                        id="startDate"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        defaultValue={ user.userPackage.endDate && user.userPackage.endDate ? user.userPackage.endDate : " "}
                        type="date"
                        id="endDate"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Package Id</label>
                      <Input
                        defaultValue={ user.userPackage.packageId && user.userPackage.packageId ? user.userPackage.packageId : "Package Id"}
                        type="text"
                        id="packageId"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Sessions</label>
                      <Input
                        defaultValue={ user.userPackage.sessions && user.userPackage.sessions ? user.userPackage.sessions : "Sessions Req"}
                        type="text"
                        id="sessions"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  </CardBody>
                
              
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={this.handleClick}>
                  Save
                </Button>
              </CardFooter>
              </form>
            </Card>
          </Col>
          <Col md="4">
            {/* <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg").default}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card> */}
          </Col>
        </Row>
        )
      })}
      </div>
    </>
  );
}
}

export default UserProfile;