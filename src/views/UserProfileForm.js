import React,{useState} from 'react';
import firebase from '../config/fbconfig';
import {useHistory} from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as admin from 'firebase-admin';
import {v1 as uuid} from 'uuid';

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
    var password = "";
      const [values,setValues] = useState({
          dob: '',
          email: '',
          fullName: '',
          imageUrl: '',
          phone: '',
      });
      const [values1,setValues1] = useState({
        endDate: '',
        active: true,
        packageId: '',
        sessions: '',
        startDate: '',
        punishment: false,
        punishmentTimeStamp: 0,
    });
    const handleInputChange = (e) =>{
        setValues({
          ...values,
          [e.target.id]: e.target.value
        });
      }
      const handleChangeDate = (e) =>{
        setValues1({
          ...values1,
          [e.target.id]: new Date(e.target.value).valueOf()/1000
        });
        console.log(values1);
      }
      const handleInputChangePackage = (e) =>{
        setValues1({
          ...values1,
          [e.target.name]: e.target.value
        });
      }
      var userid = "";
      const createAccount = () => {

          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < 7; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          
          password = result;
          console.log(password);

        firebase.auth().createUserWithEmailAndPassword(values.email, password)
        .then((user) => {
          // Signed in 
          // ...
          const userRef = firebase.database().ref('Users');
        //const id = props.id; { userDetails: values, userPackages: values1 }
        console.log(firebase.auth().currentUser.uid);
        userRef.child(firebase.auth().currentUser.uid).set({ userDetails: values, userPackages: values1 });
        
        console.log("here");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          console.log(errorMessage);
        });
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        
        //userRef.createUser({ userDetails: values, userPackages: values1 })
        createAccount();
        
        
          emailjs.send("service_gmail","template_de0eyym",{
            from: "eladtraining@gmail.com",
            email: values.email,
            fullName: values.fullName,
            password: password
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
                          required
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
                        required
                        onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          //value={ props.user.userDetails.phone }
                          //disabled
                          required
                          id="phone"
                          onChange={handleInputChange}
                          placeholder="Phone"
                          type="tel"
                          pattern="[0-9]{10}"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Date of Birth</label>
                        <Input
                          //value={ props.user.userDetails.age }
                          id="dob"
                          onChange={handleInputChange}
                          placeholder="DOB"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      {/* <FormGroup>
                        <label>Role</label>
                        <Input
                          //value={ props.user.userDetails.userRole }
                          placeholder="Role"
                          id="userRole"
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup> */}
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
                        id="startDate"
                        onChange={handleChangeDate}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        type="date"
                        id="endDate"
                        onChange={handleChangeDate}
                        required
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Package Name</label>
                      <Input
                        placeholder="Package Name"
                        type="text"
                        name="packageId"
                        onChange={handleInputChangePackage}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Sessions</label>
                      <Input
                        placeholder="Sessions Required"
                        type="number"
                        name="sessions"
                        onChange={handleInputChangePackage}
                        required
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