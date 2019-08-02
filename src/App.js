import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import HowToReg from '@material-ui/icons/HowToReg';

import { HashRouter, Route, Switch } from 'react-router-dom';

//Components
import Login from './components/login';
import SignUp from './components/signup';

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
    minHeight: '300px',
    paddingBottom: '10px',
    height: 'auto',
  },
  formBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputArea: {
    width: '90%',
    marginBottom: '30px',
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

  handleChange = (e) => {
    this.setState({
      tabs: e,
    })
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

  render() {
    const { classes } = this.props;
    return (
      <HashRouter>
        <div className={classes.back}>
          <Box style={{
            position:'relative',
            top: '30px',
          }}>
            <Box style={{
              position: 'relative',
              height: '50px',
              width: '300px',
              marginBottom: '5px',
            }}>
              <Tooltip title={this.state.toggleView ? "No Account? Sign Up now!" : "Already have an account? Sign In now!"}>
                <IconButton onClick={this.handleToggleView}>
                  {
                    this.state.toggleView ? (
                      <PersonAdd style={{fontSize: '30px'}} />
                    ) : (
                      <HowToReg style={{fontSize: '30px'}} />
                    )
                  }
                </IconButton>
              </Tooltip>
            </Box>
            {
              this.state.toggleView ? (
                <Login
                  design={classes}
                  handleUsername={this.handleUsername}
                  handlePassword={this.handlePassword}
                  username={this.state.username}
                  password={this.state.password}
                />
              ) : (
                <SignUp
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
      </HashRouter>
    );
  }
}

export default withStyles(styles)(App);