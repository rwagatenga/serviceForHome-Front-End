import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/util';

const initialState = {
	bids: [],
	loading: false,
	error: null,
	createBidError: null,
	createdBid: false
};

const bidsStart = (state, action) => {
	return updateObject( state, { loading: true, error: null } );
};
const onCancel = (state, action) => {
    return updateObject( state, { error: false, loading: false })
};

const bidsSuccess = (state, action) => {
	return updateObject( state, {
		bids: [...action.bids],
		loading: false,
		error: null
	})
};

const bidsFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	})
};
const createBidFail = (state, action) => {
	return updateObject(state, {
		createBidError: action.error,
		loading: false
	})
};
const createBidSuccess = (state, action) => {
	return updateObject(state, {
		createdBid: true,
		loading: false
	})
};
const bidClose = (state, action) => {
	return updateObject(state, {
		createdBid: false,
		loading: false,
		error: null,
		createOrderError: null
	})
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.BID_START: return bidsStart( state, action );
        case actionTypes.BID_SUCCESS: return bidsSuccess( state, action );
        case actionTypes.BID_FAIL: return bidsFail( state, action );
        case actionTypes.CREATE_BID_SUCCESS: return createBidSuccess(state, action);
		case actionTypes.CREATE_BID_FAIL: return createBidFail(state, action);
		case actionTypes.BID_CLOSE: return bidClose(state, action);
        default: return state;
    }
};

export default reducer;