import React from "react";

import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from "components/Table/Table.js";
// import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// Import Files
import * as actions from '../../store/actions/index';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';


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

function ViewServices(props) {
  const classes = useStyles();
  React.useEffect(() => {
    props.onFetchServices();
      // props.onFetchFirebase();
  }, [props.transactionId]);
  // const firebaseData = React.useMemo(() => {
  //   return props.onFetchFirebase();
  // }, [props.firebase])
  // setTimeout(() => {
  //     props.onFetchFirebase();
  // }, 10000);
  const createOrderHandler = (event, data) => {
    event.preventDefault();
    props.onCreateOrder(props.userId, data);
  }
  const createCartHandler = (ev, cartInputs) => {
    ev.preventDefault();
    props.onCreateCart(props.userId, cartInputs);
  };
  console.log("OPAY", props.opay)
  console.log("FIREBASE", props.firebase)
  console.log("TRANSACTIONI ID", props.transactionId)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Services</h4>
            <p className={classes.cardCategoryWhite}>
              Click to View its Sub-Services 
            </p>
          </CardHeader>
          <CardBody>
          {props.errors ? (<ErrorHandler 
            error={props.error} 
            onHandle={props.onCancel} 
          />) : null }
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Service Name"]}
              tableSubHead={["ID", "Sub-Service Name", "Min-Price", "Action"]}
              //tableData={props.services}
              tableTest={props.services}
              colors={classes.button}
              adminView = "admin"
              createOrder = {createOrderHandler}
              createCart = {createCartHandler}
              loading = {props.loading}
              error={props.orderError}
              cartError={props.cartError}
              orderSuccess={props.orderSuccess}
              orderClose={() => props.onOrderClose()}
              cartSuccess = {props.cartSuccess}
              load = {props.loadings}
              cartClose={() => props.onCartClose()} 
            />
          </CardBody>
        </Card>
      </GridItem>
      {/*<GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              List of Service and Sub-Service
            </h4>
            <p className={classes.cardCategoryWhite}>
              Select a Service in Text Field below to see its Sub Services on a Table
            </p>
          </CardHeader>
          <Grid item className="gridItem">
          {stateData.services ? (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
             <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleServiceChange}
              value={serviceId || ""}
              name="serviceId"
            >
               {stateData.services.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.serviceName}
                </MenuItem>
              )) }
            </Select>
          </FormControl> ) : null }
         
        </Grid>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Sub-Service Name", "Min-Price", "Order", "Action"]}
              tableDatas={subServiceId} 
              colors={classes.button} />
          </CardBody>
        </Card>
      </GridItem>*/}
    </GridContainer>
  );
}
const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        loadings: state.cart.loading,
        error: state.service.error,
        errors: state.cart.carts,
        orderError: state.order.createOrderError,
        cartError: state.cart.createCartError,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        services: state.service.services,
        cartSuccess: state.cart.createdCart,
        orderSuccess: state.order.createdOrder,
        opayLoading: state.order.opayLoading,
        opayError: state.order.opayError,
        opay: state.order.opay,
        firebase: state.order.firebase, 
        firebaseLoading: state.order.firebaseLoading, 
        firebaseError: state.order.firebaseError,
        transactionId: state.order.transactionId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.auth( email, password ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchServices: () => dispatch(actions.initServices()),
        onCreateOrder: (clientId, inputs) => dispatch(actions.createOrder(clientId, inputs)),
        onOrderClose: () => dispatch(actions.orderClose()),
        onCreateCart: (clientId, cartInputs) => dispatch(actions.createCart(clientId, cartInputs)),
        onCartClose: () => dispatch(actions.cartClose()),
        onOpaySuccess: () => dispatch(actions.opaySuccess()),
        onOpayFail: () => dispatch(actions.opayFail()),
        onFirebaseFail: () => dispatch(actions.firebaseFail()),
        onFirebaseSuccess: () => dispatch(actions.firebaseSuccess()),
        onFetchFirebase: () => dispatch(actions.initFirebase())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewServices);