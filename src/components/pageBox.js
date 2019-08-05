import React, { Component } from 'react';
import Box from '@material-ui/core/Box';

//Components
import Login from './login';
import SignUp from './signup';
import Head from './head';

export default class PageBox extends Component {
    render() {
        const {
            login,
            signUp,
            toggleView,
            handleToggleView,
            handleUsername,
            handlePassword,
            handleConfirmPass,
            username,
            password,
            confirmPass,
            classes
        } = this.props;
        return (
        <div className={classes.back}>
            <Box style={{
                position:'relative',
            }}>
                <Head
                toggleView={toggleView} 
                handleToggleView={handleToggleView}
                />
                {
                toggleView ? (
                    <Login
                    login={login}
                    design={classes}
                    handleUsername={handleUsername}
                    handlePassword={handlePassword}
                    username={username}
                    password={password}
                    />
                ) : (
                    <SignUp
                    signUp={signUp}
                    design={classes}
                    handleUsername={handleUsername}
                    handlePassword={handlePassword}
                    handleConfirmPass={handleConfirmPass}
                    username={username}
                    password={password}
                    confirmPass={confirmPass}
                    />
                )
                }
            </Box>
        </div>
        )
    }
}