import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';
import logo from './images/logo.png'

const styles = {
  back: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#b8d6ff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingTop: '40px',
  },
  loginBox: {
    width: '350px',
    height: '350px',
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange = (e) => {
    this.setState({
      tabs: e,
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.back}>
        <Box>
          <img src={logo} />
        </Box>
        <Paper className={classes.loginBox}>
          test
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);