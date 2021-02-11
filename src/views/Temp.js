import React,{useState} from 'react';
import firebase from '../config/fbconfig';
import {useHistory} from 'react-router-dom';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    CardFooter,
    Button,
    Row,
    Col,
  } from "reactstrap";

function Temp(props) {

    const history = useHistory();
    console.log(props.user);

    const [values,setValues] = useState({
          dob: props.user.userDetails.dob,
          email: props.user.userDetails.email,
          fullName: props.user.userDetails.fullName,
          imageUrl: props.user.userDetails.imageUrl,
          phone: props.user.userDetails.phone,
          //userRole: props.user.userDetails.userRole
      });

      const [values1,setValues1] = useState({
          endDate: props.user.userPackages.endDate,
          //active: props.user.userPackages.active,
          packageId: props.user.userPackages.packageId,
          sessions: props.user.userPackages.sessions,
          startDate: props.user.userPackages.startDate
      });
    const handleInputChange = (e) =>{
        setValues({
          ...values,
          [e.target.id]: e.target.value
        });
        //console.log(this.state.users[0].user.userPackage);
      }

      var today;
      const handleInputChangeDOB = (e) =>{
        today = new Date(e.target.value);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        //handleInputChangeDOB(today);
        setValues({
          ...values,
          dob: today
        });
      }

      const handleInputChangeNumber = (e) =>{
        setValues1 ({
            ...values1,
            [e.target.name]: parseInt(e.target.value)
        }) 
      }

      const handleChangeDate = (e) =>{
        setValues1({
          ...values1,
          [e.target.name]: new Date(e.target.value).valueOf()/1000
        });
        console.log(values1);
      }

      const handleInputChangePackage = (e) =>{
        setValues1({
          ...values1,
          [e.target.name]: e.target.value
        });
      }
      const handleSubmit = (e) =>{
        e.preventDefault();
        const userRef = firebase.database().ref('Users');
        userRef.child(props.id).update({ userDetails: values, userPackages: values1 });
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
                          defaultValue={ values.fullName }
                          placeholder="Full Name"
                          type="text"
                          id="fullName"
                          //onChange={(e)=>this.setState({userDetails: { fullName: e.target.value}})}
                          onChange={handleInputChange}
                          required
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
                        <Input defaultValue={ values.email } placeholder="Email" type="email" id="email"
                          onChange={handleInputChange} required />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Phone (disabled)</label>
                        <Input
                          defaultValue={ values.phone }
                          disabled
                          placeholder="phone"
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Date of Birth</label>
                        <Input
                          defaultValue={ values.dob }
                          id="dob"
                          //onChange={handleInputChange}
                          onChange={(e)=>{handleInputChange(e); handleInputChangeDOB(e);}}
                          placeholder="dob"
                          type="date"
                          //disabled
                          required
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col className="pl-md-1" md="6">
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
                    </Col> */}
                  </Row>
                  <CardHeader>
                  <h5 className="title">Class Packages</h5>
                  </CardHeader>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Start Date</label>
                      <Input
                        //defaultValue={ values1.startDate }
                        type="date"
                        name="startDate"
                        onChange={handleChangeDate}
                        required
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
                        onChange={handleChangeDate}
                        required
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Package Id</label>
                      <Input
                        defaultValue={ values1.packageId }
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
                        defaultValue={ values1.sessions }
                        type="number"
                        name="sessions"
                        onChange={handleInputChangeNumber}
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

export default Temp