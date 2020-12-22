import React,{useState} from 'react';
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

const ClassesForm = (props) => {

  const history = useHistory();

    const initialState = {
      
          classes:  [{coach: '',
            description: '',
            capacity: '',
            timing: '',
            date: '',
            name: '',
            userDetails: []}]
        
      };

      const [values, setValues] = useState({coach: '',
      description: '',
      capacity: '',
      timing: '',
      date: '',
      name: '',
      userDetails: []});

      const handleInputChange = (e) =>{
        setValues ({
            ...values,
            [e.target.name]: e.target.value
        })
        
      }

      const handleFormSubmit = (e) =>{
        e.preventDefault();
        props.callForm(values);
        //const classesRef = firebase.database().ref('Classes');
        //console.log(this.state);
        //const id = this.props.match.params.id;
        //userRef.child(id).child('userDetails').update({fullName: this.state.users[0].user.fullName });
        //console.log(this.state.users[0]);
        history.push({ pathname: "/" });
      }
    

    return (
        <div className="content">
        <Row>
          <Col md="12">
          <Card>
              <CardHeader>
                <h5 className="title">Create Class</h5>
              </CardHeader>
              <form onSubmit={handleFormSubmit}>
              <CardBody>
{/*                
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Class Name</label>
                        <Input
                          defaultValue=""
                          placeholder="Full Name"
                          type="text"
                          name="className"
                          value={values.className}
                          onChange={handleInputChange} 
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Coach Name
                        </label>
                        <Input placeholder="" type="text" name="coach"
                          value={values.coach}
                          //onChange={(e) => setValues(e.target.value)}
                          onChange={handleInputChange} 
                           />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Capacity</label>
                        <Input
                          defaultValue=""
                          name="capacity"
                          value={values.capacity}
                          //onChange={(e) => setValues(e.target.value)}
                          onChange={handleInputChange}  
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
                          name="name"
                          value={values.name}
                          //onChange={(e) => setValues(e.target.value)} 
                          onChange={handleInputChange} 
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
                          name="timing"
                          value={values.timing}
                          //onChange={(e) => setValues(e.target.value)} 
                          onChange={handleInputChange} 
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
                        name="date"
                          value={values.date}
                          //onChange={(e) => setValues(e.target.value)}  
                          onChange={handleInputChange} 
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
                        name="description"
                          value={values.description}
                          //onChange={(e) => setValues(e.target.value)}  
                          onChange={handleInputChange} 
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
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    );
}

export default ClassesForm