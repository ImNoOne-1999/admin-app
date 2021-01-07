import React, {useState} from "react";
import firebase from '../config/fbconfig';
import NewsForm from './NewsForm';
import { Redirect,NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

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
  Modal,
  ModalBody,
  CardImg,
  Form,
  Col,
} from "reactstrap";



class News extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          classes: [],
          news: [],
          modalDelete: false,
          modalAdd: false
        };
        this.toggleModalDelete = this.toggleModalDelete.bind(this);
        this.toggleModalAdd = this.toggleModalAdd.bind(this);
      };

    toggleModalDelete(){
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }
    toggleModalAdd(){
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }
    
    componentDidMount() {
    const userRef = firebase.database().ref('HomeInfo').child('News');
    userRef.on('value', (snapshot) => {
        let news = snapshot.val();
        let newState = [];
        for(let n in news) {
        newState.push({
            id: n,
            body: news[n].body,
            title: news[n].title,
            imageUrl: news[n].imageUrl,
        });
        }
        this.setState({
        news: newState
        });
    });
    };

  callForm = (obj) => {
    const homeRef = firebase.database().ref('HomeInfo').child('News');
    homeRef.push(obj);
  }

  deleteNews = (id) => {
    console.log(id);
    const newsRef = firebase.database().ref('HomeInfo').child('News').child(id);
    newsRef.remove();
  }
  
render(){
  const { auth } = this.props;
  if (!auth.uid) return <Redirect to='/login' />
  return (
    <div className="content">
        <Row>
            <Col md="8">
    <NewsForm callForm={this.callForm} modalDelete={this.state.modalDelete} modalAdd={this.state.modalAdd} toggleModalAdd={this.toggleModalAdd} toggleModalDelete={this.toggleModalDelete} />
    </Col>
    
          <Col md="4">
          {this.state.news.map((n) => {
                return (
          <Card style={{width: '20rem'}} className="text-center">
              <CardHeader >
              <Row>
              <Col className="text-right" md="12"><Button
                color="link"
                //id="tooltip457194718"
                //title=""
                type="button"
                onClick={this.toggleModalDelete}
                >
                <i className="tim-icons icon-simple-remove" />
                </Button>
                <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete}>
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Deleting News
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                        onClick={this.toggleModalDelete}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                    </div>
                    <ModalBody>
                        <p>Are you sure you want to Delete?</p>
                        <br />
                        <Button color="primary" className="right" onClick={() => {this.deleteNews(n.id)}} >
                            Delete 
                        </Button>
                    </ModalBody>
                </Modal></Col>
                <Col className="text-center" md="12">
                <h5 className="title">{ n.title }</h5>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                  <Row>
                  <Col className="text-center" md="12">
                  <CardImg src={ n.imageUrl } alt="News Image" width="200" height="200" />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                  <Col className="text-center" md="12">
                    { n.body }
                    </Col>
                  </Row>
                  </CardBody>
              <CardFooter>
              
              </CardFooter>
            </Card>
            )
        })}
          </Col>
        </Row>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(News);
