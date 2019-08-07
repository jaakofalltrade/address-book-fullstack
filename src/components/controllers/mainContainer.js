import React, { Component } from 'react';
import { Toolbar, Container, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import * as ls from 'local-storage';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import MediaQuery from 'react-responsive';


export default class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3002/api/contacts/${ls.get('userId')}` ,
        {
            headers: {
                Authorization: `Bearer ${ls.get('userKey')}`
            }
        })
        .then(result => {
            this.setState({
                contacts: result.data.response
            })
            console.log(this.state.contacts)
        }).catch(err => console.log(err))
    }

    render() {
        const { handleDialog } = this.props;
        return (
            <Container
                maxWidth="md"
                style={{
                    marginTop: '10px',
                    height: 'auto',
                    paddingBottom: '20px',
            }}>
                <Toolbar>
                        <Tooltip title="Add a contact">
                        <Fab
                            onClick={handleDialog}
                            size="small"
                            color="secondary"
                        >
                            <Add />
                        </Fab>
                    </Tooltip>
                </Toolbar>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    overflow: 'hidden'
                }}>
                <GridList cellHeight="auto" spacing={1} style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '10px',
                    backgroundColor: 'red'
                }}>
                    <GridListTile cols={2} style={{height: 'auto'}}><h2>Contacts</h2></GridListTile>
                    <GridListTile>
                        <GridListTile>
                            <Paper style={{
                                width: '300px',
                                height: 'auto',
                                minHeight: '300px',
                            }}>
                                <h1>test</h1>
                            </Paper>
                        </GridListTile>
                        <GridListTile>
                            <Paper style={{
                                width: '300px',
                                height: 'auto',
                                minHeight: '300px',
                            }}>
                                <h1>test</h1>
                            </Paper>
                        </GridListTile>
                        <GridListTile>
                            <Paper style={{
                                width: '300px',
                                height: 'auto',
                                minHeight: '300px',
                            }}>
                                <h1>test</h1>
                            </Paper>
                        </GridListTile>
                    </GridListTile>
                </GridList>
                </div>
            </Container>
        )
    }
}