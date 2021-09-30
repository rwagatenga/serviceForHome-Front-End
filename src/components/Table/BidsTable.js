import React from 'react';

import { connect } from 'react-redux';
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import rwandaStrings from 'react-timeago/lib/language-strings/rw'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import PropTypes from 'prop-types';
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
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import PersonIcon from '@material-ui/icons/Person';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShopIcon from '@material-ui/icons/Shop';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Files
import * as actions from '../../store/actions/index';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import Backdrop from '../backdrop/backdrop'; 
import Profile from '../backdrop/profile';
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

function TablePaginationActions(props) {

  //const [orderId, setOrderId] = React.useState("");

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
  const [stateDialog, setDialog] = React.useState({
    openDialog: false,
    closeDialog: false
  });
  const [worker, setWorker] = React.useState([]);
  const [id, setId] = React.useState("");
  const [tel, setTel] = React.useState("");
  const classes = useRowStyles();

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
  }
  const profileDialogHandler = (id, event) => {
    if (id) {
      const check = test.find(item => item._id === id);
      setWorker([check]);
      setDialog({
        openDialog: true
      });
      console.log("Worker: ", worker);
    }
  }
  const dialogHandleClose = () => {
    setDialog({
        closeDialog: true
      });
  };
  const formatter = buildFormatter(rwandaStrings);
  let bidStatus;
  let orderStatus;
  const msg = test.map(item => ([bidStatus = item.status, item.orderId.map(prop => ([orderStatus = prop.status])) ]) );
  const acceptBidHandler = (id) => {
    if (id) {
      const checkTel = test.find((item) => item._id === id);
      if (checkTel) {
        setTel(checkTel.workerId.map(item => item.telephone).toString());
      }
      props.acceptBid(id);
    }
  };
  const closeBidHandler = () => {
      props.bidClose();
  }
  return (
    <React.Fragment>
    {worker.length > 0 ? (
      <Profile 
        open = {stateDialog.openDialog} 
        close = {dialogHandleClose} 
        data = {worker} />) : null}
    {props.bidSuccess ? (
      <CongzDialog
        open={props.bidSuccess}
        close={closeBidHandler}
        accept={props.bidSuccess}
        tel={tel}
      />
    ) : null}
      {props.errors || props.bidError  ? (
        <TableRow className={classes.root} tabIndex={-1}>
          <TableCell></TableCell>
          <TableCell>{props.errors || props.bidError}</TableCell>
        </TableRow>
        ) : (rowsPerPage > 0 && test.length > 0 ? test.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          <TableCell>{item.workerId.map(prop => ([prop.firstName, " ", prop.lastName]))}</TableCell>
          <TableCell> {item.price} </TableCell>
          <TableCell> <TimeAgo date={item.createdAt} formatter={formatter}/></TableCell>
          <TableCell> <TimeAgo date={item.duration} formatter={formatter}/></TableCell>
          <TableCell >
            <Button type = "submit" variant="contained" onClick = {e => profileDialogHandler(item._id)} className={props.color}>
              View Profile
              &nbsp;
              <PersonIcon/>
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button 
              type = "submit" 
              variant="contained" 
              onClick = {e => acceptBidHandler(item._id)} 
              className={props.color} 
              disabled={orderStatus === 1 }
              >
              {bidStatus === 1 && orderStatus === 1 ? (['Allowed', " ", <ThumbUpAltIcon/>]) : bidStatus === 0 && orderStatus === 1 ? (['Denied', " ", <ThumbDownAltIcon/>]) : bidStatus === 0 && orderStatus === 0 ? (['Accept']) : null}
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
                      <TableCell>{item.description}</TableCell>
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

function BidsTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  React.useEffect(() => {
    props.onFetchBids(props.userId, props.orderId);
  }, [props.orderId, props.bidSuccess]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.bids.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const acceptBidHandlers = (id) => {
    console.log(id);
    props.onAcceptBid(id);
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
        <TableBody>
        {props.loading ? <Backdrop open={props.loading} clicked={props.onCancel} /> : null }
          <Row 
              tableSubHead = {props.tableSubHead} 
              test = {props.bids} 
              color={props.colors}
              count={props.bids.length}
              rowsPerPage={rowsPerPage}
              page={page}
              errors = {props.error}
              bidError={props.bidError}
              bidSuccess={props.bidSuccess}
              acceptBid={acceptBidHandlers}
              bidClose={props.onCloseBid}
              />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={props.bids.length}
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
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
const mapStateToProps = state => {
    return {
        loading: state.bid.loading,
        error: state.bid.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        services: state.service.services,
        userId: state.auth.userId,
        bids: state.bid.bids,
        bidError: state.bid.bidError,
        bidSuccess: state.bid.createdBid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.auth( email, password ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onCancel: () => dispatch( actions.onCancel() ),
        onFetchBids: (userId, offeredBid) => dispatch(actions.initBids(userId, offeredBid)),
        onCloseBid: () => dispatch(actions.bidClose()),
        onAcceptBid: (id) => dispatch(actions.acceptBid(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BidsTable);