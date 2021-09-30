import React from "react";

import { connect } from 'react-redux';
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import rwandaStrings from 'react-timeago/lib/language-strings/rw'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
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
import BidsTable from "components/Table/BidsTable.js";
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
    minWidth: '30ch',
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

function ViewBids(props) {
  const classes = useStyles();
  const [serviceId, setServiceId] = React.useState("");
  const [subServiceId, setSubServiceId] = React.useState([]);
  const [orderId, setOrderId] = React.useState("");

  const initData = [];
  React.useEffect(() => {
    props.onFetchOrders(props.userId, props.userId);
  }, [props.bidSuccess]);

  const handleServiceChange = (event) => {
    let findBid = props.orders.find((item) => item._id === event.target.value);
    setOrderId(findBid._id);
  };
  const formatter = buildFormatter(englishStrings)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Bids</h4>
            <p className={classes.cardCategoryWhite}>
              Select Your Recently Service you requested
            </p>
          </CardHeader>
          <CardBody>
            <Grid item className="gridItem">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Recently Service Request</InputLabel>
                <Select
                  labelId="Recently Service Request"
                  id="service"
                  onChange={handleServiceChange}
                  value={orderId}
                  name="serviceId"
                >
                {props.orders ? props.orders.map(item => (
                  <MenuItem key={item._id} value={item._id} >
                      {item.subServiceId.map(prop => prop.subServiceName)}&nbsp;&nbsp; <TimeAgo date={item.createdAt} formatter={formatter} />
                  </MenuItem>
                  )
                ) : null }
                </Select>
              </FormControl>
            </Grid>
            <BidsTable
              tableHeaderColor="primary"
              tableHead={["ID", "Names", "Price", "Created At", "Duration", "Action"]}
              tableSubHead={["Description"]}
              //tableData={props.bids}
              //tableTest={props.bids}
              colors={classes.button}
              adminView = "admin"
              orderId = {orderId}
              bidError={props.error}
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
        loading: state.auth.loading,
        error: state.order.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        services: state.service.services,
        userId: state.auth.userId,
        orders: state.order.orders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.auth( email, password ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchOrders: (userId, youId) => dispatch(actions.yourOrders(userId, youId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewBids)