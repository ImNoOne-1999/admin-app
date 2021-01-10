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
    Modal,
    ModalBody,
    ModalFooter,
    Col,
  } from "reactstrap";

const NewsForm = (props) => {

  const history = useHistory();

      const [values, setValues] = useState({
      body: '',
      title: '',
      imageUrl: '',
      timeStamp: Math.round((new Date()).getTime()/1000),
      });

      const handleInputChange = (e) =>{
        setValues ({
            ...values,
            [e.target.name]: e.target.value
        })
        
      }

      const handleFormSubmit = (e) =>{
        e.preventDefault();
        props.callForm(values);
        setValues({
          body: '',
          title: '',
          imageUrl: '',
          timeStamp: Math.round((new Date()).getTime()/1000),
        })
        history.push({ pathname: "/admin/news" });
      }
    

    return (
        <div className="content">
        <Row>
          <Col md="12">
          <Card>
              <CardHeader>
                <h5 className="title">Create News</h5>
              </CardHeader>
              <form onSubmit={handleFormSubmit}>
              <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="11">
                      <FormGroup>
                        <label>
                          Title
                        </label>
                        <Input placeholder="News Title" type="text" name="title"
                        value={values.title}  
                        onChange={handleInputChange} 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="11">
                    <FormGroup>
                      <label>Image Url</label>
                      <Input
                        placeholder="Image Url Link"
                        type="text"
                        name="imageUrl"
                        value={values.imageUrl} 
                        onChange={handleInputChange} 
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="11">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        placeholder="Enter News Description Here"
                        type="textarea"
                        name="body"
                        value={values.body}
                        onChange={handleInputChange} 
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" 
                //onClick={props.toggleModalAdd} 
                type="submit"
                >
                  Add News
                </Button>
                <Modal isOpen={props.modalAdd} toggle={props.toggleModalAdd}>
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Adding News
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                        onClick={props.toggleModalAdd}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                    </div>
                    <ModalBody>
                        <p>Re-Check Before Adding News</p>
                        <br />
                        <Button color="primary" className="right" 
                        onClick={handleFormSubmit} 
                        >
                            Add News
                        </Button>
                    </ModalBody>
                </Modal>
              </CardFooter>
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    );
}

export default NewsForm