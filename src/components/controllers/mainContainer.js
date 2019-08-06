import React, { Component } from 'react';
import { Toolbar, Container, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';

export default class MainContainer extends Component {
    constructor() {
        super();
    }

    render() {
        const { handleDialog } = this.props;
        return (
            <Container
                fixed
                style={{
                    marginTop: '10px',
                    height: '300px',
            }}>
                <Paper
                    style={{
                        width: '100%',
                        height: '300px'
                    }}
                >
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
                </Paper>
            </Container>
        )
    }
}