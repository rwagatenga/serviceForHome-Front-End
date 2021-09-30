import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab';
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
import Danger from '../Typography/Danger';

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
}));

function ProfileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();
  //const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const data = [];
  data.push({...props.subService[0]});
  const [values, setValues] = React.useState({
    serviceId: '',
    subServiceId: '',
    price: '',
    duration: '',
    description: ''
  });
  const [serviceId, setServiceId] = React.useState('');
  const [subServiceId, setSubServiceId] = React.useState('');
  React.useEffect(() => {
    setServiceId('');
    setSubServiceId('');
    setValues({
      subServiceId: '',
      price: '',
      duration: '',
      description: '',
    });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleServiceChange = (event) => {
    let findService = props.service.find((item) => item._id === event.target.value);
    setServiceId(findService._id);
    //setValues({serviceId: findService._id});
  };
  const handleSubServiceChange = (event) => {
    let findSubService = data.find((item) => item._id === event.target.value);
      setSubServiceId(findSubService._id);
      setValues({subServiceId: findSubService._id});
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,16);
  });
  const createOrder = (event, inputs) => {
    event.preventDefault();
    const data = {
      ...inputs.orderInputs, 
      serviceId: inputs.serviceId.toString(), 
      subServiceId: inputs.subServiceId.toString()
    }
    props.createOrder(event, {...data});
    if (!props.error && props.orderSuccess) {
      setValues({
        subServiceId: '',
        price: '',
        duration: '',
        description: '',
      });
      setServiceId('');
      setSubServiceId('');
    }
  };

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
            Dear Sir {props.firstName} Fill This Form To Order Your Service
          </div>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.error ? (
              <table>
                <tr>
                  <td align="left">Error: </td>
                  <td align="right"><Danger><b style={{fontSize: 16}}>{props.error}</b></Danger></td>
                </tr>
              </table>
            ) : null }
            <form onSubmit={e => createOrder(e, {
                orderInputs: values,
                serviceId: props.service.map(item => item._id),
                subServiceId: props.subService.map(item => item._id)
              })
            }>
            {props.loading ? (<Backdrop open={props.loading} clicked={props.onCancel} />) : null } 
              <Grid item className="gridItem" xs={6}>
                <FormControl className={classes.formControl}>
                  <TextField 
                    id="price" 
                    label="Estimated Price" 
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
                    min={new Date().toDateInputValue()}
                    defaultValue={new Date().toDateInputValue()}
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
                    onChange={handleChange('description')}
                    value={values.description}
                    name="description"/>
                </FormControl>
              </Grid><br/><br/>
              <Button type = "submit" variant="contained" className={props.color} loading={props.loading}>
                Order
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
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchServices: () => dispatch(actions.initServices()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);