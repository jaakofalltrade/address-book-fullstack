import React, { Component } from 'react';

//Components
import MainHeader from './controllers/mainHeader';
import MainContainer from './controllers/mainContainer';
import MainDialog from './controllers/mainDialog';
import axios from 'axios';
import * as ls from 'local-storage';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            menuHandle: false,
            anchorEl: null,
            dialogHandle: false,
            fName: "",
            lName: "",
            hPhone: "",
            mPhone: "",
            wPhone: "",
            email: "",
            city: "",
            stateProvince: "",
            pCode: "",
            country: "",
        }
    }

    handleMenu = (event) => {
        this.setState({
            menuHandle: !this.state.menuHandle,
            anchorEl: event.currentTarget
        })
    }

    handleDialog = () => {
        this.setState({
            dialogHandle: !this.state.dialogHandle,
        })
    }

    handleClose = () => {
        this.setState({
            menuHandle: !this.state.menuHandle,
        })
    }

    handleUpdate = (event) => {
        if(event.target.name === 'pCode') {
            console.log('test')
            this.setState({
                pCode: event.target.value.replace(/\+|-/ig, '')
            })
        } else {
            this.setState({
                [`${event.target.name}`]: event.target.value,
            });
        }     
    }

    handleContact = (event) => {
        event.preventDefault();
        axios.post({
            fname: this.state.fName,
            lname: this.state.lName,
            home_phone: this.state.hPhone,
            mobile_phone: this.state.mPhone,
            work_phone: this.state.wPhone,
            email: this.state.email,
            city: this.state.city,
            state_or_province: this.state.stateProvince
        },
        {
            headers: {
                Authorization: `Bearer ${ls.get('userKey')}`
            }
        }).then({

        })
    }

    render() {
        const { classes, loggedIn, token, logout } = this.props;
        return (
            <div>
                <MainHeader
                    anchorEl={this.state.anchorEl}
                    menuHandle={this.state.menuHandle}
                    onClose={this.handleClose}
                    handleMenu={this.handleMenu}
                    logout={logout}
                />
                <MainContainer
                    handleDialog={this.handleDialog}
                />
                <MainDialog
                    handleContact={this.handleContact}
                    handleUpdate={this.handleUpdate}
                    classes={classes}
                    dialogHandle={this.state.dialogHandle}
                    handleDialog={this.handleDialog}
                    fName={this.state.fName}
                    lName={this.state.lName}
                    hPhone={this.state.hPhone}
                    mPhone={this.state.mPhone}
                    wPhone={this.state.wPhone}
                    email={this.state.email}
                    city={this.state.city}
                    stateProvince={this.state.stateProvince}
                    pCode={this.state.pCode}
                    country={this.state.country}
                />
            </div>
        )
    }
}