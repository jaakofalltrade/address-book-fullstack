import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class ViewDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            contactData,
            openDial,
            closeDial,
        } = this.props
        return (
            <Dialog
                TransitionComponent={Transition}
                open={openDial}
                onClose={closeDial}
            >
                <DialogTitle>{`${contactData.fname} ${contactData.lname}`}</DialogTitle>
                <DialogContent>
                    <Typography>{`Home Phone: ${contactData.home_phone}`}</Typography>
                    <Typography>{`Work Phone: ${contactData.work_phone}`}</Typography>
                    <Typography>{`Mobile Phone: ${contactData.mobile_phone}`}</Typography>
                    <Typography>{`Email: ${contactData.email}`}</Typography>
                    <Typography>{`City: ${contactData.city}`}</Typography>
                    <Typography>{`State/Province: ${contactData.state_or_province}`}</Typography>
                    <Typography>{`Postal Code: ${contactData.postal_code}`}</Typography>
                    <Typography>{`Country: ${contactData.country}`}</Typography>
                    <DialogActions>
                        <Button onClick={closeDial}>
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}