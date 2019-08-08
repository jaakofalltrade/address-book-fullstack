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
            console.log(response)
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
                                            size="small"
                                        >
                                            <Delete onClick={() => this.deleteContact(x.fname, x.lname, x.id)}/>
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title="Edit Contact.">
                                        <Fab
                                            size="small"
                                            color="secondary"
                                        >
                                            <Edit />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title="View Contact.">
                                        <Fab
                                            size="small"
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
        const { handleDialog } = this.props;
        return (
            <React.Fragment>
                {console.log('is it looping?')}
                <Container
                    fixed
                    style={{
                        marginTop: '10px',
                        height: 'auto',
                        paddingBottom: '20px',
                }}>
                    <ToolbarComp
                        handleDialog={handleDialog}
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
            </React.Fragment>
        )
    }
}