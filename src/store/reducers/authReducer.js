import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/util";

const initialState = {
	token: null,
	userId: null,
	user: {},
	error: null,
	loading: false,
	authRedirectPath: "/",
	success: false,
	updateSuccess: false,
};

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true,
		success: false,
		updateSuccess: false,
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		userId: action.userId,
		user: { ...action.user },
		error: null,
		loading: false,
		success: true,
	});
};

const onCancel = (state, action) => {
	return updateObject(state, {
		error: false,
		success: false,
		updateSuccess: false,
	});
};
const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
		success: false,
		updateSuccess: false,
	});
};

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		userId: null,
		user: {},
	});
};

const onUpdateSuccess = (state, action) => {
	return updateObject(state, {
		error: false,
		success: true,
		updateSuccess: true,
	});
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_CANCEL:
			return onCancel(state, action);
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		case actionTypes.UPDATE_SUCCESS:
			return onUpdateSuccess(state, action);
		default:
			return state;
	}
};

export default reducer;
