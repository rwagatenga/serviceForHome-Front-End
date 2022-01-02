import React from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from "@material-ui/core/FormHelperText";
import ServiceTable from "components/ServiceTable/ServiceTable.js";
import SubServiceTable from "components/ServiceTable/SubServiceTable.js";
// import Table from "@material-ui/core/Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Backdrop from 'components/backdrop/backdrop';

import * as actions from '../../store/actions/index';

const styles = {
  formControl: {
    marginTop: '10px',
    minWidth: '20ch',
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  button: {
    backgroundColor: '#0E3D51',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0E3D51',
      color: 'white'
    }
  }
};

const useStyles = makeStyles(styles);

const AddService = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    serviceName: "",
    subServiceName: "",
    price: "",
  })
  const [serviceId, setSerivice] = React.useState('')
  const dataError = [];

  React.useEffect(() => {
		props.onFetchServices();
  }, []);

  const handleInputChange = (prop) => (event) => {
    setState({...state, [prop]: event.target.value})
  }
  const handleAddService = (event, state) => {
    event.preventDefault();
    props.onCreateService(state.serviceName);
    if (!props.error && props.serviceSuccess) {
      setState({
        ...state, serviceName: ''
      });
    }
  };
  const handleServiceChange = (event) => {
    let findService = props.services.find((item) => item._id === event.target.value);
    setSerivice(findService._id);
    // setSubServiceId(findService.subServiceId);
  };
  
  const handleSubService = (ev, inputs) => {
    ev.preventDefault()
    const data = {
      serviceId: serviceId,
      subServiceName: state.subServiceName,
      price: state.price
    }
    props.onCreateSubService(data)
  }
  return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={6}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>Add Services</h4>
						{/*<p className={classes.cardCategoryWhite}>
              Click to View its Sub-Services 
            </p>*/}
					</CardHeader>
					<CardBody>
						<form
							onSubmit={(e) =>
								handleAddService(e, {
									serviceName: state.serviceName,
								})
							}>
							{props.loading ? (
								<Backdrop
									open={props.loading}
									clicked={props.onCancel}
								/>
							) : null}

							<Grid item className="gridItem" xs={12}>
								<FormControl className={classes.formControl}>
									<TextField
										id="serviceName"
										label="Enter Service Name"
										name="price"
										value={state.serviceName}
										onChange={handleInputChange(
											"serviceName"
										)}
									/>
								</FormControl>
							</Grid>
							<br />
							<Grid item className="gridItem" xs={6}>
								<Button
									type="submit"
									variant="contained"
									className={classes.button}>
									Save
								</Button>
							</Grid>
						</form>
					</CardBody>
				</Card>
			</GridItem>
			<GridItem xs={12} sm={12} md={6}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>
							Add Sub-Services
						</h4>
						{/*<p className={classes.cardCategoryWhite}>
              Click to View its Sub-Services 
            </p>*/}
					</CardHeader>
					<CardBody>
						<form
							onSubmit={(e) =>
								handleSubService(e, {
									serviceId: serviceId,
									serviceName: state.serviceName,
									price: state.price,
								})
							}>
							<Grid item className="gridItem" xs={12}>
								{props.services ? (
									<FormControl
										className={classes.formControl}>
										<InputLabel id="demo-simple-select-label">
											Service
										</InputLabel>
										<Select
											labelId="Service Name"
											id="serviceName"
											onChange={handleServiceChange}
											value={serviceId || ""}
											name="serviceId">
											{props.services.map((option) => (
												<MenuItem
													key={option._id}
													value={option._id}>
													{option.serviceName}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								) : null}
							</Grid>
							<Grid item className="gridItem" xs={12}>
								<FormControl className={classes.formControl}>
									<TextField
										id="subServiceName"
										label="Enter Sub-Service Name"
										name="subServiceName"
										value={state.subServiceName}
										onChange={handleInputChange(
											"subServiceName"
										)}
									/>
								</FormControl>
							</Grid>
							<Grid item className="gridItem" xs={12}>
								<FormControl className={classes.formControl}>
									<TextField
										id="price"
										label="Estimated Price"
										name="price"
										value={state.price}
										onChange={handleInputChange("price")}
									/>
									<FormHelperText id="component-helper-text">
										Must be a Number
									</FormHelperText>
								</FormControl>
							</Grid>
							<br />
							<Grid item className="gridItem" xs={6}>
								<Button
									type="submit"
									variant="contained"
									className={classes.button}>
									Save
								</Button>
							</Grid>
						</form>
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
  );
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        services: state.service.services,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchServices: () => dispatch(actions.initServices()),
        onCreateService: (service) => dispatch(actions.createService(service)),
        onCreateSubService: (inputs) => dispatch(actions.createSubService(inputs))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddService);