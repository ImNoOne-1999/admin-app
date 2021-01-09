import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
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

const ClassesForm = (props) => {

  const history = useHistory();

      const [values, setValues] = useState({coach: '',
      description: '',
      capacity: '',
      timings: '',
      date: '',
      name: '',
      id: uuid(),
      timeStamp: Math.round((new Date()).getTime()/1000),
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
        history.push({ pathname: "/admin/classes" });
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
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Coach Name
                        </label>
                        <Input placeholder="Coach Name" type="text" name="coach"
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
                          placeholder="Timings"
                          name="timings"
                          value={values.timings}
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
                        placeholder="Enter Class Description Here"
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