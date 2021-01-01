import React,{useState} from 'react';
import firebase from '../config/fbconfig';
import {useHistory} from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

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



function UserProfileForm(props) {

    const history = useHistory();

      const [values,setValues] = useState({
          age: '',
          email: '',
          fullName: '',
          imageUrl: '',
          phone: '',
          userRole: ''
      });
      const [values1,setValues1] = useState({
        endDate: '',
        active: true,
        packageId: '',
        sessions: '',
        startDate: '',
        punishment: false
    });
    const handleInputChange = (e) =>{
        setValues({
          ...values,
          [e.target.id]: e.target.value
        });
        //console.log(this.state.users[0].user.userPackage);
      }
      const handleInputChangePackage = (e) =>{
        setValues1({
          ...values1,
          [e.target.name]: e.target.value
        });
        //console.log(this.state.users[0].user.userPackage);
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        const userRef = firebase.database().ref('Users');
        //const id = props.id;
        userRef.push({ userDetails: values, userPackages: values1 });
          emailjs.send("service_gmail","template_de0eyym",{
            from: "eladtraining@gmail.com",
            email: values.email,
            fullName: values.fullName,
            },"user_xR6TgA2JVu5Vz4Gbu36nl");
        history.push({ pathname: "/" });
      }

      
      const { auth } = props;
      if (!auth.uid) return <Redirect to='/login' />
    return (
        <div className="content">
            <Card>
              <CardHeader>
                <h5 className="title">Create Profile</h5>
              </CardHeader>
              <form onSubmit={handleSubmit}>
              <CardBody>
               
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          //value={ props.user.userDetails.fullName }
                          placeholder="Full Name"
                          type="text"
                          id="fullName"
                          //onChange={(e)=>this.setState({userDetails: { fullName: e.target.value}})}
                          onChange={handleInputChange}
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
                        <Input 
                        //value={ props.user.userDetails.email } 
                        type="email" id="email" placeholder="Email"
                        onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          //value={ props.user.userDetails.phone }
                          //disabled
                          id="phone"
                          onChange={handleInputChange}
                          placeholder="Phone"
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
                          //value={ props.user.userDetails.age }
                          id="age"
                          onChange={handleInputChange}
                          placeholder="Age"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Role</label>
                        <Input
                          //value={ props.user.userDetails.userRole }
                          placeholder="Role"
                          id="userRole"
                          onChange={handleInputChange}
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
                          //value={ props.user.userClasses }
                          placeholder="Classes opted"
                          name="classes"
                          onChange={handleInputChangePackage}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardHeader>
                  <h5 className="title">Class Packages</h5>
                  </CardHeader>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Start Date</label>
                      <Input
                        //defaultValue={ props.user.userPackages.startDate && props.user.userPackages.startDate ? props.user.userPackages.startDate : " "}
                        type="date"
                        name="startDate"
                          onChange={handleInputChangePackage}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        type="date"
                        name="endDate"
                        onChange={handleInputChangePackage}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Package Id</label>
                      <Input
                        placeholder="Package Id"
                        type="text"
                        name="packageId"
                        onChange={handleInputChangePackage}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Sessions</label>
                      <Input
                        placeholder="Sessions Required"
                        type="text"
                        name="sessions"
                        onChange={handleInputChangePackage}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  </CardBody>
                
              
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
              </form>
            </Card>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(UserProfileForm);