import React, { Component } from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';
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
  

class LoginForm extends Component {
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
      
    }

    if (emailorPwdError) {
      this.setState({ emailorPwdError });
      return false;
    }
    if(this.state.email=="eladtraining@gmail.com" && this.state.password=="eladTraining#0945"){
      return true;
    }
    return false;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
    console.log(this.props);
  };
    render() {
      const { authError,auth } = this.props;
      if (auth.uid) return <Redirect to='/' />
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
                    { authError ? <p>{authError}</p> : null }
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

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)