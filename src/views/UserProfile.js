import React from "react";
import firebase from '../config/fbconfig';
import UserProfileForm from './UserProfileForm';
import Temp from './Temp';

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
    // this.setState({
    //   ...this.state,
    //   [e.target.id]: e.target.value
    // })
    const id = this.props.match.params.id;
    //this.setState({ users[0].userDetails.fullName: e.target.value}) 
    //console.log(this.state.users[0].user);
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const userRef = firebase.database().ref('Users');
    const id = this.props.match.params.id;
    //userRef.child(id).update(this.state.users[id].userDetailts.fullName: );
    console.log(this.state);
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

export default UserProfile;