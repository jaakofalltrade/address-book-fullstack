import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class DeleteDialog extends Component {
    constructor() {
        super();
    }

    render() {
        const {
            dialogOpen,
            deleteClose,
            fname,
            lname,
            realDelete
        } = this.props;
        return (
            <Dialog
                TransitionComponent={Transition}
                open={dialogOpen}
                onClose={deleteClose}
            >
                <DialogTitle>{`Delete Contact`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Are you sure you want to delete "${fname} ${lname}" from your contact list?`}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteClose}>
                        Close
                    </Button>
                    <Button color="primary"
                        onClick={() => realDelete()}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}