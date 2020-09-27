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
import CartTables from '../../components/Table/CartTables';
import * as actions from '../../store/actions/index';

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
  const [test, setTest] = React.useState([
    {
      _id: "da3223",
      serviceName: "Massage",
      subServiceId: [
        {
          _id: "dah3892",
          subServiceName: "Reflexology",
          price: "5000"
        },
        {
          _id: "dah3899",
          subServiceName: "Swedish",
          price: "5000"
        },
        {
          _id: "dah3899",
          subServiceName: "Swedish",
          price: "5000"
        }
      ]
    },
    {
      _id: "da3245",
      serviceName: "Cleaning",
      subServiceId: [
        {
          _id: "dah7792",
          subServiceName: "Garden",
          price: "5000"
        },
        {
          _id: "dah78882",
          subServiceName: "Mopping",
          price: "5000"
        }
      ]
    }
  ]);
  React.useEffect(() => {
    props.onFetchCarts(props.userId);
  //   setTest(props.carts.orders.map(item => (
  //     [item.serviceId.map(prop => (
  //       [{_id: prop._id, serviceName: prop.serviceName, subServiceName: [item.subServiceId.map(sub => (
  //         [{_id: sub._id, subServiceName: sub.subServiceName}]
  //         )
  //       )]
  //     }]
  //   )
  // )]
  // )));
  }, []);
  var sum = 0;
  const array = [];
  test.map(item => array.push(...item.subServiceId));
  for (var i = 0; i < array.length; i++) {
    sum += parseInt(array[i].price);
  }
  console.log(sum);
  // const order = [];
  // if (props.carts.length > 0) {
  //   props.carts.map(item => order.push(...item.orders));
  // }
  const updateCartHandler = (ev, dataInputs) => {
    ev.preventDefault();
    const cartId = dataInputs.cartId;
    const cartInputs = {
      clientId: props.userId,
      serviceId: dataInputs.serviceId,
      subServiceId: dataInputs.subServiceId,
      price: dataInputs.price,
      duration: dataInputs.duration,
      description: dataInputs.description
    };
    props.onUpdateCart(cartInputs.cartId, cartInputs)
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
              <CartTables
                tableHeaderColor="primary"
                //tableHead={[{id: "ID", field: "id"}, {serviceName: "Service Name", "Action"]}
                tableSubHead={["ID", "Sub-Service Name", "Min-Price", "Order", "Action"]}
                tableData={props.carts}
                colors={classes.button}
                adminView = "admin"
                sub="subService"
                updateCart = {updateCartHandler}
              />
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
              <div className={classes.typo}>
                <div className={classes.note}>Minimum Pay: </div>
                <h5>{sum} frw</h5>
              </div>
            </CardBody>
            <CardFooter>
              <Button color="primary">Order</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        loading: state.cart.loading,
        error: state.cart.error,
        orderError: state.cart.createCartError,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        services: state.service.services,
        orderSuccess: state.order.createdOrder,
        carts: state.cart.carts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchCarts: (clientId) => dispatch(actions.initCarts(clientId)),
        onCreateCart: (clientId, cartInputs) => dispatch(actions.createCart(clientId, cartInputs)),
        onUpdateCart: (cartId, cartInputs) => dispatch(actions.updateCart(cartId, cartInputs))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);