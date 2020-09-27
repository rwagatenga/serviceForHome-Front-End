import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/util';

const initialState = {
	services: [],
	loading: false,
	error: null
};

const serviceStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchServiceSuccess = ( state, action ) => {
    return updateObject( state, {
        services: [...action.services],
        loading: false,
        error: false
    } );
};

const fetchServiceFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SERVICE_START: return serviceStart( state, action );
        case actionTypes.FETCH_SERVICES: return fetchServiceSuccess( state, action );
        case actionTypes.SERVICE_FAIL: return fetchServiceFail( state, action );
        default: return state;
    }
};

export default reducer;