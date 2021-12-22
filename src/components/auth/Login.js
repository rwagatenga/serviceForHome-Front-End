import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import FilledInput from '@material-ui/core/FilledInput';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import './auth.css';
// import Password from './Password';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
        // width: '100%',
        width: '30ch',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
  input: {
  	color: 'black',
  	width: '100%',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  // textField: {
  //   width: '30ch',
  // },
  button: {
  	backgroundColor: '#0E3D51',
  	color: 'white',
  	'&:hover': {
  	backgroundColor: '#0E3D51',
  	color: 'white'
  }
  },
}));

export default function InputWithIcon(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div className={classes.margin} >
      <form onSubmit={e =>
        props.onLogin(e, {
          	email: values.email,
          	password: values.password
          })
        }
      >
        <Grid container spacing={1} alignItems="flex-end" className="gridAll"
        >
          <Grid item className="grid"
          >
            <EmailOutlinedIcon />
          </Grid>
          <Grid item className="gridItem"
          >
          <TextField id="input-with-icon-grid" label="E-Mail" className={classes.textField} InputProps={{className: classes.input,
    }} name="firstName" name="email" value={values.email} onChange={handleChange('email')}/>
        </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" className="gridAll"
        >
          	<Grid item className="grid">
            	<LockOutlinedIcon />
          	</Grid>
	       	<Grid item className="gridItem">
	          	<FormControl className={clsx(classes.margin, classes.textField)}>
		          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
		          <Input
		            id="standard-adornment-password"
		            type={values.showPassword ? 'text' : 'password'}
		            value={values.password}
		            onChange={handleChange('password')}
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
	    </Grid><br/>
        <Button type = "submit" variant="contained" className={classes.button} loading={props.open}>
        SignIn
      </Button>
      </form>
      </div>
    </div>
  );
}