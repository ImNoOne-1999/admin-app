import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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

  const initialState = {
    email: "",
    password: "",
    emailorPwdError: ""
  };
  

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  handleChange = e => {

    this.setState({
      [e.target.id]: e.target.value 
    });
  };

  validate = () => {
    let emailorPwdError = "";

    if (!this.state.email.includes("@")) {
      emailorPwdError = "invalid email";
    }

    if(!(this.state.email=="eladtraining@gmail.com" && this.state.password=="eladTraining#0945")){
      emailorPwdError = "Invalid email or password";
      console.log("here");
    }

    if (emailorPwdError) {
      this.setState({ emailorPwdError });
      return false;
    }
    if(this.state.email=="eladtraining@gmail.com" && this.state.password=="eladTraining#0945"){
      console.log("pass");
      return true;
    }
    return false;
  };

  handleSubmit = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState(initialState);
      this.props.history.push('/');
    }
  };
    render() {
        return (
          <div className="content" style={{marginLeft: '35%'}}>
            <h1 style={{marginLeft: '8%'}}>ADMIN LOGIN</h1>
            <Card style={{ width: '22rem' }}>
              <CardHeader>
                <h5 className="title">Login</h5>
              </CardHeader>
              <form 
              onSubmit={this.handleSubmit}
              >
              <CardBody>
               
                  <Row>
                    <Col className="pr-md-1" md="11">
                        <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                                Email address
                            </label>
                            <Input 
                            //value={ props.user.userDetails.email } 
                            type="email" id="email" placeholder="Email"
                            onChange={this.handleChange} 
                            />
                        </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="11">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          //value={ props.user.userDetails.phone }
                          //disabled
                          id="password"
                          onChange={this.handleChange}
                          placeholder="Password"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <div className="red-text center">
                           Incorrect Email or Password 
                  </div> */}
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailorPwdError}
                  </div>
                  </CardBody>
                  
              <CardFooter>
                {/* <NavLink to={'/admin/dashboard'}> */}
                <Button className="btn-fill" color="primary" type="submit">
                  Login
                </Button>
                {/* </NavLink> */}
              </CardFooter>
              </form>
            </Card>
      </div>
        )
    }
}
