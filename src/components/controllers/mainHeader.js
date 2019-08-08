import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Toolbar, Container, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import logo from '../../images/logo.png';
import * as ls from 'local-storage';

export default class MainHeader extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
        }
    }

    componentDidMount() {
        const username = ls.get('userName');
        this.setState({
            userName: username,
        })
    }

    render() {
        const {
            anchorEl,
            menuHandle,
            logout,
            handleClose,
            handleMenu
        } = this.props;
        return (
            <AppBar position="static">
                <Toolbar style={{
                    width: '80%',
                    margin: 'auto auto',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <img 
                            src={logo} 
                            alt="A generic alternate text" 
                            style={{
                                height: '70px',
                                width: 'auto'
                            }}
                        />
                    </Box>
                    <div>
                        <Tooltip title="Menu">
                            <IconButton
                                onClick={handleMenu}
                            >
                                <AccountCircle style={{color: '#ffffff', fontSize: '30px'}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            keepMounted
                            anchorEl={anchorEl}
                            open={Boolean(menuHandle)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleClose()}>Profile</MenuItem>
                            <MenuItem onClick={() => logout()}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}