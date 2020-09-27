import React from "react";

import { connect } from 'react-redux'
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
import OrdersTable from "components/Table/OrdersTable.js";
// import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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

function ViewOrders(props) {
  const classes = useStyles();
  React.useEffect(() => {
    props.onFetchOrders(props.userId);
  }, []);

  // const handleServiceChange = (event) => {
  //   let findService = stateData.services.find((item) => item._id === event.target.value);
  //   setServiceId(findService._id);
  //   setSubServiceId(findService.subServiceId);
  // };
  const createBidHandler = (event, data) => {
    event.preventDefault();
    const orderId = data.orderId;
    const workerId = props.userId; 
    const bidInput = {
      price: data.price, 
      duration: data.duration, 
      description: data.description
    };
    props.onCreateBid(orderId, workerId, bidInput);
  };
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Orders</h4>
            <p className={classes.cardCategoryWhite}>
              Click to View its Description 
            </p>
          </CardHeader>
          <CardBody>
          {props.error ? (<ErrorHandler 
            error={props.error} 
            onHandle={props.onCancel} 
          />) : null }
            <OrdersTable
              tableHeaderColor="primary"
              tableHead={["ID", "Names", "Service", "Sub-Service", "Min-Price", "Address", "Created At", "Duration", "Action"]}
              tableSubHead={["Description"]}
              //tableData={stateData.services}
              tableTest={props.orders}
              colors={classes.button}
              adminView = "admin"
              createBid = {createBidHandler}
              loading = {props.loading}
              error={props.bidError}
              bidSuccess={props.bidSuccess}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = state => {
    return {
        loading: state.bid.loading,
        error: state.order.error,
        bidError: state.bid.createBidError,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        services: state.service.services,
        userId: state.auth.userId,
        orders: state.order.orders,
        bidSuccess: state.bid.createdBidSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.auth( email, password ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchOrders: (userId) => dispatch(actions.initOrders(userId)),
        onCreateBid: (orderId, workerId, inputs) => dispatch(actions.createBid(orderId, workerId, inputs)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);