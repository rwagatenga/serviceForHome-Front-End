import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/util';

const initialState = {
	orders: [],
	createOrderError: null,
	createdOrder: false,
	loading: false,
	error: null
};

const orderStart = (state, action) => {
	return updateObject( state, { loading: true } );
};
const onCancel = (state, action) => {
    return updateObject( state, { error: false })
}
const orderSuccess = (state, action) => {
	return updateObject( state, {
		orders: [...action.orders],
		loading: false,
		error: null
	})
};
const createOrderFail = (state, action) => {
	return updateObject(state, {
		createOrderError: action.error,
		loading: false
	})
};

const createOrderSuccess = (state, action) => {
	return updateObject( state, { 
		createdOrder: true,
		loading: false 
	} );
};
const orderClose = (state, action) => {
	return updateObject(state, {
		createdOrder: false,
		loading: false,
		error: null,
		createOrderError: null
	})
};

const ordersFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	})
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ORDER_START: return orderStart( state, action );
        case actionTypes.ORDER_SUCCESS: return orderSuccess( state, action );
        case actionTypes.ORDER_FAIL: return ordersFail( state, action );
        case actionTypes.CREATE_ORDER_SUCCESS: return createOrderSuccess(state, action);
        case actionTypes.CREATE_ORDER_FAIL: return createOrderFail(state, action);
        case actionTypes.ORDER_CLOSE: return orderClose(state, action);
        default: return state;
    }
};

export default reducer;