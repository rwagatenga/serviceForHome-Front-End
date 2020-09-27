import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/util';

const initialState = {
	carts: [],
	loading: false,
	error: null,
	createCartError: null,
	createdCart: false
};

const cartStart = (state, action) => {
	return updateObject( state, { loading: true, error: null } );
};
const onCancel = (state, action) => {
    return updateObject( state, { error: false, loading: false })
};

const cartSuccess = (state, action) => {
	return updateObject( state, {
		carts: [action.carts],
		loading: false,
		error: null
	})
};

const cartFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	})
};
const createCartFail = (state, action) => {
	return updateObject(state, {
		createCartError: action.error,
		loading: false
	})
};
const createCartSuccess = (state, action) => {
	return updateObject(state, {
		createdCart: true,
		loading: false
	})
};
const cartClose = (state, action) => {
	return updateObject(state, {
		createdCart: false,
		loading: false
	})
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CART_START: return cartStart( state, action );
        case actionTypes.CART_SUCCESS: return cartSuccess( state, action );
        case actionTypes.CART_FAIL: return cartFail( state, action );
        case actionTypes.CREATE_CART_SUCCESS: return createCartSuccess(state, action);
		case actionTypes.CREATE_CART_FAIL: return createCartFail(state, action);
		case actionTypes.CART_CLOSE: return cartClose(state, action);
        default: return state;
    }
};

export default reducer;