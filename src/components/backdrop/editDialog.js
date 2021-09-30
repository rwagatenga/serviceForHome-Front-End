import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import rwandaStrings from 'react-timeago/lib/language-strings/rw'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
// Import Files
import * as actions from '../../store/actions/index';
import Backdrop from './backdrop';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Dialogs from './dialog';
import Danger from "components/Typography/Danger.js";
import Warning from "components/Typography/Warning.js";
import Info from "components/Typography/Info.js";


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
  formControl: {
    marginTop: '10px',
    minWidth: '25ch',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  roots: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  color: {
    backgroundColor: '#0E3D51',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0E3D51',
      color: 'white'
    }
  }
}));

export default function ProfileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const theme = useTheme();
  const classes = useStyles();
  //const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [values, setValues] = React.useState({
    price: props.order.price,
    duration: props.order.duration,
    description: props.order.description,
  });
  const [serviceId, setServiceId] = React.useState('');
  const [subServiceId, setSubServiceId] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOrderChange = (event) => {
  //   let findOrder = props.order.find((item) => item._id === event.target.value);
  //   setServiceId(findService._id);
  //   //setValues({serviceId: findService._id});
  // };
  // const handleSubServiceChange = (event) => {
  //   let findSubService = data.find((item) => item._id === event.target.value);
  //     setSubServiceId(findSubService._id);
  //     setValues({subServiceId: findSubService._id});
  // };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,16);
  });
  const formatter = buildFormatter(englishStrings)
  
  const updateCart = (event, inputs) => {
    event.preventDefault();
    setError('');
    const data = {...inputs.bidInputs, serviceId: inputs.serviceId, subServiceId: inputs.subServiceId };
    if (data.price == null) {
      setError('Please Change Price Field it is still has a default value');
    } else if( data.duration == null) {
      setError('Please Change Duration Field, it is still has a default value');
    } else if(data.description == null) {
      setError('Please Change Description Field, it is still has a default value');
    } else {
      props.updateCart(event, {...data});
      if (!props.error && props.cartSuccess) {
        setValues({
          price: '',
          duration: '',
          description: '',
        });
      } 
    }
  };

  if (props.order && props.open) {
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
              Update Your Cart, no Field will has a Default Value
            </div>
            </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.loading ? (<Backdrop open={props.loading} clicked={props.onCancel} />) : null }

              {props.error || error ? (
                <table>
                  <tr>
                    <td align="left">Error: </td>
                    <td align="right"><Danger><b style={{fontSize: 16}}>{props.error ? props.error : error}</b></Danger></td>
                  </tr>
                </table>
              )  : null }
              <form onSubmit={e =>
                updateCart(e, {
                    bidInputs: values,
                    serviceId: props.order.serviceId[0]._id,
                    subServiceId: props.order.subServiceId[0]._id
                  })
                }
              >
                <Grid item className="gridItem" xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField 
                      id="price"
                      placeholder={props.order.price}                 
                      label="What is your Estimated Price" 
                      name="price"
                      onChange={handleChange('price')}
                      value={values.price}                
                      //placeholder={data.map(item => item.price)}
                    />
                    <FormHelperText id="component-helper-text">Must be a Number</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item className="gridItem" xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="datetime-local"
                      label="Date and Time"
                      type="datetime-local" 
                      placeholder={props.order.duration}
                      defaultValue={props.order.duration}
                      onChange={handleChange('duration')}
                      value={values.duration}
                      name="duration"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item className="gridItem" xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField 
                      id="description" 
                      label="description" 
                      placeholder="Description"
                      multiline
                      placeholder={props.order.description}  
                      onChange={handleChange('description')}
                      value={values.description}
                      name="description"/>
                  </FormControl>
                </Grid><br/><br/>
                <Button type = "submit" variant="contained" className={classes.color} loading={props.loading}>
                  Update
                </Button>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/*<Button autoFocus onClick={props.close} color="primary">
              Disagree
            </Button>*/}
            <Button onClick={props.close} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}

// const mapStateToProps = state => {
//     return {
//         loading: state.bid.loading,
//         firstName: state.auth.firstName,
//         lastName: state.auth.lastName,
//         userId: state.auth.userId,
//         error: state.bid.error,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onCancel: () => dispatch( actions.onCancel() ),
//         onCreateBid: (orderId, workerId, inputs) => dispatch(actions.createBid(orderId, workerId, inputs))
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);