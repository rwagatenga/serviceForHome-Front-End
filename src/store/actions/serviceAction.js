import * as actionTypes from './actionTypes.js';

export const serviceStart = () => {
    return {
        type: actionTypes.SERVICE_START
    };
};

export const fetchServiceSuccess = (services) => {
	return {
		type: actionTypes.FETCH_SERVICES,
		services: services
	}
}
export const fetchServiceFail = (error) => {
	return {
		type: actionTypes.SERVICE_FAIL,
		error: error
	}
}
export const initServices = () => {
	return dispatch => {
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
              }
            }
          }
        }
      `
    };
    fetch("http://localhost:8080/graphql", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceQuery)
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (!resData.data) {
          let message = "Check Your Internet Connection";
          dispatch(fetchServiceFail(message));
        }
        dispatch(fetchServiceSuccess(resData.data.viewServices.services))
      })
      .catch(err => {
      	dispatch(fetchServiceFail());
        // console.log(err);
      });
	}
}