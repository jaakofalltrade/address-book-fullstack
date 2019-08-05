import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Toolbar } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import PermIdentity from '@material-ui/icons/PermIdentity';
import IconButton from '@material-ui/core/IconButton';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            menuHandle: false,
            anchorEl: null
        }
    }

    handleMenu = (event) => {
        this.setState({
            menuHandle: !this.state.menuHandle,
            anchorEl: event.currentTarget
        })
    }

    handleClose = (event) => {
        this.setState({
            menuHandle: !this.state.menuHandle,
        })
    }

    render() {
        const { loggedIn, token, logout } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Tooltip title="Menu">
                            <IconButton
                                onClick={this.handleMenu}
                            >
                                <PermIdentity style={{color: '#ffffff', fontSize: '30px'}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            keepMounted
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.menuHandle)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={() => this.handleClose()}>Profile</MenuItem>
                            <MenuItem onClick={() => logout()}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}