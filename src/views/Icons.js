import React from "react";
// reactstrap components
import { Card, CardHeader,CardTitle,Table,Button,CardFooter, CardBody } from "reactstrap";
import firebase from '../config/fbconfig';
import { NavLink,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

class Icons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      classes: []
    };
  };

  deleteClass = (id) => {
    //console.log(id);
    const classesRef = firebase.database().ref('Classes').child(id);
    classesRef.remove();
    this.props.history.push({ pathname: "/admin/classes" });
  }

  componentDidMount() {
    const classesRef = firebase.database().ref('Classes');
    const userRef = firebase.database().ref('Users');
    classesRef.on('value', (snapshot) => {
      let classes = snapshot.val();
      let newClassState = [];
      let usersJoinedClass = [];
      let userNames = [];

      for(let classs in classes) {
        
        usersJoinedClass.push(classes[classs].usersJoined);
      }
      
      for(let users of usersJoinedClass){
        //console.log(users);
        if(users){
          let userTemp = [];
          for(let user of users){
            if(user){
              let userRef1 = userRef.child(user).child("userDetails").child("fullName");
              userRef1.on('value', (snapshot) => {
                
                userTemp.push(snapshot.val()); 
              });
            }
          }
          userNames.push(userTemp);
        }
        else{
          userNames.push([]);
        }   
      }
      
      for(let classs in classes) {
        
        //usersJoinedClass.push(classes[classs].usersJoined);
        
        newClassState.push({
          id: classs,
          classs: classes[classs],
          usersJoined: snapshot.child(classs).child("usersJoined").numChildren(),
          users: userNames
        });
      }
      
      
      console.log(userNames);
      this.setState({
        classes: newClassState
      });
    });
  };
  render(){
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
    // let optionItems = this.state.classes.map((classs,key) =>
    //   <option key={ classs.users[key] }>{ classs.users[key] }</option>);
  //   let optionItems = countries.length > 0
	// 	&& countries.map((item, i) => {
	// 	return (
	// 		<option key={i} value={item.id}>{item.name}</option>
	// 	)
	// }, this);
  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Class Table</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter" responsive>
              <thead className="text-primary">
                <tr>
                  <th>coach</th>
                  <th>name</th>
                  <th>description</th>
                  <th>users joined</th>
                  <th>timings</th>
                  <th>date</th>
                  <th>capacity</th>
                  <th>count</th>
                </tr>
              </thead>
              <tbody>
                
              {this.state.classes.map((classs,key) => {
                
                return (
                    <tr>
                      <td>{ classs.classs.coach }</td>
                      <td>{ classs.classs.name }</td>
                      <td>{ classs.classs.description }</td>
                      <td><p>{ classs.users[key].join(", ") }</p></td>
                      <td>{ classs.classs.startTime } - { classs.classs.endTime }</td>
                      <td>{ classs.classs.date }</td>
                      <td>{ classs.classs.capacity }</td>
                      <td>{ classs.usersJoined }</td>
                      <td>
                        <Button
                            color="link"
                            type="button"
                            onClick={()=>{if(window.confirm("Sure You Want To Delete This Class?"))this.deleteClass(classs.id)}}
                          >
                            <i className="tim-icons icon-simple-remove" />
                          </Button></td>
                    </tr>  
                )
              })}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
          <NavLink to={'/admin/create-class'}>
            <Button className="btn-fill" color="primary" type="submit" onClick={this.handleClick}>
              Add Class
            </Button>
          </NavLink>
          </CardFooter>
        </Card>
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

export default connect(mapStateToProps)(Icons);
