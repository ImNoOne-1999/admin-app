import React from "react";
import firebase from '../config/fbconfig';
import UserProfileForm from './UserProfileForm';
import Temp from './Temp';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class UserProfile extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      users: []
    };
  };

  handleChange = (e) =>{
    const id = this.props.match.params.id;
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const userRef = firebase.database().ref('Users');
    const id = this.props.match.params.id;
    this.props.history.push('/');
  }

  componentDidMount() {
    const userRef = firebase.database().ref('Users');
    userRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      const id = this.props.match.params.id;
      newState.push({
        id: id,
        userPackages: users[id].userPackages,
        userDetails: users[id].userDetails,
        userClasses: users[id].userClasses,
      });
      this.setState({
        users: newState
      });
    });
  };
  render(){
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
  return (
    <>
      <div className="content">
      {this.state.users.map((user) => {
        return (
        <Row>
          <Col md="8">
            {/* <UserProfileForm user={user} id={this.props.match.params.id} /> */}
            <Temp user={user} id={this.props.match.params.id} />
          </Col>
        </Row>
        )
      })}
      </div>
    </>
  );
}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(UserProfile);