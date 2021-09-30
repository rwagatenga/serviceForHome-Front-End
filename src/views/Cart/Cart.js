import React from "react";

import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// import files
import avatar from "assets/img/faces/marc.jpg";
import CartTable from '../../components/Table/CartTable';
import CartTables from '../../components/Table/CartTables';
import * as actions from '../../store/actions/index';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import CongzDialog from '../../components/backdrop/congzDialog';
import Backdrop from '../../components/backdrop/backdrop';
import Buttons from '../../components/Button/Buttons';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
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
    fontSize: "18px",
    lineHeight: "18px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "280px"
  },
};

const useStyles = makeStyles(styles);

function Cart(props) {
  const classes = useStyles();
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
     // const id = setInterval(() => {
      props.onFetchCarts(props.userId); // This effect depends on the `count` state
    // }, 1000);
    // return () => clearInterval(id);
  }, []);

  var sum = 0;
  const array = [];
  // test.map(item => array.push(...item.subServiceId));
  // for (var i = 0; i < array.length; i++) {
  //   sum += parseInt(array[i].price);
  // }
  const updateCartHandler = (ev, dataInputs) => {
    ev.preventDefault();
    const cartId = {...props.carts};
    const cartInputs = {
      ...dataInputs,
      clientId: props.userId,
    };
    props.onUpdateCart(cartId[0]._id, cartInputs);
  };
  const deleteCartHandler = (serviceId, subServiceId) => {
    const clientId = props.userId;
    const cartId = {...props.carts};
    props.onDeleteCart(clientId, cartId[0]._id, serviceId, subServiceId);
  };
  const orderCart = (carts) => {
    if (carts) {
      props.onCartOrder(props.userId, carts[0]._id);
      setRefresh(true);
    }
  };
  const orderClose = () => {
    setRefresh(false);
    props.onOrderClose();
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Service added to Cart</h4>
              <p className={classes.cardCategoryWhite}>Those are Service and its Sub-Services added to Cart</p>
            </CardHeader>
            <CardBody>
            {props.loadings ? (<Backdrop open={props.loadings} clicked={props.onCancel}/>) : null}
            {props.orderSuccess ? (
              <CongzDialog
                open={props.orderSuccess}
                close={orderClose}
                order={props.orderSuccess}
              />
            ) : null}
            {props.orderError ? (
              <ErrorHandler error={props.error ? props.error : props.orderError} onHandle={props.error ? (() => props.onCancel()) : (() => props.onOrderClose())} />
            ) : null}
              {props.carts ? (<CartTable
                tableHeaderColor="primary"
                tableHead={["ID", "Service Names", "Sub-Service Name", "Price", "Duration", "Action"]}
                tableSubHead={["Description"]}
                tableData={props.orders}
                colors={classes.button}
                updateCart = {updateCartHandler}
                error={props.cartError}
                loading={props.loading}
                cartSuccess={props.cartSuccess}
                cartClose={() => props.onCartClose()} 
                deleteCart={deleteCartHandler}
              />) : null }
              {/*<GridContainer>
                <table style={{fontSize: '16px'}}>
                  <tbody>
                    <tr>
                      <th>#No</th>
                      <th>Service Name</th>
                      <th> </th>
                      <th>Sub-Service Name</th>
                      <th> </th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                    {test.map((item, key) => ([
                        <tr key={key}>
                          <td>{key+1}.</td>
                          <td rowspan="1"><b>{item.serviceName}</b></td>
                          <td> </td>
                          {item.subServiceId.map((prop, index) => (
                              <tr key={index}>
                                <td align="right">{index+1}.</td>
                                <td><i>{prop.subServiceName}</i></td>
                                <td> </td>
                                <td>{prop.price}</td>
                                <td align="right">
                                <Button>
                                  <EditIcon/>
                                </Button>
                                <Button>
                                  <EditIcon/>
                                </Button>
                                </td>
                              </tr>
                            )
                          )}
                        </tr>,
                        <tr>
                          <td> </td>
                          <td rowspan="1"> </td>
                          <tr>
                            <td> </td>
                            <td> </td>
                          </tr>
                        </tr>,
                        <tr>
                          <td> </td>
                          <td rowspan="1"> </td>
                          <tr>
                            <td> </td>
                            <td> </td>
                          </tr>
                        </tr>
                      ])
                    )}
                  </tbody>
                </table>
              </GridContainer>*/}
              {/*<div className={classes.typo}>
                <div className={classes.note}>Minimum Pay: </div>
                <h5>{sum} frw</h5>
              </div>*/}
            </CardBody>
            <CardFooter>
              {(props.carts != "undefined"  
                && props.carts != null  
                && props.carts.length != null  
                && props.carts.length > 0) ? (
                <Buttons 
                  color="primary" 
                  orderCart={orderCart}
                  orders={props.orders}
                  carts={props.carts}
                  disable={(props.orders == "undefined"  
                  && props.orders == null  
                  && props.orders.length == null  
                  && props.orders.length == 0)}
                />
              ) : null }
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      loadings: state.order.loading,
      orderError: state.order.createOrderError,
      orderSuccess: state.order.createdOrder,
      loading: state.cart.loading,
      error: state.cart.error,
      cartError: state.cart.createCartError,
      userId: state.auth.userId,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath,
      cartSuccess: state.cart.createdCart,
      carts: state.cart.carts,
      orders: state.cart.orders,
      order: state.order.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchCarts: (clientId) => dispatch(actions.initCarts(clientId)),
        onCreateCart: (clientId, cartInputs) => dispatch(actions.createCart(clientId, cartInputs)),
        onUpdateCart: (cartId, cartInputs) => dispatch(actions.updateCart(cartId, cartInputs)),
        onCartClose: () => dispatch(actions.cartClose()),
        onOrderClose: () => dispatch(actions.orderClose()),
        onDeleteCart: (clientId, cartId, serviceId, subServiceId) => dispatch(actions.deleteCart(clientId, cartId, serviceId, subServiceId)),
        onCartOrder: (clientId, cartId) => dispatch(actions.cartOrder(clientId, cartId))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);