import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';

import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

//Components
import Login from './components/login';
import SignUp from './components/signup';
import Head from './components/head';
import Main from './components/main';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
})

const styles = {
  back: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#b8d6ff',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  loginBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '300px',
    minHeight: '290px',
    paddingBottom: '10px',
    height: 'auto',
    transition: 'height 0.5s',
  },
  formBox: {
    marginTop: '-20px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputArea: {
    width: '90%',
    marginBottom: '30px',
  },
  textBuffer: {
    paddingBottom: '5px',
    width: '100%',
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
      confirmPass: "",
      toggleView: true,
    }
  }

  handleUsername = (e) => {
    this.setState({
      username: e,
    });
  }

  handlePassword = (e) => {
    this.setState({
      password: e,
    });
  }

  handleConfirmPass = (e) => {
    this.setState({
      confirmPass: e,
    })
  }

  handleToggleView = () => {
    this.setState({
      username: "",
      password: "",
      confirmPass: "",
      toggleView: !this.state.toggleView,
    })
  }

  toastNotif = (e) => {
    toast(e);
  }

  signUp = () => {
    if(this.state.password !== this.state.confirmPass) {
      this.toastNotif('Passwords does not match!')
    } else {
      axios.post('http://localhost:3002/api/user', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        console.log(response)
        if(response.data.result) {
          this.toastNotif(response.data.message);
          this.handleToggleView();
        } else {
          this.toastNotif(response.data.message);
        }
      })
      .catch(err => {
        this.toastNotif('Oops this is embarassing, something went wrong!')
      })
    }
  }

  login = () => {
    
  }

  render() {
    const { classes } = this.props;
    const RealPage = () => {
      return (
        <div className={classes.back}>
          <Box style={{
            position:'relative',
            top: '30px',
          }}>
            <Head
              toggleView={this.state.toggleView} 
              handleToggleView={this.handleToggleView}
            />
            {
              this.state.toggleView ? (
                <Login
                  login={this.login}
                  design={classes}
                  handleUsername={this.handleUsername}
                  handlePassword={this.handlePassword}
                  username={this.state.username}
                  password={this.state.password}
                />
              ) : (
                <SignUp
                  signUp={this.signUp}
                  design={classes}
                  handleUsername={this.handleUsername}
                  handlePassword={this.handlePassword}
                  handleConfirmPass={this.handleConfirmPass}
                  username={this.state.username}
                  password={this.state.password}
                  confirmPass={this.state.confirmPass}
                />
              )
            }
          </Box>
        </div>
      )
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact component={RealPage} path="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default withStyles(styles)(App);