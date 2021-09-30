import React from 'react';import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  provinces,
  districts,
  sectors,
  // cells,
  //country,
} from "../../address/addresses";
import Backdrop from '../backdrop/backdrop';
import Dialog from '../backdrop/dialog';
import './auth.css';
import Login from './Login';
import App from '../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
      fontWeight: 500
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '20ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const sexy = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];
const userTypes = [
  {
    value: 'Client',
    label: 'Client',
  },
  {
    value: 'Worker',
    label: 'Worker',
  },
];
function getSteps() {
  return ['Personal Information', 'Address/Location', 'Confirm an Account'];
}

export default function Signup(props) {
  const classes = useStyles();
  const [stateOpen, setOpen] = React.useState({
    open: false,
    auth: false,
    openDialog: false,
    dialog: false,
    isAuth: false
  });
  const [checked, setChecked] = React.useState(false);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  // const [userInput, setUserInput] = React.useReducer(
  //   (state, newState) => ({...state, ...newState}),
  //   {
  //     firstName: '',
  //     lastName: '',
  //   }
  // );
  const [userInput, setUserInput] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sex: "",
    email: "",
    userType: "",
    negotiate: "",
    price: ""
  });
  const [serviceId, setServiceId] = React.useState("");
  const [subServiceId, setSubServiceId] = React.useState([]);
  const [subService, setSubService] = React.useState([]);
  const [province, setProvince] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [sector, setSector] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [stateData, setData] = React.useState({
    stateErrors: [],
    stateResults: [],
    services: [],
    subServices: [],
  });
  const [stateErrors, setErrors] = React.useState([]);
  const [stateResults, setResults] = React.useState([]);
  let dataError = [];
  let serviceData= []
  const API_URL = 'http://localhost:8080/graphql';

  React.useEffect(() => {
    const serviceQuery = {
      query: ` 
        {
          viewServices {
            services {
              _id
              serviceName
              subServiceId {
                _id
                subServiceName
              }
            }
          }
        }
      `
    };
    async function getServices () {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceQuery)
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (!resData.data) {
          dataError.push({message: "Check your Internet Connection Services not Found"});
          setData(stateErrors.concat(dataError));
          throw new Error('Service Not Available!');
        }
        setData({
          services: resData.data.viewServices.services
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
    getServices();
  }, []);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // const handleSexChange = (event) => {
  //   setSex(event.target.value);
  // };
  const handleProvinceChange = (event) => {
    let findProvince = provinces.find((item) => item.province_id === +event.target.value);
    setProvince(findProvince);
  };
  const handleDistrictChange = (event) => {
    let findDistrict = districts.find((item) => item.district_id === +event.target.value);
    setDistrict(findDistrict);
  };
  const handleSectorChange = (event) => {
    let findSector = sectors.find((item) => item.sector_id === +event.target.value);
    setSector(findSector);
  };
  const handleServiceChange = (event) => {
    let findService = stateData.services.find((item) => item._id === event.target.value);
    setServiceId(findService._id);
    setSubServiceId(findService.subServiceId);
  };
  const handleSubServiceChange = (id, event) => {
    let array = [];
    if (event.target.checked) {
      let findSubService = subServiceId.find((item) => item._id === event.target.value);
      array.push(findSubService._id)
      setSubService(subService.concat(...array));
      //console.log("Sub", subService);
    } else {
      setSubService(subService.filter((item) => item !== id));
      //console.log("SubS", subService);
    }  
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    // setUserInput({[name]: newValue});
    setUserInput({
      ...userInput,
      [name]: newValue
    });
  }
  const handleClose = () => {
    setOpen({
      open: false,
    });
  };
  const submitData = async (event) => {
    props.onSignUp(event, {
      token: userInput.email,
      experesIn: userInput.email,
      serviceId: serviceId,
      subServiceId: subService,
      userInputs: userInput,
      province: province.province_name,
      district: district.district_name,
      sector: sector.sector_name,
      password: values.password
    })
    // event.preventDefault();
    // if (stateErrors && stateErrors.length > 0) {
    //   stateErrors.length = 0;
    // }
    // if (stateResults && stateResults.length > 0) {
    //   stateResults.length = 0;
    // }
    
    // dataError.length = 0;
    
    // setOpen({
    //   open: true
    // });
    // if (userInput.userType === "Client") {

    //   const graphqlQuery = {
    //     query: `
    //       mutation createUser($firstName: String!, $lastName: String!, $sex: String!, $telephone: String!, $email: String!, $password: String!, $userType: String!, $address: Address!) {
    //         createUser(userInput: {firstName: $firstName, lastName: $lastName, sex: $sex, telephone: $telephone, email: $email, password: $password, userType: $userType, address: $address }) {
    //           _id
    //           firstName
    //           lastName
    //           telephone
    //           email
    //           userType
    //           address {
    //             province
    //             district
    //             sector
    //           }
    //         }
    //       }`,
    //       variables: {
    //         firstName: userInput.firstName, 
    //         lastName: userInput.lastName, 
    //         sex: userInput.sex, 
    //         telephone: userInput.phoneNumber, 
    //         email: userInput.email, 
    //         password: values.password, 
    //         userType: userInput.userType,
    //         address: {
    //           province: province.province_name, 
    //           district: district.district_name, 
    //           sector: sector.sector_name
    //         }
    //       }
    //     };
    //     fetch(API_URL, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(graphqlQuery)
    //     })
    //     .then(res => {
    //       return res.json();
    //     })
    //     .then(resData => {
    //       if (resData.errors && resData.errors[0].status === 422) {
    //         // throw new Error(
    //         //   "Validation failed. Make sure the email address isn't used yet!"
    //         // );
    //         setOpen({
    //           open: false
    //         });
    //         dataError.push(...resData.errors[0].data);
    //         setErrors(stateErrors.concat(dataError));
            
    //       }
          
    //       if (resData.errors) {
    //         setOpen({
    //           open: false
    //         });
    //         if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g) && !resData.data) {
    //           setOpen({
    //             open: false
    //           });
    //           dataError.push({message: "Check your Internet Connection"});
    //           setErrors(stateErrors.concat(dataError));
    //           throw new Error('User creation failed!');
    //         }
    //         dataError.push({message: resData.errors[0].message})
    //         setErrors(stateErrors.concat(dataError));

    //         throw new Error('User creation failed!');
    //       }
    //       setResults(stateResults.concat(resData.data.createUser));
    //       console.log(stateResults);
    //       setOpen({
    //         open: false,
    //         auth: true,
    //         openDialog: false,
    //         dialog: false,
    //         isAuth: false
    //       });
    //       setChecked(false);
    //       setValues({
    //         password: '',
    //         showPassword: false,
    //       });
    //       setUserInput({
    //         firstName: "",
    //         lastName: "",
    //         phoneNumber: "",
    //         sex: "",
    //         email: "",
    //         userType: "",
    //         negotiate: "",
    //         price: ""
    //       });
    //       setServiceId("");
    //       setSubServiceId([]);
    //       setSubService([]);
    //       setProvince('');
    //       setDistrict('');
    //       setSector('');
    //       setActiveStep(0);
    //       setData({
    //         stateErrors: [],
    //         stateResults: [],
    //         services: [],
    //         subServices: [],
    //       });
    //       setErrors([]);
    //       //setResults([]);
    //       // console.log(stateData.stateResults);
    //       // this.setState({ isAuth: false, authLoading: false });
    //       // props.history.replace('/');
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     //   // this.setState({
    //     //   //   isAuth: false,
    //     //   //   authLoading: false,
    //     //   //   error: err
    //     //   // });
    //     });
    // }
    // if (userInput.userType === "Worker") {
    //   setOpen({
    //     open: true
    //   });
    //   const graphqlQuery = {
    //     query: `
    //       mutation createUser($serviceId: ID!, $subServiceId: [ID!]!, $firstName: String!, $lastName: String!, $sex: String!, $telephone: String!, $email: String!, $password: String!, $userType: String!, $address: Address!, $priceTag: String, $negotiate: String) {
    //         createUser(serviceId: $serviceId, subServiceId: $subServiceId, userInput: {firstName: $firstName, lastName: $lastName, sex: $sex, telephone: $telephone, email: $email, password: $password, userType: $userType, address: $address, priceTag: $priceTag, negotiate: $negotiate }) {
    //           _id
    //           firstName
    //           lastName
    //           telephone
    //           email
    //           userType
    //           serviceId {
    //             _id
    //             serviceName
    //           }
    //           subServiceId {
    //             _id
    //             subServiceName
    //           }
    //           address {
    //             province
    //             district
    //             sector
    //           }
    //         }
    //       }`,
    //       variables: {
    //         serviceId: serviceId,
    //         subServiceId: subService,
    //         firstName: userInput.firstName, 
    //         lastName: userInput.lastName, 
    //         sex: userInput.sex, 
    //         telephone: userInput.phoneNumber, 
    //         email: userInput.email, 
    //         password: values.password, 
    //         userType: userInput.userType,
    //         address: {
    //           province: province.province_name, 
    //           district: district.district_name, 
    //           sector: sector.sector_name
    //         },
    //         price: userInput.price,
    //         negotiate: userInput.negotiate
    //       }
    //     };
    //     fetch(API_URL, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(graphqlQuery)
    //     })
    //     .then(res => {
    //       return res.json();
    //     })
    //     .then(resData => {
    //       if (resData.errors && resData.errors[0].status === 422) {
    //         setOpen({
    //           open: false
    //         });
    //         dataError.push(...resData.errors[0].data);
    //         setErrors(stateErrors.concat(dataError))
              
    //       }
    //       if (resData.errors) {
    //         if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g)) {
    //           setOpen({
    //             open: false
    //           });
    //           dataError.push({message: "Check your Internet Connection"});
    //           setErrors(stateErrors.concat(dataError));
    //           throw new Error('User creation failed!');
    //         }
    //         setOpen({
    //           open: false
    //         });
    //         dataError.push({message: resData.errors[0].message})
    //         setErrors(stateErrors.concat(dataError));

    //         throw new Error('User creation failed!');
    //       }
    //       setResults(stateResults.concat(resData.data.createUser));
            
    //       setOpen({
    //         open: false,
    //         auth: true,
    //         openDialog: false,
    //         dialog: false,
    //         isAuth: false
    //       });
    //       setChecked(false);
    //       setValues({
    //         password: '',
    //         showPassword: false,
    //       });
    //       setUserInput({
    //         firstName: "",
    //         lastName: "",
    //         phoneNumber: "",
    //         sex: "",
    //         email: "",
    //         userType: "",
    //         negotiate: "",
    //         price: ""
    //       });
    //       setServiceId("");
    //       setSubServiceId([]);
    //       setSubService([]);
    //       setProvince('');
    //       setDistrict('');
    //       setSector('');
    //       setActiveStep(0);
    //       setData({
    //         stateErrors: [],
    //         stateResults: [],
    //         services: [],
    //         subServices: [],
    //       });
    //       setErrors([]);
    //       console.log(stateResults);
    //       // console.log(stateData.stateResults);
    //       // this.setState({ isAuth: false, authLoading: false });
    //       // this.props.history.replace('/');
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         // this.setState({
    //         //   isAuth: false,
    //         //   authLoading: false,
    //         //   error: err
    //         // });
    //       });

    // }
    
  };

  //This is Step 1
const step1 = <Grid container spacing={1} alignItems="flex-end" className="gridAll">
          <Grid item className="gridItem">
            <TextField id="input-with-icon-grid" label="First Name" className="textField" InputProps={{className: "input"}} name="firstName" value={userInput.firstName} onChange={handleChangeInput}/>
        </Grid>
        <Grid item className="gridItem">
            <TextField id="input-with-icon-grid" label="Last Name" className="textField" InputProps={{className: "input"}} name="lastName" value={userInput.lastName} onChange={handleChangeInput}/>
        </Grid>
        <Grid item className="gridItem">
            <TextField id="input-with-icon-grid" label="Telephone" className="textField" InputProps={{className: "input"}} name="phoneNumber" value={userInput.phoneNumber} onChange={handleChangeInput} />
        </Grid>
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sex</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInput.sex}
              onChange={handleChangeInput}
              name="sex"
            >
              {sexy.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        </Grid>;

  // This is Step 2
const step2 = <Grid container spacing={1} alignItems="flex-end" className="gridAll">
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Province</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={province.province_id}
              onChange={handleProvinceChange}
              name="province"              
            >
              {provinces.map((option) => (
                <MenuItem key={option.province_id} value={option.province_id}>
                  {option.province_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Grid>
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleDistrictChange}
              value={district.district_id}
              name="district"
            >
              {districts.filter((item) => 
                item.province_id === province.province_id
              ).map((option) => (
                <MenuItem 
                  key={option.district_id}
                  value={option.district_id} >
                  <ListItemText primary={option.district_name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sector</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleSectorChange}
              value={sector.sector_id}
              name="sector"
            >
              {sectors.filter((item) => 
                item.district_id === district.district_id
              ).map((options) => (
                <MenuItem 
                  key={options.sector_id} 
                  value={options.sector_id}>
                  {options.sector_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">UserType</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInput.userType}
              onChange={handleChangeInput}
              name="userType"
            >
              {userTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <input type="hidden" name="latitude" value={userInput.latitude} onChange={handleChangeInput}/>
        <input type="hidden" name="longitude" value={userInput.longitude} onChange={handleChangeInput} />
        </Grid>;

  //This is Service and SubService Variable
  const service = <Grid container spacing={1} alignItems="flex-end" className="gridAll">
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
             <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleServiceChange}
              value={serviceId || ""}
              name="serviceId"
            >
              {stateData.services ? stateData.services.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.serviceName}
                </MenuItem>
              )) : null }
            </Select>
          </FormControl>
         
        </Grid>
        <Grid item className="gridItem">
          {serviceId ? subServiceId.map(item => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[item._id]}
                  onChange={e => handleSubServiceChange(item._id, e)}
                  name="subServiceId"
                  color="primary"
                  value={item._id}
                />
              }
              label={item.subServiceName}
            />)
          ) : null}
        </Grid>
        <Grid item className="gridItem">
            <TextField id="input-with-icon-grid" label="Intial Price" className="textField" InputProps={{className: "input"}} name="price" value={userInput.price} onChange={handleChangeInput}/>
        </Grid>
        <Grid item className="gridItem">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Negotiate</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInput.negotiate}
              onChange={handleChangeInput}
              name="negotiate"
              
            >
              <MenuItem value="Negotiable">
                  Negotiable
              </MenuItem>
              <MenuItem value="Not Negotiable">
                  Not Negotiable
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>;
  //This is Step 3
const step3 = <Grid container spacing={1} alignItems="flex-end" className="gridAll">
     
      {stateErrors ? <div style={{width: '100%', fontSize: '17px', color: 'red'}}> <ul>
          {stateErrors.map((err, key) => (
          <li key={key}>{err.message}</li>))}
      </ul> </div> : null }
      
          <Grid item className="gridItem">
            <TextField id="input-with-icon-grid" label="E-Mail" className="textField" InputProps={{className: "input"}} name="firstName" name="email" value={userInput.email} onChange={handleChangeInput}/>
        </Grid>
        

        {userInput.userType === "Worker" ? service : " " }
        <Grid item className="gridItem">
              <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item className="gridItem">
              <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                name="confirm_password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          { dataError ? dataError.map((key, err) => (
                  <Typography className="title" key={key} color="textSecondary" gutterBottom>
                    {alert(err)}
                  </Typography> 
                )
              ) : null
          }
          {userInput.userType === "Worker" ? (  
          <Typography className={classes.instructions}>Agree Terms and Conditions 
            <Button onClick={() => setOpen({openDialog: true })} color="primary" >View</Button>
          </Typography>
          

            ) 
      : null }
      </Grid>;
const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return (step1);
    case 1:
      return step2;
    case 2:
      return step3;
    default:
      return 'Unknown stepIndex';
  }
}
  if (stateOpen.auth) {
    return (<App />)
  } else {
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
        <Backdrop open={stateOpen.open} clicked={handleClose} />
        {stateOpen.openDialog ? 
          <Dialog 
            openDialog = {stateOpen.openDialog} 
            clickOpen={() => setOpen({openDialog: true }) }
            clickClose={() => setOpen({openDialog: false, dialog: false }) }
            clickDisagree={() => setOpen({openDialog: false, dialog: false})} 
            clickAgree={() => setOpen({openDialog: false, dialog: true})}
          /> : null
        }
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
            <form onSubmit={e =>
              props.onSignUp(e, {
                  token: userInput.email,
                  experesIn: userInput.email,
                  serviceId: serviceId,
                  subServiceId: subService,
                  userInputs: userInput,
                  province: province.province_name,
                  district: district.district_name,
                  sector: sector.sector_name,
                  password: values.password
                })
              }
            >
              <div>
                <div className="margin" spacing={1}>
                  {getStepContent(activeStep)}
                </div>
              </div><br/>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" disabled = {userInput.userType === "Worker" && activeStep === steps.length - 1 && !stateOpen.dialog} onClick={activeStep === steps.length - 1 ? submitData : handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
