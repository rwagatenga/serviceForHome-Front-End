import * as actionTypes from "./actionTypes.js";

export const serviceStart = () => {
	return {
		type: actionTypes.SERVICE_START,
	};
};

export const fetchServiceSuccess = (services) => {
	return {
		type: actionTypes.FETCH_SERVICES,
		services: services,
	};
};
export const fetchServiceFail = (error) => {
	return {
		type: actionTypes.SERVICE_FAIL,
		error: error,
	};
};
export const fetchSubServiceSuccess = (subServices) => {
	return {
		type: actionTypes.FETCH_SERVICES,
		subServices: subServices,
	};
};
export const fetchSubServiceFail = (error) => {
	return {
		type: actionTypes.SERVICE_FAIL,
		error: error,
	};
};
export const initServices = () => {
	return (dispatch) => {
		dispatch(serviceStart());
		const serviceQuery = {
			query: ` 
        {
          viewServices {
            services {
              _id
              serviceName
              subServiceId {
                _id
                subServiceName
                price
                serviceId {
                  _id
                }
              }
            }
          }
        }
      `,
		};
		fetch(actionTypes.URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(serviceQuery),
		})
			.then((res) => {
				return res.json();
			})
			.then((resData) => {
				if (!resData.data) {
					let message = "Check Your Internet Connection";
					dispatch(fetchServiceFail(message));
				}
				dispatch(
					fetchServiceSuccess(resData.data.viewServices.services)
				);
			})
			.catch((err) => {
				dispatch(fetchServiceFail());
				// console.log(err);
			});
	};
};

export const createService = (input) => {
	return (dispatch) => {
		dispatch(serviceStart())
		const serviceMutation = {
			query: `
				mutation($serviceName: String!){
					createService(serviceData: {serviceName: $serviceName}){
						_id
						serviceName
						subServiceId{
							_id
							subServiceName
							price
						}
					}
				}
			`,
			variables: {
				serviceName: input
			}
		}
		fetch(actionTypes.URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(serviceMutation)
		})
		.then(response => response.json())
			.then(resData => {
				if (resData.errors) {
					if (
						resData.errors[0].message.match(
							/getaddrinfo ENOTFOUND/g
						)
					) {
						let message = "Check Your Internet Connection";
						dispatch(fetchServiceFail(resData.errors[0].message));
					}
					dispatch(fetchServiceFail(resData.errors[0].message));
				} else {
					dispatch(fetchServiceSuccess(resData.data.createService));
				}
			}).catch(err => dispatch(fetchServiceFail(err)))
		.catch(err => dispatch(fetchServiceFail(err)))
		
	}
}

export const createSubService = (inputs) => {
	return (dispatch) => {
		dispatch(serviceStart())
		console.log("INPU", inputs)
		const subService = {
			query: `
				mutation($id: ID!, $subServiceName: String!, $price: String){
					createSubService(id: $id, subServiceData: { subServiceName: $subServiceName, price: $price}){
						_id
						subServiceName
						price
						serviceId {
							_id
							serviceName
						}
					}
				}
			`,
			variables: {
				id: inputs.serviceId,
				subServiceName: inputs.subServiceName,
				price: inputs.price,
			},
		};
		fetch(actionTypes.URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(subService),
		})
			.then((response) => response.json())
			.then((resData) => {
				if (resData.errors) {
					if (
						resData.errors[0].message.match(
							/getaddrinfo ENOTFOUND/g
						)
					) {
						let message = "Check Your Internet Connection";
						console.log(resData.errors[0].message)
					}
					console.log(resData.errors[0].message)
				} else {
					console.log(resData.data.createSubService);
				}
			});
	}
}
