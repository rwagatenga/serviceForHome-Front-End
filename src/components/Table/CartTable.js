import React from 'react';
import PropTypes from 'prop-types';

import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import rwandaStrings from 'react-timeago/lib/language-strings/rw'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Import Files
import BidDialog from '../backdrop/bidDialog';
import CongzDialog from '../backdrop/congzDialog';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
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

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function Row(props) {
  const { row, page, rowsPerPage, test } = props;
  const [open, setOpen] = React.useState({
    stateOpen: false,
    stateId: ""
  });
  const [id, setId] = React.useState("");
  const classes = useRowStyles();
  const [stateDialog, setDialog] = React.useState({
    openDialog: false,
    congzDialog: false
  });
  const [state, setState] = React.useState({
    order: {}
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, test.length - page * rowsPerPage);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const handleCollapse = (item, event) => {
    if (item) {
      let coll = test.find((index) => index._id === item );
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
  const handleDialog = (orderId, event) => {
    if (orderId) {
      const order = props.test.find((item) => item._id === orderId);
      if (order) {
        setState({
          order: {...order}
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
  const createBidHandler = (ev, data) => {
    ev.preventDefault();
    props.createBid(ev, {...data});
    if (props.bidSuccess) {
      setDialog({
        openDialog: false
      });
      setDialog({
        congzDialog: true
      });
    }
  };
  const formatter = buildFormatter(englishStrings)
  return (
    <React.Fragment>
    {state.order && !props.bidSuccess ? (
      <BidDialog 
        open = {stateDialog.openDialog}
        close = {closeDialogHandle} 
        order = {state.order}
        color={props.color} 
        makeBid={createBidHandler}   
        loading={props.loading}  
        error={props.error}    
      />) : props.bidSuccess && !stateDialog.congzDialog ? (
        <CongzDialog
          open={() => setDialog({congzDialog: !stateDialog.congzDialog})}
          close={() => setDialog({congzDialog: !stateDialog.congzDialog})}
          bid={props.bidSuccess}
        />
      ) : null}
      {(rowsPerPage > 0 ? props.test.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.test
      ).map((item, index) => ([
        <TableRow className={classes.root} key={index} tabIndex={-1}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={e => handleCollapse(item._id)}>
              {open.stateOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {index+1}
          </TableCell>
          <TableCell>{item.serviceId.map(service => service.serviceName)}</TableCell>
          <TableCell>{item.subServiceId.map(subService => subService.subServiceName)}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{item.clientId.map(view => view.address.sector)}</TableCell>
          <TableCell>{<TimeAgo date={item.duration} formatter={formatter}/>}</TableCell>
          <TableCell >
            <Button type = "submit" variant="contained" onClick = {e => handleDialog(item._id)} className={props.color} disabled={item.status === 1} >
              Bid
              &nbsp;&nbsp;
              <ShoppingCartIcon/>
            </Button>
          </TableCell>
        </TableRow>,
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {open.stateOpen && open.stateId === item._id ? (
            <Collapse in={open} timeout="auto" unmountOnExit id={id}>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Descriptions
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                      <TableRow key={index}>
                        <TableCell>{item.description} 
                          Basically faithfully preserving the highest order of magnitude (and by preference, only shifting up units when passing 2 of those units - 5 weeks instead of 1 month). 
                          Basically faithfully preserving the highest order of magnitude (and by preference, only shifting up units when passing 2 of those units - 5 weeks instead of 1 month). 
                          Basically faithfully preserving the highest order of magnitude (and by preference, only shifting up units when passing 2 of those units - 5 weeks instead of 1 month).
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          ) : null }
          </TableCell>
        </TableRow>
        ]))}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
    </React.Fragment>
  );
}

export default function CartTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const orders = [];

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.tableTest.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper} style={{maxHeight: 450}}>
      <Table stickyHeader aria-label="collapsible table">
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
        {console.log(props.tableTest)}
        <TableBody>
          {/*<Row 
            tableSubHead = {props.tableSubHead} 
            test = {props.tableTest} 
            color={props.colors}
            count={props.tableTest.length}
            rowsPerPage={rowsPerPage}
            page={page}
              //createOrder = {props.createOrder}
            loading={props.loading}
            error={props.error}
              //orderSuccess={props.orderSuccess}
          />*/}
        </TableBody>
        {/*<TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={props.tableTest.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>*/}
      </Table>
    </TableContainer>
  );
}