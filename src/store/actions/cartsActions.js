import * as actionTypes from './actionTypes.js';

export const cartStart = () => {
	return {
		type: actionTypes.CART_START,
	}
};

export const onCancel = () => {
  return {
    type: actionTypes.ON_CANCEL,
    error: false
  }
};

export const cartSuccess = (carts) => {
	return {
		type: actionTypes.CART_SUCCESS,
		carts: carts
	}
};

export const cartFail = (error) => {
	return {
		type: actionTypes.CART_FAIL,
		error: error
	}
};
export const createCartSuccess = () => {
	return {
		type: actionTypes.CREATE_CART_SUCCESS,
	}
};
export const createCartFail = (error) => {
	return {
		type: actionTypes.CREATE_CART_FAIL,
		error: error
	}
};
export const cartClose = () => {
	return {
		type: actionTypes.CART_CLOSE,
	}
};

export const createCart = (clientId, cartInputs) => {
	return dispatch => {
		dispatch(cartStart());
		const cartQuery = {
			query: ` 
				mutation createCart($clientId: ID!, $cartInputs: cartInputData) {
					createCart(clientId: $clientId, cartInputs: $cartInputs) {
						_id
					  orders {
					  	price
					  	duration
					  	description
					  	serviceId {
					  		_id
					  		serviceName
					  	}
					  	subServiceId {
					  		_id
					  		subServiceName
					  	}
					 	}
					}
				}`,
				variables: {
					clientId: clientId,
					cartInputs: {
						clientId: clientId,
						serviceId: cartInputs.serviceId,
						subServiceId: cartInputs.subServiceId,
						price: cartInputs.price,
						description: cartInputs.description,
						duration: cartInputs.duration
					}
				}
			};
			fetch('http://localhost:8080/graphql', {
				method: 'POST',
				headers: {
	         'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(cartQuery)
			})
			.then((res) => {
				return res.json();
			})
			.then((resData) => {
				if (resData.errors) {
					if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g)) {
	          let message = "Check Your Internet Connection";
	          dispatch(createCartFail(resData.errors[0].message));	
	        }
	        dispatch(createCartFail(resData.errors[0].message));	
	      } else {
	      	dispatch(createCartSuccess());
        	dispatch(cartSuccess(resData.data.getCarts));
        }
			})
			.catch((err) => {
				dispatch(cartFail(err))
			})
	}
};

export const initCarts = (userId) => {
	return dispatch => {
		if (userId) {
			dispatch(cartStart());
			const cartsQuery = {
		    query: ` 
		    {
			    getCart(clientId: "${userId}") {
					  _id
					  orders {
					  	price
					  	duration
					  	description
					  	clientId {
					  		address {
					  			province
					  			district
					  			sector
					  		}
					  	}
					  	serviceId {
					  		_id
					  		serviceName
					  	}
					  	subServiceId {
					  		_id
					  		subServiceName
					  	}
					 	}  
					}
				}`
		  };
		  fetch("http://localhost:8080/graphql", {
		    method: 'POST',
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(cartsQuery)
		  })
		  .then(res => {
		    return res.json();
		  })
		  .then(resData => {
		    if (resData.errors && resData.errors[0].status === 401) {
		      dispatch(cartFail(resData.errors[0].message));	
		    } else {
		      dispatch(cartSuccess(resData.data.getCart));
		    }
		  })
		  .catch(err => {
		    dispatch(cartFail(err));
		    // console.log(err);
		  });
		}
	}
		
};

export const updateCart = (cartId, cartInputs) => {
	return dispatch => {
		dispatch(cartStart());
		const updateCartQuery = {
			query: `
			mutation updateCart($cartId: ID!, $cartInputs: cartInputsData) {
				updateCart(cartId: $cartId: cartInputs: $cartInputs) {
					_id
		  		clientId {
		  			_id
		  		}
		     	orders {
		  	    serviceId {
		       		serviceName
		      	}
		       	subServiceId {
		         	subServiceName
		       	}
		       	clientId {
		         	firstName
		       	}
		       	price
		       	description
		     	}
				}
			}`,
			variables: {
				clientId: cartInputs.clientId,
				cartInputs: {
					clientId: cartInputs.clientId,
					serviceId: cartInputs.serviceId,
					subServiceId: cartInputs.subServiceId,
					price: cartInputs.price,
					description: cartInputs.description,
					duration: cartInputs.duration
				}
			}
		};
		fetch("http://localhost:8080/graphql", {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(updateCartQuery)
		})
		.then(res => {
		  return res.json();
		})
		.then(resData => {
		  if (resData.errors && resData.errors[0].status === 401) {
		    dispatch(cartFail(resData.errors[0].message));	
		  } else {
		    dispatch(cartSuccess(resData.data.getCart));
		  }
		})
		.catch(err => {
		  dispatch(cartFail(err));
		    // console.log(err);
		});
	}
};