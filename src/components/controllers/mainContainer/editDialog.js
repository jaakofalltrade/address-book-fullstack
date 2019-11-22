import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as ls from 'local-storage';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default class EditDialog extends Component {
    constructor(props) {
        super(props);
    }

    submitEdit = (event) => {
        console.log(this.props.pCode)
        event.preventDefault();
        axios.patch(`http://localhost:3002/api/contacts/${this.props.idEdit}`,
        {
            fname: this.props.fName,
            lname: this.props.lName,
            home_phone: this.props.hPhone,
            mobile_phone: this.props.mPhone,
            work_phone: this.props.wPhone,
            email: this.props.email,
            city: this.props.mPhone,
            state_or_province: this.props.stateProvince,
            postal_code: this.props.pCode,
            country: this.props.country
        },
        {
            headers: {
                Authorization: `Bearer ${ls.get('userKey')}`
            }
        })
        .then(response => {
            this.props.editHandle()
            this.props.toastNotif(response.data.message)
            this.props.updateContacts()
        }).catch(err => {
            console.log(err)
        })
    }
    

    render() {
        const {
            openEdit,
            editHandle,
            fName,
            lName,
            hPhone,
            mPhone,
            wPhone,
            email,
            city,
            stateProvince,
            pCode,
            country,
            handleUpdate
        } = this.props
        return (
            <Dialog
                open={openEdit}
                onClose={editHandle}
                scroll="body"
                TransitionComponent={Transition}
            >
                <DialogTitle>Edit Contact Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Test
                    </DialogContentText>
                    <form onSubmit={this.submitEdit}>
                        <TextField
                                autoFocus
                                required
                                fullWidth
                                label="First Name"
                                value={fName}
                                name="fName"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={lName}
                                name="lName"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="Home Phone"
                                value={hPhone.replace(/[^0-9]/g, '')}
                                name="hPhone"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="Mobile Phone"
                                value={mPhone.replace(/[^0-9]/g, '')}
                                name="mPhone"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="Work Phone"
                                value={wPhone.replace(/[^0-9]/g, '')}
                                name="wPhone"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                value={email}
                                name="email"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="City"
                                value={city}
                                name="city"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="State or Province"
                                value={stateProvince}
                                name="stateProvince"
                                onChange={handleUpdate}
                            />
                            <TextField
                                fullWidth
                                label="Country"
                                value={country}
                                name="country"
                                onChange={handleUpdate}
                            />
                            <TextField
                                type="number"
                                label="Postal Code"
                                value={pCode}
                                name="pCode"
                                onChange={handleUpdate}
                            />
                        <DialogActions>
                            <Button
                                onClick={editHandle}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
}