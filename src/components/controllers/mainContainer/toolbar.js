import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';

export default class ToolbarComp extends Component {
    constructor() {
        super();
    }

    render() {
        const { search, handleUpdate, updateContacts} = this.props;
        return (
            <Toolbar style={{
                display: 'flex',
                justifyContent: 'space-evenly'
            }}>
                <TextField
                    onChange={handleUpdate}
                    value={search}
                    name="search"
                    label="Search"
                    type="search"
                    margin="normal"
                />
            </Toolbar>
        )
    }
}