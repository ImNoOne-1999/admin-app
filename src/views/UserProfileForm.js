import React,{useState} from 'react';
import firebase from '../config/fbconfig';
import {useHistory} from 'react-router-dom';
import emailjs from 'emailjs-com';
// import{ init } from 'emailjs-com';
// init("user_xR6TgA2JVu5Vz4Gbu36nl");

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
//import { TRUE } from 'node-sass';


function UserProfileForm(props) {

    const history = useHistory();

    // const [values,setValues] = useState({
    //     userClass: '',
    //     userDetails: {
    //       age: '',
    //       email: '',
    //       fullName: '',
    //       imageUrl: '',
    //       phone: '',
    //       userRole: ''
    //     },
    //     userPackage: {
    //       endDate: '',
    //       isActive: '',
    //       packageId: '',
    //       sessions: '',
    //       startDate: ''
    //     }
    //   });

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
        //console.log(values);
        // emailjs.sendForm('service_gmail', 'template_de0eyym', e.target, 'user_xR6TgA2JVu5Vz4Gbu36nl')
        //   .then((result) => {
        //       console.log(result.text);
        //   }, (error) => {
        //       console.log(error.text);
        //   });
          emailjs.send("service_gmail","template_de0eyym",{
            from: "eladtraining@gmail.com",
            email: values.email,
            fullName: values.fullName,
            },"user_xR6TgA2JVu5Vz4Gbu36nl");
        history.push({ pathname: "/" });
      }

      

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
                        type="email" id="email"
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
                        //defaultValue={ props.user.userPackages.endDate && props.user.userPackages.endDate ? props.user.userPackages.endDate : " "}
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
                        //value={ props.user.userPackages.packageId && props.user.userPackages.packageId ? props.user.userPackages.packageId : "Package Id"}
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
                        //value={ props.user.userPackages.sessions && props.user.userPackages.sessions ? props.user.userPackages.sessions : "Sessions Required"}
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

export default UserProfileForm