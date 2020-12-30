import React,{useState} from 'react';
import firebase from '../config/fbconfig';
import {useHistory} from 'react-router-dom';

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


function Temp(props) {

    const history = useHistory();

    const [values,setValues] = useState({
          age: props.user.userDetails.age,
          email: props.user.userDetails.email,
          fullName: props.user.userDetails.fullName,
          imageUrl: props.user.userDetails.imageUrl,
          phone: props.user.userDetails.phone,
          userRole: props.user.userDetails.userRole
      });

      const [values1,setValues1] = useState({
          endDate: props.user.userPackages.endDate,
          active: props.user.userPackages.active,
          packageId: props.user.userPackages.packageId,
          sessions: props.user.userPackages.sessions,
          startDate: props.user.userPackages.startDate
      });
    const handleInputChange = (e) =>{
        setValues({
          ...values,
          [e.target.id]: e.target.value
        })
        setValues1({
            ...values1,
            [e.target.id]: e.target.value
          })
        //console.log(this.state.users[0].user.userPackage);
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        const userRef = firebase.database().ref('Users');
        const id = props.id;
        userRef.child(id).child('userDetails').update(values);
        userRef.child(id).child('userPackages').update(values1);
        console.log(values);
        history.push({ pathname: "/" });
      }

      

    return (
        <div className="content">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <form onSubmit={handleSubmit}>
              <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          defaultValue={ props.user.userDetails.fullName }
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
                        <Input defaultValue={ props.user.userDetails.email } type="email" id="email"
                          onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Phone (disabled)</label>
                        <Input
                          defaultValue={ props.user.userDetails.phone }
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
                          defaultValue={ props.user.userDetails.age }
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
                          defaultValue={ props.user.userDetails.userRole }
                          placeholder="Role"
                          id="role"
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
                          defaultValue={ props.user.userClasses }
                          placeholder="Classes opted"
                          id="classes"
                          onChange={handleInputChange}
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
                        defaultValue={ props.user.userPackages.startDate && props.user.userPackages.startDate ? props.user.userPackages.startDate : " "}
                        type="date"
                        id="startDate"
                          onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        defaultValue={ props.user.userPackages.endDate && props.user.userPackages.endDate ? props.user.userPackages.endDate : " "}
                        type="date"
                        id="endDate"
                          onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Package Id</label>
                      <Input
                        defaultValue={ props.user.userPackages.packageId && props.user.userPackages.packageId ? props.user.userPackages.packageId : "Package Id"}
                        type="text"
                        id="packageId"
                          onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Sessions</label>
                      <Input
                        defaultValue={ props.user.userPackages.sessions && props.user.userPackages.sessions ? props.user.userPackages.sessions : "Sessions Req"}
                        type="text"
                        id="sessions"
                          onChange={handleInputChange}
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

export default Temp