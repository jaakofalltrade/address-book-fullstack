import React, { Component } from 'react';

//Components
import MainHeader from './controllers/mainHeader';
import MainContainer from './controllers/mainContainer';
import MainDialog from './controllers/mainDialog';
import axios from 'axios';
import * as ls from 'local-storage';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Main extends Component {
    constructor(props) {
        super(props);
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
            contacts: [],
            isLoading: true,
            search: "",
        }
    }

    componentDidMount() {
        if(ls.get('userId')) {
            this.updateContacts()
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

    updateContacts = () => {
        axios.get(`http://localhost:3002/api/contacts/?search=${this.state.search}&id=${ls.get('userId')}` ,
        {
            headers: {
                Authorization: `Bearer ${ls.get('userKey')}`
            }
        })
        .then(result => {
            this.setState({
                contacts: result.data.data,
                isLoading: false
            })
        }).catch(err => {
            console.log(err)
            //this.updateContacts()
        })
    }

    handleUpdate = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value,
        });
        if(event.target.name === "search") {
            axios.get(`http://localhost:3002/api/contacts/?search=${event.target.value}&id=${ls.get('userId')}`,
            {
                headers: {
                    Authorization: `Bearer ${ls.get('userKey')}`
                }
            })
            .then(result => {
                this.setState({
                    contacts: result.data.data,
                });
            }).catch(err => {
                console.log(err)
                this.updateContacts()
            })
        }
    }

    handleContact = (event) => {
        event.preventDefault();
        if((this.state.fName !== "")) {
            axios.post(`http://localhost:3002/api/contact?user=${ls.get('userId')}`, {
                fname: this.state.fName,
                lname: this.state.lName,
                home_phone: this.state.hPhone,
                mobile_phone: this.state.mPhone,
                work_phone: this.state.wPhone,
                email: this.state.email,
                city: this.state.city,
                state_or_province: this.state.stateProvince,
                postal_code: parseInt(this.state.pCode),
                country: this.state.country
            },
            {
                headers: {
                    Authorization: `Bearer ${ls.get('userKey')}`
                }
            }).then(response => {
                this.props.toastNotif(response.data.message)
                this.updateContacts();
                console.log(response);
            })
            .catch(err => {
                console.log(err);
                this.props.toastNotif('Oops this is embarassing, something went wrong!');
            });
        } else {
            this.props.toastNotif('Naughty naughty!');
        }
        this.setState({
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
            country: ""
        })
    }

    render() {
        const { classes, logout } = this.props;

        return (
            <div>
                <MainHeader
                    anchorEl={this.state.anchorEl}
                    menuHandle={this.state.menuHandle}
                    onClose={this.handleClose}
                    handleMenu={this.handleMenu}
                    handleClose={this.handleClose}
                    logout={logout}
                    handleDialog={this.handleDialog}
                />
                {this.state.isLoading ? (
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
                    <MainContainer
                        updateContacts={this.updateContacts}
                        handleUpdate={this.handleUpdate}
                        search={this.state.search}
                        updateContacts={this.updateContacts}
                        toastNotif={this.props.toastNotif}
                        handleDialog={this.handleDialog}
                        contacts={this.state.contacts}
                    />
                )}
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