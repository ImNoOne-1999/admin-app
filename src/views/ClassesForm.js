import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {v1 as uuid} from 'uuid';
//import DatePicker from 'reactstrap-date-picker';
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

const ClassesForm = (props) => {

  const history = useHistory();

      const [values, setValues] = useState({coach: '',
      description: '',
      capacity: '',
      startTime: '',
      endTime: '',
      date: '',
      name: '',
      id: uuid(),
      timeStamp: '',
      userDetails: []});

      const handleInputChange = (e) =>{
        setValues ({
            ...values,
            [e.target.name]: e.target.value
        })
      }

      var today;
      const handleInputChangeNumber = (e) =>{
        setValues ({
            ...values,
            [e.target.name]: parseInt(e.target.value)
        })
      }

      const handleFormSubmit = (e) =>{
        e.preventDefault();
        var timeParts = values.startTime.split(':');
        today = new Date(values.date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        var dateParts = today.split('/');
        props.callForm({...values,timeStamp:  new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0],timeParts[0],timeParts[1]).getTime()/1000, date: today});
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
                          onChange={handleInputChange} 
                          required
                           />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Capacity</label>
                        <Input
                          name="capacity"
                          value={values.capacity}
                          defaultValue=""
                          onChange={handleInputChangeNumber}  
                          placeholder="capacity"
                          type="text"
                          required
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
                          onChange={handleInputChange} 
                          placeholder="Name"
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                      <label>Date</label>
                        <Input
                          defaultValue=""
                          type="date"
                          name="date"
                          value={values.date}  
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Start Time</label>
                      <Input
                        defaultValue=""
                        placeholder="Timings"
                        name="startTime"
                        value={values.startTime}
                        onChange={handleInputChange} 
                        type="time"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>End Time</label>
                      <Input
                        defaultValue=""
                        placeholder="Timings"
                        name="endTime"
                        value={values.endTime} 
                        onChange={handleInputChange} 
                        type="time"
                        required
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
                        onChange={handleInputChange} 
                        required
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