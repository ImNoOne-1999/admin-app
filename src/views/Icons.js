import React from "react";
// reactstrap components
import { Card, CardHeader,CardTitle,Table,Button,CardFooter, CardBody, Row, Col } from "reactstrap";
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
    console.log(id);
    const classesRef = firebase.database().ref('Classes').child(id);
    classesRef.remove();
  }

  componentDidMount() {
    const classesRef = firebase.database().ref('Classes');
    classesRef.on('value', (snapshot) => {
      let classes = snapshot.val();
      let newClassState = [];
      
      for(let classs in classes) {
        newClassState.push({
          id: classs,
          classs: classes[classs],
          usersJoined: snapshot.child(classs).child("usersJoined").numChildren()
        });
      }
      //console.log(newClassState);
      this.setState({
        classes: newClassState
      });
    });
  };
  render(){
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
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
                  <th>timings</th>
                  <th>date</th>
                  <th>capacity</th>
                  <th>count</th>
                </tr>
              </thead>
              <tbody>
              {this.state.classes.map((classs) => {
                return (
                    <tr>
                      <td>{ classs.classs.coach }</td>
                      <td>{ classs.classs.name }</td>
                      <td>{ classs.classs.description }</td>
                      <td>{ classs.classs.timings }</td>
                      <td>{ classs.classs.date }</td>
                      <td>{ classs.classs.capacity }</td>
                      <td>{ classs.usersJoined }</td>
                      <td>
                        <NavLink to={'/'}><Button
                            color="link"
                            //id="tooltip457194718"
                            //title=""
                            type="button"
                            onClick={() => {this.deleteClass(classs.id)}}
                          >
                            <i className="tim-icons icon-simple-remove" />
                          </Button></NavLink></td>
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
