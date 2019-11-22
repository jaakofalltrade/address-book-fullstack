import React, { Component } from 'react';
import { Container, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Contacts from '@material-ui/icons/Contacts';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import * as ls from 'local-storage';
import ToolbarComp from './mainContainer/toolbar';
import DeleteDialog from './mainContainer/deleteDialog';
import ViewDialog from './mainContainer/viewDialog';
import EditDialog from './mainContainer/editDialog';

//import MediaQuery from 'react-responsive';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            dialogOpen: false,
            fname: '',
            lname: '',
            contactId: '',
            openDial: false,
            contactData: [],
            delay: false,
            openEdit: false,
            idEdit: '',
            fName: "",
            lName: "",
            hPhone: "0",
            mPhone: "0",
            wPhone: "0",
            email: "",
            city: "",
            stateProvince: "",
            pCode: "0",
            country: "",
        }
    }

    handleChange = (panel) => (event, isExpanded) => {
        this.setState({
            expanded: isExpanded ? panel : false,
        })
    }

    realDelete = () => {
        axios.delete(`http://localhost:3002/api/contact/delete/${this.state.contactId}`, {
            headers: {
                Authorization: `Bearer ${ls.get('userKey')}`
            }
        }).then(response => {
            if(response.data.result) {
                this.props.toastNotif(response.data.message);
                this.deleteClose();
                this.props.updateContacts();
            } else {
                this.props.toastNotif('Contact not deleted!');
            }
        }).catch(err => {
            console.log(err);
            this.props.toastNotif('Oops this is embarassing!');
        });
    }

    deleteContact = (fname, lname, id) => {
        this.setState({
            dialogOpen: true,
            fname: fname,
            lname: lname,
            contactId: id
        })
    }

    deleteClose = () => {
        this.setState({
            dialogOpen: false,
            fname: "",
            lname: "",
            contactId: ""
        })
    }

    openDialfunc = (id) => {
        this.setState({delay: true})
        axios.get(`http://localhost:3002/api/contact/${id}`, {
            headers: {
                Authorization: `Bearer ${ls.get('userKey')}`
            }
        })
        .then(response => {
            if(response.data.result) {
                this.setState({
                    openDial: true,
                    contactData: response.data.data,
                    delay: false
                })
            }
        }).catch(err => {
            console.log(err);
            this.openDialfunc(id)
        })
    }

    closeDial = () => {
        this.setState({
            openDial: false,
            contactId: ""
        })
    }

    editHandle = (id) => {
        if(this.state.openEdit) {
            this.setState({
                openEdit: false,
            });
        } else {
            axios.get(`http://localhost:3002/api/contact/${id}`, {
                headers: {
                    Authorization: `Bearer ${ls.get('userKey')}`
                }
            })
            .then(response => {
                if(response.data.result) {
                    this.setState({
                        openEdit: true,
                        fName: response.data.data.fname,
                        lName: response.data.data.lname,
                        hPhone: response.data.data.home_phone,
                        mPhone: response.data.data.mobile_phone,
                        wPhone: response.data.data.work_phone,
                        email: response.data.data.email,
                        city: response.data.data.city,
                        stateProvince: response.data.data.state_or_province,
                        pCode: response.data.data.postal_code,
                        country: response.data.data.country,
                        idEdit: id,
                    })
                }
            }).catch(err => {
                console.log(err);
                this.editHandle()
            })
        }
    }

    handleUpdate = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value,
        });
    }


    contactsShow = () => {
        if(this.props.contacts) {
            return this.props.contacts.map(x => (
                    <Grid key={`${x.id}`} item>
                        <Paper style={{
                            width: '250px',
                        }}>
                            <ExpansionPanel
                                expanded={this.state.expanded === `${x.id}`}
                                onChange={this.handleChange(`${x.id}`)}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant="h6" >{`${x.fname} ${x.lname}`}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}>
                                    <Tooltip title="Delete Contact?">
                                        <Fab 
                                            onClick={() => this.deleteContact(x.fname, x.lname, x.id)}
                                            size="small"
                                        >
                                            <Delete />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title="Edit Contact Information.">
                                        <Fab
                                            onClick={() => this.editHandle(x.id)}
                                            size="small"
                                            color="secondary"
                                        >
                                            <Edit />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title="View Contact Information.">
                                        <Fab
                                            disabled={this.state.delay}
                                            size="small"
                                            onClick={() => this.openDialfunc(x.id)}
                                        >
                                            <Contacts />
                                        </Fab>
                                    </Tooltip>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Paper>
                    </Grid>
            ))
        } else {
            return (
                <Typography variant="h2">No Contacts Added!</Typography>
            )
        }
    }

    render() {
        const { search, handleUpdate, updateContacts, toastNotif } = this.props;
        return (
            <React.Fragment>
                <Container
                    fixed
                    style={{
                        marginTop: '10px',
                        height: 'auto',
                        paddingBottom: '20px',
                }}>
                    <ToolbarComp
                        updateContacts={updateContacts}
                        search={search}
                        handleUpdate={handleUpdate}
                    />
                    <Typography variant="h6">Contact List:</Typography>
                    <Grid container spacing={1} style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap'
                    }}>
                        {
                            this.contactsShow()
                        }
                    </Grid>
                </Container>
                <DeleteDialog
                    dialogOpen={this.state.dialogOpen}
                    deleteClose={this.deleteClose}
                    fname={this.state.fname}
                    lname={this.state.lname}
                    realDelete={this.realDelete}
                />
                <ViewDialog
                    contactId={this.state.contactId}
                    openDial={this.state.openDial}
                    closeDial={this.closeDial}
                    contactData={this.state.contactData}
                />
                <EditDialog
                    updateContacts={updateContacts}
                    toastNotif={toastNotif}
                    openEdit={this.state.openEdit}
                    editHandle={this.editHandle}
                    idEdit={this.state.idEdit}
                    handleUpdate={this.handleUpdate}
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
            </React.Fragment>
        )
    }
}