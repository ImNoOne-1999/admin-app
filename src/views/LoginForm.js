import React, { Component } from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Height } from '@material-ui/icons';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Elad Training
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = withStyles((theme) => ({
  
  paper: {
    
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background : "#000" ,
    margin: theme.spacing(3, 8, 8),
  },
  
}));
  const initialState = {
    email: "",
    password: "",
    emailorPwdError: ""
  };
  

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  handleChange = e => {

    this.setState({
      [e.target.id]: e.target.value 
    });
  };

  validate = () => {
    let emailorPwdError = "";

    if (!this.state.email.includes("@")) {
      emailorPwdError = "invalid email";
    }

    if(!(this.state.email=="eladtraining@gmail.com" && this.state.password=="eladTraining#0945")){
      emailorPwdError = "Invalid email or password";
      
    }

    if (emailorPwdError) {
      this.setState({ emailorPwdError });
      return false;
    }
    if(this.state.email=="eladtraining@gmail.com" && this.state.password=="eladTraining#0945"){
      return true;
    }
    return false;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
    console.log(this.props);
  };
    render() {
      const classes = useStyles;
      const { authError,auth } = this.props;
      if (auth.uid) return <Redirect to='/' />
        return (
          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Grid
  container
  spacing={5}
  direction="column"
  alignItems="center"
  justify="center"
  marginTop="30px"
>
<Grid item xs={3}></Grid>
        <img style={{ align: "center" ,height:100,width:100}} src="https://firebasestorage.googleapis.com/v0/b/elad-training.appspot.com/o/webAssets%2FcircleLogo.png?alt=media&token=39899df3-2e75-4e6a-ae40-3c14b52937d8"/>
        <Typography component="h1" variant="h5" style= {{ color : 'black' , margin:'20px' , fontWeight:800 }}>
         Login To Continue
        </Typography>
        </Grid>   
        
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email" 
                            onChange={this.handleChange} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container 
          style = {{marginTop:'30px'}} >
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#"  variant="body2">
                {"Login Only for admins"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
        )
    }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)