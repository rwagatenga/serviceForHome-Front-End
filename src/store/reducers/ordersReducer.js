import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/util';

const initialState = {
	orders: [],
	createOrderError: null,
	createdOrder: false,
	loading: false,
	error: null,
	opay: [],
	opayLoading: false,
	opayError: false,
	firebase: [],
	firebaseLoading: false,
	firebaseError: false,
	transactionId: null
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
const opayStart = (state, action) => {
	return updateObject(state, {
		opayLoading: true,
		loading: false
	})
}
const opayFail = (state, action) => {
	return updateObject(state, {
		opayLoading: false,
		opayError: action.error,
		loading: false,
		transactionId: null
	});
};
const opaySuccess = (state, action) => {
	return updateObject(state, {
		opayLoading: false,
		opay: action.opay,
		opayError: null,
		loading: false,
		transactionId: action.transactionId
	});
};
const firebaseStart = (state, action) => {
	return updateObject(state, {
		firebaseloading: true,
		opayLoading: true
	})
}
const firebaseFail = (state, action) => {
	return updateObject(state, {
		firebaseLoading: false,
		opayLoading: false,
		firebaseError: action.error,
		transactionId: null
	})
}
const firebaseSuccess = (state, action) => {
	return updateObject(state, {
		firebaseLoading: false,
		opayLoading: false,
		loading: false,
		firebase: [...action.firebase],
		transactionId: action.transactionId
	});
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ORDER_START: return orderStart( state, action );
        case actionTypes.ORDER_SUCCESS: return orderSuccess( state, action );
        case actionTypes.ORDER_FAIL: return ordersFail( state, action );
        case actionTypes.CREATE_ORDER_SUCCESS: return createOrderSuccess(state, action);
        case actionTypes.CREATE_ORDER_FAIL: return createOrderFail(state, action);
		case actionTypes.ORDER_CLOSE: return orderClose(state, action);
		case actionTypes.OPAY_START: return opayStart(state, action);
		case actionTypes.OPAY_FAIL: return opayFail(state, action)
		case actionTypes.OPAY_SUCCESS: return opaySuccess(state, action);
		case actionTypes.FIREBASE_START: return firebaseStart(state, action);
		case actionTypes.FIREBASE_FAIL: return firebaseFail(state, action);
		case actionTypes.FIREBASE_SUCCESS: return firebaseSuccess(state, action)
        default: return state;
    }
};

export default reducer;