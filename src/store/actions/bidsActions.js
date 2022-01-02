import * as actionTypes from './actionTypes.js';

export const bidsStart = () => {
	return {
		type: actionTypes.BID_START,
	}
};

export const onCancel = () => {
    return {
        type: actionTypes.ON_CANCEL,
        error: false

    }
};

export const bidsSuccess = (bids) => {
	return {
		type: actionTypes.BID_SUCCESS,
		bids: bids
	}
};

export const bidsFail = (error) => {
	return {
		type: actionTypes.BID_FAIL,
		error: error
	}
};
export const createBidSuccess = () => {
	return {
		type: actionTypes.CREATE_BID_SUCCESS,
	}
};
export const createBidFail = (error) => {
	return {
		type: actionTypes.CREATE_BID_FAIL,
		error: error
	}
};
export const bidClose = () => {
	return {
		type: actionTypes.BID_CLOSE
	}
};
export const createBid = (orderId, workerId, bidInput) => {
	return dispatch => {
		dispatch(bidsStart());
		const bidQuery = {
			query: ` 
				mutation createBid($orderId: ID!, $workerId: ID!, $bidInput: bidInputData) {
					createBid(orderId: $orderId, workerId: $workerId, bidInput: $bidInput) {
					  _id	
					}
				}`,
				variables: {
					orderId: orderId,
					workerId: workerId,
					bidInput: {
						price: bidInput.price,
						description: bidInput.description,
						duration: bidInput.duration
					}
				}
			};
			fetch(actionTypes.URL, {
				method: 'POST',
				headers: {
	         'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(bidQuery)
			})
			.then((res) => {
				return res.json();
			})
			.then((resData) => {
				if (resData.errors) {
					if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g)) {
	          let message = "Check Your Internet Connection";
	          dispatch(createBidFail(message));
	        }
	        dispatch(createBidFail(resData.errors[0].message));
	      } else {
        	dispatch(createBidSuccess());
        }
			})
			.catch((err) => {
				dispatch(createBidFail(err))
			})
		}
	};

export const acceptBid = (id) => {
	return dispatch => {
		dispatch(bidsStart());
		const acceptQuery = {
			query: `
			mutation acceptBid($_id: ID!){
				acceptBid(_id: $_id) {
					_id
				}
			}`,
			variables : {
				_id: id
			}
		};
		fetch(actionTypes.URL, {
			method: 'POST',
			headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(acceptQuery)
		})
		.then((res) => {
			return res.json();
		})
		.then((resData) => {
			if (resData.errors) {
				if (resData.errors[0].message.match(/getaddrinfo ENOTFOUND/g)) {
	        let message = "Check Your Internet Connection";
	        dispatch(createBidFail(message));
	      }
	      dispatch(createBidFail(resData.errors[0].message));
	    } else {
        dispatch(createBidSuccess());
      }
		})
		.catch((err) => {
			dispatch(createBidFail(err))
		})
	}	
};
export const initBids = (userId, offerId) => {
	return dispatch => {
		if (offerId) {
			dispatch(bidsStart());
			const bidsQuery = {
				query: `
		    {
			    viewOfferBids(clientId: "${ userId }", offerId: "${ offerId }") {
					  offerBid {
					    _id
					    orderId {
					      _id
					      serviceId {
					      	serviceName
					      }
					     	subServiceId {
					      	subServiceName
					      }
					      price
					      createdAt
					      duration
					      status
					    }
					    workerId {
					      _id
					      firstName
					      lastName
					      email
					      sex
					      telephone
					      address {
						      district
						      sector
					      }
					      serviceId {
					        serviceName
					      }
					      subServiceId {
					        subServiceName
					      }
					    }
					    price
					    duration
					    createdAt
					    description
					    status
					      		
					  }
	    			totalBids
					   
					}
				}`
			};
			fetch(actionTypes.URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bidsQuery)
			})
			.then(res => res.json())
			.then(resData => {
				dispatch(bidsSuccess(resData.data.viewOfferBids.offerBid));
				// if (resData.errors || resData.errors.length > 0 || resData.errors[0].status === 401) {
				// 	alert("FAIL");
				// 	// dispatch(bidsFail(resData.errors[0].message))
				// }
				// else { alert("DONE"); }
				// else {
				// 	alert("false")
				// 	console.log("BIDDED", resData.data.viewOfferBids.offerBid)
				// 	dispatch(bidsSuccess(resData.data.viewOfferBids.offerBid));
				// }
				// dispatch(bidsSuccess(resData.data.viewOfferBids.offerBid));
			})
			.catch(err => dispatch(bidsFail(err)))
		}
	}
		
};