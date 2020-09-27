import React from 'react';
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

export default function dialog(props) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={props.clickOpen}>
        Slide in alert dialog
      </Button>*/}
      <Dialog
        open={props.openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.clickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Terms and Agreement"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Dear Sir <b>Name</b>, Here are terms and agreement you have to agree so that we can work together.<br/>Do you agree, will you:<br/><b><i>1. Pay service fee (500frw) on any job request we will give you?<br/>2. Provide a good service to the customers we will give you?<br/>3. Always try to do not expose high price to the clients we will give you?<br/>4. Always try to be on time to respond clients request?<br/></i></b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={props.errors? props.onCancelModal : props.clickDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={props.errors? props.onHandle : props.clickAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

