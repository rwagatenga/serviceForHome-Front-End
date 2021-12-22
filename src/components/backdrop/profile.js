import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ProfileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();
  //const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let sex = props.data.map(item => item.workerId.map(prop => prop.sex === 'Male' ? 'He' : 'She') );
  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>*/}
      <Dialog
        //fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        open={props.open}
        onClose={props.close}
        aria-labelledby="Profile Dialog"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className={classes.root}>
            <Avatar>{props.data.map(item => item.workerId.map(prop => ([prop.firstName.charAt(0)])) )}</Avatar>
            <Avatar>{props.data.map(item => item.workerId.map(prop => ([prop.lastName.charAt(0)])) )}</Avatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
          </div>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <b><i>Services { sex } can Provide are:</i></b> 
            <table>
              <tr>
                <th colspan="2">Service Name</th>
                <th colspan="2"> </th>
                <th colspan="2">Sub-Service Name</th>
              </tr>
              {props.data.map(item => item.workerId.map(prop => prop.serviceId.map((service, key) => (
                <tr key={key}>
                  <td align="left">{key+1}</td>
                  <td align="left" rowspan={prop.subServiceId.length}>{service.serviceName}</td>
                  <td> </td>
                  <td> </td>
                  <td>
                    {prop.subServiceId.map((sub, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{sub.subServiceName}</td>
                      </tr>
                    ))}
                  </td>
                </tr>) )))}
            </table>
          </DialogContentText>
          <DialogContentText>
          <b><i>Address:</i></b> {props.data.map(item => item.workerId.map(prop => ([prop.address.district, ", ", prop.address.sector])))}
          </DialogContentText>
          <DialogContentText>
          <b><i>Email:</i></b> {props.data.map(item => item.workerId.map(prop => prop.email))}
          </DialogContentText>
          <DialogContentText>
            <b><i><u>Note:</u>&nbsp; Accept {sex == 'He' ? 'His' : 'Her'} Bid to see {sex == 'He' ? 'His' : 'Her'} Contact Phone </i></b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*<Button autoFocus onClick={props.close} color="primary">
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