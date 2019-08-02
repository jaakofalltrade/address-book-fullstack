import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import logo from '../images/logo.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class SignUp extends Component {
    constructor() {
        super();
    }

    render() {
        const { 
            design, 
            username, 
            password,
            confirmPass,
            handleUsername,
            handlePassword,
            handleConfirmPass,
         } = this.props;
        return (
            <Paper className={design.loginBox}>
                <Box>
                    <img
                        src={logo}
                        style={{
                            height: 'auto',
                            width: '50%'
                        }}
                    />
                </Box>
                <Box className={design.formBox}>
                    <form>
                        <TextField
                            className={design.inputArea}
                            required
                            type="text"
                            label="Username"
                            value={username}
                            onChange={e => {
                                handleUsername(e.target.value)
                            }}
                            helperText="Some important text"
                        />
                        <TextField
                            className={design.inputArea}
                            required
                            type="password"
                            label="Password"
                            value={password}
                            onChange={e => {
                                handlePassword(e.target.value)
                            }}
                            helperText="Some important text"
                        />
                        <TextField
                            className={design.inputArea}
                            required
                            type="password"
                            label="Confirm Password"
                            value={confirmPass}
                            onChange={e => {
                                handleConfirmPass(e.target.value)
                            }}
                            helperText="Some important text"
                        />
                        <Button
                            type="submit"
                            variant="outlined" 
                            color="primary" 
                            className={design.inputArea}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </Paper>
        )
    }
}