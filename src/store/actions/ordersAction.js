import * as actionTypes from './actionTypes.js';
import axios from "axios"

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
export const opayStart = () => {
	return {
		type: actionTypes,
	}
}
export const opayFail = (error) => {
	return {
		type: actionTypes.OPAY_FAIL,
		error: error
	}
}
export const opaySuccess = (opay, transactionId) => {
	return {
		type: actionTypes.OPAY_SUCCESS,
		opay: opay,
		transactionId: transactionId
	}
}
export const firebaseStart = () => {
	return {
		type: actionTypes.FIREBASE_START
	}
}
export const firebaseFail = (error) => {
	return {
		type: actionTypes.FIREBASE_FAIL,
		error: error
	}
}
export const firebaseSuccess = (firebase, transactionId) => {
	return {
		type: actionTypes.FIREBASE_SUCCESS,
		firebase: firebase,
		transactionId: transactionId
	}
}
export const initFirebase = () => {
	return (dispatch) => {
		axios.get(actionTypes.FIREBASE_URL)
		.then((res) => {
			Object.keys(res.data).forEach((key) => {
				dispatch(firebaseSuccess(res.data[key]))
			});
		})
		.catch((err) => dispatch(firebaseFail(err)));
	}
}
export const createOrder = (clientId, data, pay) => {
	return dispatch => {
		const users = localStorage.getItem("users");
		const user = JSON.parse(users);
		console.log("P", pay)
		const inputs = { ...data, telephone: user.telephone };
		dispatch(orderStart());
		if (!pay) {
			dispatch(opayStart());
			const transactionId = Math.floor(Math.random() * 10000);
			let firebaseData = [];
			dispatch(initFirebase(transactionId));
			const payingFee = {
				query: `
				mutation($payment: PayConnections) {
					payingFee(payment: $payment) {
						telephoneNumber
						amount
						description
						status
						code
						transactionId
					}
				}
			`,
				variables: {
					payment: {
						telephoneNumber: "250781448238",
						amount: "100",
						organizationId: "25511728-20d4-4346-86a4-12e8a71e6f8d",
						description: "Payment for Printing services",
						callbackUrl: actionTypes.FIREBASE_URL,
						transactionId: transactionId.toString(),
					},
				},
			};
			fetch(actionTypes.URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payingFee),
			})
				.then((response) => response.json())
				.then((opay) => {
					if (opay.data.code == 200) {
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
										description: inputs.description,
									},
								},
							};
							fetch(actionTypes.URL, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(orderQuery),
							})
								.then((res) => {
									return res.json();
								})
								.then((resData) => {
									if (resData.errors) {
										if (
											resData.errors[0].message.match(
												/getaddrinfo ENOTFOUND/g
											)
										) {
											let message =
												"Check Your Internet Connection";
											dispatch(createOrderFail(message));
										}
										dispatch(
											createOrderFail(
												resData.errors[0].message
											)
										);
									} else {
										dispatch(createOrderSuccess());
										dispatch(
											orderSuccess(
												resData.data.viewOrders.orders
											)
										);
									}
								})
								.catch((err) => {
									dispatch(ordersFail());
									console.log(err);
								});
					}
					dispatch(opaySuccess(opay.data.payingFee));
					axios
						.get(actionTypes.FIREBASE_URL)
						.then((res) => {
							Object.keys(res.data).forEach((key) => {
								dispatch(
									firebaseSuccess(
										res.data[key],
										transactionId
									)
								);
							});
						})
						.catch((err) => dispatch(firebaseFail(err)));
				})
				.catch((err) => dispatch(opayFail(err)));
		}
	
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
	    fetch(actionTypes.URL, {
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
	    fetch(actionTypes.URL, {
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

export const cartOrder = (clientId, cartId, pay) => {
	return dispatch => {
		if (!pay) {
			dispatch(opayStart());
			const transactionId = Math.floor(Math.random() * 10000);
			let firebaseData = [];
			dispatch(initFirebase(transactionId));
			const payingFee = {
				query: `
				mutation($payment: PayConnections) {
					payingFee(payment: $payment) {
						telephoneNumber
						amount
						description
						status
						code
						transactionId
					}
				}
			`,
				variables: {
					payment: {
						telephoneNumber: "250781448238",
						amount: "1000",
						organizationId: "25511728-20d4-4346-86a4-12e8a71e6f8d",
						description: "Payment for Printing services",
						callbackUrl: actionTypes.FIREBASE_URL,
						transactionId: transactionId.toString(),
					},
				},
			};
			fetch(actionTypes.URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payingFee),
			})
				.then((response) => response.json())
				.then((opay) => {
					if (opay.data.code == 200) {
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
								cartId: cartId,
							},
						};
						fetch(actionTypes.URL, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(cartOrderQuery),
						})
							.then((res) => {
								return res.json();
							})
							.then((resData) => {
								if (resData.errors) {
									if (
										resData.errors[0].message.match(
											/getaddrinfo ENOTFOUND/g
										)
									) {
										let message =
											"Check Your Internet Connection";
										dispatch(createOrderFail(message));
									}
									dispatch(
										createOrderFail(
											resData.errors[0].message
										)
									);
								} else {
									dispatch(createOrderSuccess());
									dispatch(
										orderSuccess(
											resData.data.cartOrder.orders
										)
									);
								}
							})
							.catch((err) => {
								dispatch(ordersFail());
							});
					}
				})
				.catch((err) => dispatch(firebaseFail(err)))
				.catch((err) => dispatch(opayFail(err)));
		}
		
	}
};