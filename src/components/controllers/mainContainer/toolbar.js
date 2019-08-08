import React, { Component } from 'react';
import Add from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

export default class ToolbarComp extends Component {
    constructor() {
        super();
    }

    render() {
        const {
            handleDialog
        } = this.props
        return (
            <Toolbar style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                    <Tooltip title="Add a contact">
                    <Fab
                        onClick={handleDialog}
                        size="small"
                        color="primary"
                    >
                        <Add />
                    </Fab>
                </Tooltip>
            </Toolbar>
        )
    }
}