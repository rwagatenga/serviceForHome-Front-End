import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CongzDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [copy, setCopy] = React.useState(false);
  const [value, setValue] = React.useState(props.tel);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>*/}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Thank You. Congratulation !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.bid ? (
              <span style={{fontSize: 16}}>Your Bid has been Submitted</span>
            ): props.order ? (
              <span style={{fontSize: 16}}>Your Order has been Submitted</span>
            ) : props.cart  ? (
              <span style={{fontSize: 16}}>Your Order has been added to Your Cart</span>
            ) : props.carts  ? (
              <span style={{fontSize: 16}}>Your Cart has been Updated</span>
            ) : props.delete  ? (
              <span style={{fontSize: 16}}>Your Cart has been Deleted Successful</span>
            ) : null}
            {props.accept ? ([
              <span style={{fontSize: 16}}>Contacts:&nbsp;</span>,
              <a href={`tel:${value}`}>
                <span>{value}</span>
              </a>,
              <span>&nbsp;&nbsp;&nbsp;</span>,
              <CopyToClipboard text={value}
                onCopy={() => setCopy(true)}>
                <FileCopyIcon />
              </CopyToClipboard>,
              copy ? <span style={{color: 'blue'}}>Copied.</span> : null
            ]) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*<Button onClick={handleClose} color="primary">
            Disagree
          </Button>*/}
          <Button onClick={props.close} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}