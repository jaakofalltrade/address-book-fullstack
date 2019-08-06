import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import './App.css'

import CircularProgress from '@material-ui/core/CircularProgress';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageBox from './components/pageBox';

import Main from './components/main';

import * as ls from 'local-storage';

toast.configure({
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    draggable: true,
})

const styles = {
  back: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#b8d6ff',
    height: 'auto',
    width: '100%',
    position: 'absolute',
    paddingBottom: '30px',
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
  },
  marginR: {
    marginRight: '10px'
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
      token: "",
      loggedIn: false,
      loading: false,
    }
  }

  componentDidMount() {
    const key = ls.get('userKey');
    if(key) {
      this.setState({
        loggedIn: true,
        token: key,
      })
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
    } else if(this.state.password === "" || this.state.username === "" || this.confirmPass === "") {
      this.toastNotif('Naughty naughty!');
    } else {
      this.setState({
        loading: true,
      })
      axios.post('http://localhost:3002/api/user', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if(response.data.result) {
          this.toastNotif(response.data.message);
          this.handleToggleView();
        } else {
          this.toastNotif(response.data.message);
        }
        this.setState({
          loading: false,
        })
      })
      .catch(err => {
        this.toastNotif('Oops this is embarassing, something went wrong!');
        this.setState({
          loading: false,
        })
      })
    }
  }

  login = () => {
    if(this.state.username !== "" || this.state.password !== "") {
      this.setState({
        loading: true,
      })
      axios.post('http://localhost:3002/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.toastNotif(response.data.message);
        console.log(response)
        if(response.data.result) {
          ls.set('userKey',response.data.token);
          ls.set('userName',response.data.username);
          this.setState({
            token: response.data.token,
            loggedIn: true,
          });
        }
        this.setState({
          loading: false,
        })
      })
      .catch(err => {
        this.toastNotif('Oops this is embarassing, something went wrong!');
        this.setState({
          loading: false,
        })
      })
    } else {
      this.toastNotif('Naughty naughty!');
    }
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      token: ""
    })
    ls.clear();
    this.toastNotif('Successfully Logged Out!');
  }

  render() {
    const { classes } = this.props;

    const RealPage = () => {
      return this.state.loading ? (
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: '300px',
          alignItems: 'center'
        }}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <PageBox
          toggleView={this.state.toggleView} 
          handleToggleView={this.handleToggleView}
          login={this.login}
          signUp={this.signUp}
          classes={classes}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword}
          handleConfirmPass={this.handleConfirmPass}
          username={this.state.username}
          password={this.state.password}
          confirmPass={this.state.confirmPass}
        />
      )
    }

    const MainPage = () => {
      return (
        <Main
          classes={classes}
          loggedIn={this.state.loggedIn}
          token={this.state.token}
          logout={this.logout}
        />
      )
    }

    return (
      <HashRouter>
        <Switch>
          <Route exact render={ this.state.loggedIn ? MainPage : RealPage } path="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default withStyles(styles)(App);