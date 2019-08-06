import React, { Component } from 'react';
import { Toolbar, Container, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default class MainDialog extends Component {
    constructor() {
        super();
    }

    

    render() {
        const {
            classes,
            handleContact,
            handleUpdate,
            dialogHandle,
            handleDialog,
            fName,
            lName,
            hPhone,
            mPhone,
            wPhone,
            email,
            city,
            stateProvince,
            pCode,
            country
        } = this.props;
        return (
            <Dialog 
                open={dialogHandle}
                onClose={handleDialog}
            >
                <DialogTitle>Add Contact</DialogTitle>
                <form onSubmit={handleContact}>
                    <DialogContent>
                        <DialogContentText>
                            Not all fields are required.
                        </DialogContentText>
                        <TextField
                            required
                            label="First Name"
                            className={classes.marginR}
                            value={fName}
                            name="fName"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="Last Name"
                            className={classes.marginR}
                            value={lName}
                            name="lName"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="Home Phone"
                            className={classes.marginR}
                            value={hPhone}
                            name="hPhone"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="Mobile Phone"
                            className={classes.marginR}
                            value={mPhone}
                            name="mPhone"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="Work Phone"
                            className={classes.marginR}
                            value={wPhone}
                            name="wPhone"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="Email"
                            className={classes.marginR}
                            value={email}
                            name="email"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="City"
                            className={classes.marginR}
                            value={city}
                            name="city"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="State or Province"
                            className={classes.marginR}
                            value={stateProvince}
                            name="stateProvince"
                            onChange={handleUpdate}
                        />
                        <TextField
                            label="Postal Code"
                            className={classes.marginR}
                            value={pCode}
                            name="pCode"
                            onChange={handleUpdate}
                        />
                        <TextField
                            type="number"
                            label="Country"
                            className={classes.marginR}
                            value={country}
                            name="country"
                            onChange={handleUpdate}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialog}>
                            Cancel
                        </Button>
                        <Button type="submit" color='primary'>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
}