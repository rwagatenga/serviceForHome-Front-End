import * as actionTypes from './actionTypes.js';

export const orderStart = () => {
	return {
		type: actionTypes.ORDER_START,
	}
};

export const onOrderCancel = () => {
    return {
        type: actionTypes.ON_CANCEL,
        error: false

    }
};

export const orderSuccess = (orders) => {
	return {
		type: actionTypes.ORDER_SUCCESS,
		orders: orders
	}
};

export const ordersFail = (error) => {
	return {
		type: actionTypes.ORDER_FAIL,
		error: error
	}
};

export const createOrderFail = (error) => {
	return {
		type: actionTypes.CREATE_ORDER_FAIL,
		error: error
	}
};

export const createOrderSuccess = () => {
	return {
		type: actionTypes.CREATE_ORDER_SUCCESS
	}
};
export const orderClose = () => {
	return {
		type: actionTypes.ORDER_CLOSE
	}
};
export const createOrder = (clientId, inputs) => {
	return dispatch => {
		dispatch(orderStart());
		const orderQuery = {
        query: `
          mutation createOrders($clientId: ID, $orderInput: orderInputData) {
            createOrders(clientId: $clientId, orderInput: $orderInput) {
              	_id
            }
          }`,
          variables: {
				clientId: clientId,
				orderInput: {
					serviceId: inputs.serviceId,
					subServiceId: inputs.subServiceId,
					price: inputs.price,
					duration: inputs.duration,
					description: inputs.description
				}
			}
      };
		fetch("http://localhost:8080/graphql", {
	      method: 'POST',
	      headers: {
	         'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(orderQuery)
	   })
	    .then(res => {
	        return res.json();
	    })
	    .then(resData => {
	        if (resData.errors) {
	         if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g)) {
               let message = "Check Your Internet Connection";
               dispatch(createOrderFail(message));
            }
            dispatch(createOrderFail(resData.errors[0].message));
	      } else {
		      dispatch(createOrderSuccess());
		      dispatch(orderSuccess(resData.data.viewOrders.orders));
		     }
	    })
	    .catch(err => {
	    	dispatch(ordersFail());
	        console.log(err);
	    });
	}
}

export const initOrders = (userId) => {
	return dispatch => {
		dispatch(orderStart());
		const ordersQuery = {
	      	query: ` 
	        	{
		         viewOrders(userId: "${userId}") {
				   	orders {
				   		_id
				      	clientId {
				      		_id
					        	firstName
					        	lastName
					        	sex
					   		telephone
					   		email
					        	address {
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
					      createdAt
					      duration
					      price
					      description
					      status
				    	}
					}
	    		}`
			};
	    fetch("http://localhost:8080/graphql", {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(ordersQuery)
	    })
	    .then(res => {
	        return res.json();
	    })
	    .then(resData => {
	        if (!resData.data) {
	          let message = "Check Your Internet Connection";
	          dispatch(ordersFail(message));
	        }
	        dispatch(orderSuccess(resData.data.viewOrders.orders));
	    })
	    .catch(err => {
	    	dispatch(ordersFail());
	        // console.log(err);
	    });
	}
};
export const yourOrders = (userId, yourId) => {
	return dispatch => {
		dispatch(orderStart());
		const ordersQuery = {
	      	query: ` 
	        	{
		          	viewOrders(userId: "${userId}", yourId: "${yourId}") {
				   		orders {
				   			_id
				      		clientId {
				      			_id
					        	firstName
					        	lastName
					        	sex
					   		telephone
					   		email
					        	address {
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
					      	createdAt
					      	duration
					      	price
					      	description
					      	status
				    	}
					}
	    		}`
			};
	    fetch("http://localhost:8080/graphql", {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(ordersQuery)
	    })
	    .then(res => {
	        return res.json();
	    })
	    .then(resData => {
	        if (!resData.data) {
	          let message = "Check Your Internet Connection";
	          dispatch(ordersFail(message));
	        }
	        dispatch(orderSuccess(resData.data.viewOrders.orders));
	    })
	    .catch(err => {
	    	dispatch(ordersFail());
	        console.log(err);
	    });
	}
};

export const cartOrder = (clientId, cartId) => {
	return dispatch => {
		dispatch(orderStart());
		const cartOrderQuery = {
			query: `
			mutation cartOrder($clientId: ID!, $cartId: ID!) {
				cartOrder(clientId: $clientId, cartId: $cartId) {
					orders {
				   	_id
				    	clientId {
				      	_id
					    	firstName
					    	lastName
					    	sex
					   	telephone
					   	email
					    	address {
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
					  	createdAt
					  	duration
					  	price
					  	description
					  	status
				  	}
				}
			}`,
			variables: {
				clientId: clientId,
				cartId: cartId
			}
		};
		fetch("http://localhost:8080/graphql", {
	      method: 'POST',
	      headers: {
	         'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(cartOrderQuery)
	   })
	   .then(res => {
	      return res.json();
	   })
	   .then(resData => {
	      if (resData.errors) {
	         if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g)) {
               let message = "Check Your Internet Connection";
               dispatch(createOrderFail(message));
            }
            dispatch(createOrderFail(resData.errors[0].message));
	      } else {
		      dispatch(createOrderSuccess());
		      dispatch(orderSuccess(resData.data.cartOrder.orders));
		   }
	   })
	   .catch(err => {
	    	dispatch(ordersFail());
	   });
	}
};