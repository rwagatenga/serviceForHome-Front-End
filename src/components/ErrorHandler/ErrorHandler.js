import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Backdrop from '../backdrop/backdrop';
import Modal from '../backdrop/Modal';

const errorHandler = props => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}
        //onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p>{props.error}</p>
      </Modal>
    )}
  </Fragment>
);

// const mapStateToProps = state => {
//     return {
//         error: state.auth.error,
//         isAuthenticated: state.auth.token !== null,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onCancel: () => dispatch( actions.onCancel() ),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(errorHandler);
export default errorHandler;