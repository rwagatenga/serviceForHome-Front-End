import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import OrderDialog from '../backdrop/orderDialog';
import CartDialog from '../backdrop/cartDialog';
import CongzDialog from '../backdrop/congzDialog';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price, serviceName) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    serviceName,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState({
    stateOpen: false,
    stateId: ""
  });
  const [stateDialog, setDialog] = React.useState({
    openDialog: false,
    congzDialog: false
  });
  const [state, setState] = React.useState({
    services: [],
    subServices: []
  });
  const [id, setId] = React.useState("");
  const classes = useRowStyles();
  const handleCollapse = (item, event) => {
    if (item) {
      let coll = props.test.find((index) => index._id === item );
      if (coll) {
        setOpen({
          stateOpen: !open.stateOpen,
          stateId: item
        });
      } else {
        setOpen({
          stateOpen: open.stateOpen,
          stateId: ""
        });
      }
    }
    // props.test.find(clickedItem => clickedItem._id === item ? setOpen(!open) : null);
  };
  const cartDialogHandle = (service, event) => {
    if (service) {
      const serv = props.test.find((item) => item._id === service.service);
      
      const sub = serv.subServiceId.find((prop) => prop._id === service.subService);

    //   console.log("SubService:", sub);
      if (serv && sub) {
        setDialog({
          congzDialog: !stateDialog.congzDialog
        });
        setState({
          services: [serv],
          subServices: [sub]
        });
        setDialog({
          openDialog: !stateDialog.openDialog
        });
      }
    }
  };
  const handleDialog = (service, event) => {
    if (service) {
      const serv = props.test.find((item) => item._id === service.service);
      
      const sub = serv.subServiceId.find((prop) => prop._id === service.subService);

    //   console.log("SubService:", sub);
      if (serv && sub) {
        setState({
          services: [serv],
          subServices: [sub]
        });
        setDialog({
          openDialog: !stateDialog.openDialog
        });
      }
    }
  };
  const closeDialogHandle = () => {
    setDialog({
      openDialog: false
    });
    setDialog({
      congzDialog: false
    });

  };
  const orderHandler = (event, data) => {
    event.preventDefault();
    props.createOrder(event, {...data});
  };
  const orderClose = () => {
    props.orderClose();
    setDialog({openDialog: false})
  };
  const cartHandler = (event, data) => {
    event.preventDefault();
    props.createCart(event, {...data});
  };
  const cartClose = () => {
    props.cartClose();
    setDialog({openDialog: false});
    setDialog({cartDialog: false});
  }
  return (
    <React.Fragment>
      {state.services && state.subServices && !props.orderSuccess ? (
        <OrderDialog 
          open = {stateDialog.openDialog}
          close = {closeDialogHandle} 
          subService = {state.subServices}
          service = {state.services}
          color={props.color} 
          orderSuccess={props.orderSuccess}
          createOrder = {orderHandler}
          loading = {props.loading}
          error={props.error}  
        />) : props.orderSuccess ? (
        <CongzDialog
          open={props.orderSuccess}
          close={orderClose}
          order={props.orderSuccess}
        />
      ) : null}
      {state.services && state.subServices && !props.cartSuccess  && !stateDialog.cartDialog ? (
        <CartDialog 
          open = {stateDialog.openDialog}
          close = {closeDialogHandle} 
          subService = {state.subServices}
          service = {state.services}
          color={props.color} 
          cartSuccess={props.cartSuccess}
          createCart = {cartHandler}
          loading = {props.load}
          error={props.cartError}  
        />) : props.cartSuccess && !stateDialog.cartDialog ? (
        <CongzDialog
          open={props.cartSuccess}
          close={cartClose}
          cart={props.cartSuccess}
        />
      ) : null}
      {props.test.map((item, index) => ([
        <TableRow className={classes.root} key={index}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={e => handleCollapse(item._id)}>
              {open.stateOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {index+1}
          </TableCell>
          <TableCell>{item.serviceName}</TableCell>
          {/*<TableCell >
            <EditIcon onClick = {() => alert(item._id)} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <DeleteIcon onClick = {() => alert(item._id)} />
          </TableCell>*/}
        </TableRow>,
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {open.stateOpen && open.stateId === item._id ? (
            <Collapse in={open} timeout="auto" unmountOnExit id={id}>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Sub-Services
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {props.tableSubHead ? props.tableSubHead.map((prop, key) => (
                        <TableCell key={key}>{prop}</TableCell>
                      )) : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.subServiceId.map((prop, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {key+1}
                        </TableCell>
                        <TableCell>{prop.subServiceName}</TableCell>
                        <TableCell>{prop.price}</TableCell>
                        <TableCell className={classes.tableCell} key={key}>
                          <Button type = "submit" variant="contained" onClick = {() => cartDialogHandle({service: item._id, subService: prop._id},prop._id)} className={props.color}>
                            Add To Cart
                            &nbsp;&nbsp;&nbsp;
                            <AddShoppingCartIcon/>
                          </Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button type = "submit" variant="contained" onClick = {e => handleDialog({service: item._id, subService: prop._id},prop._id)} className={props.color}>
                            Order
                            &nbsp;&nbsp;&nbsp;<ShoppingCartIcon/>
                          </Button>
                        </TableCell>
                        {/*<TableCell>
                          <EditIcon onClick = {() => alert(item._id)}/>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <DeleteIcon onClick = {() => alert(item._id)}/>
                        </TableCell>*/}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          ) : null }
          </TableCell>
        </TableRow>
        ])
      )}
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     // history: PropTypes.arrayOf(
//     //   PropTypes.shape({
//     //     amount: PropTypes.number.isRequired,
//     //     customerId: PropTypes.string.isRequired,
//     //     date: PropTypes.string.isRequired,
//     //   }),
//     // ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function Tables(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        {props.tableHead !== undefined ? (
          <TableHead >
            <TableRow >
              <TableCell />
              {props.tableHead.map((prop, key) => {
                return (
                  <TableCell
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
            <Row 
              tableSubHead = {props.tableSubHead} 
              test = {props.tableTest} 
              color={props.colors}
              createOrder = {props.createOrder}
              loading = {props.loading}
              error={props.error}
              orderSuccess={props.orderSuccess}
              orderClose = {props.orderClose}
              createCart={props.createCart}
              load={props.load}
              cartError={props.cartError}
              cartSuccess={props.cartSuccess}
              cartClose={props.cartClose}
            />
        </TableBody>
      </Table>
    </TableContainer>
  );
}