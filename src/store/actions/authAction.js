import * as actionTypes from "./actionTypes";

var users = {};

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const onCancel = () => {
	return {
		type: actionTypes.ON_CANCEL,
		error: false,
	};
};
export const authSuccess = (token, userId, user) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
		user: user,
	};
};
export const onUpdateSuccess = () => {
	return {
		type: actionTypes.UPDATE_SUCCESS,
	};
};
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	JSON.stringify(localStorage.removeItem("users"));
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		const graphqlQuery = {
			query: `
            query UserLogin($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                token
                userId
                userType
                expiresIn
                users {
                    firstName
                    lastName
                    telephone
                    email
                    sex
                    userType
                    serviceId {
                        _id
                        serviceName
                    }
                    subServiceId {
                        _id
                        subServiceName
                    }
                    address {
                        province
                        district
                        sector
                    }
                }
              }
            }
          `,
			variables: {
				email: authData.email,
				password: authData.password,
			},
		};
		fetch("http://localhost:8080/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(graphqlQuery),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response.errors) {
					if (
						response.errors[0].message.match(
							/getaddrinfo ENOTFOUND/g
						)
					) {
						response.errors[0].message =
							"Check Your Internet Connection";
						dispatch(authFail(response.errors[0].message));
					}
					dispatch(authFail(response.errors[0].message));
				} else {
					const expirationDate = new Date(
						new Date().getTime() +
							response.data.login.expiresIn * 1000
					);
					localStorage.setItem("token", response.data.login.token);
					localStorage.setItem(
						"expirationDate",
						expirationDate.toISOString()
					);
					localStorage.setItem("userId", response.data.login.userId);
					localStorage.setItem(
						"users",
						JSON.stringify(response.data.login.users[0])
					);
					dispatch(
						authSuccess(
							response.data.login.token,
							response.data.login.userId,
							response.data.login.users[0]
						)
					);
					dispatch(checkAuthTimeout(response.data.login.expiresIn));
				}
			})
			.catch((err) => {
				dispatch(authFail(err));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem("expirationDate")
			);
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				const users = localStorage.getItem("users");
				const user = JSON.parse(users);
				dispatch(authSuccess(token, userId, user));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};

export const createAccount = (
	token,
	expiresIn,
	serviceId,
	subServiceId,
	userInput
) => {
	return (dispatch) => {
		dispatch(authStart());
		if (userInput.userType === "Client") {
			const graphqlQuery = {
				query: `
                mutation createUser($token: String, $firstName: String!, $lastName: String!, $sex: String!, $telephone: String!, $email: String!, $password: String!, $userType: String!, $address: Address!) {
                    createUser(token: $token, userInput: {firstName: $firstName, lastName: $lastName, sex: $sex, telephone: $telephone, email: $email, password: $password, userType: $userType, address: $address }) {
                        _id
                        firstName
                        lastName
                        telephone
                        email
                        userType
                        sex
                        address {
                            province
                            district
                            sector
                        }
                        token
                        expiresIn
                    }
                }`,
				variables: {
					firstName: userInput.firstName,
					lastName: userInput.lastName,
					sex: userInput.sex,
					telephone: userInput.phoneNumber,
					email: userInput.email,
					password: userInput.password,
					userType: userInput.userType,
					address: {
						province: userInput.province,
						district: userInput.district,
						sector: userInput.sector,
					},
				},
			};
			fetch("http://localhost:8080/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(graphqlQuery),
			})
				.then((res) => {
					return res.json();
				})
				.then((resData) => {
					if (resData.errors && resData.errors[0].status === 422) {
						console.log("Error: ", resData.errors[0].data);
						dispatch(authFail(resData.errors[0].data));
					}

					if (resData.errors) {
						if (
							resData.errors[0].message.match(
								/getaddrinfo ENOTFOUND/g
							) &&
							!resData.data
						) {
							const message = "Check your Internet Connection";
							dispatch(authFail(message));
						}
						dispatch(authFail(resData.errors[0].message));
					} else {
						const expirationDate = new Date(
							new Date().getTime() +
								resData.data.createUser.expiresIn * 1000
						);
						localStorage.setItem(
							"token",
							resData.data.createUser.token
						);
						localStorage.setItem(
							"expirationDate",
							expirationDate.toISOString()
						);
						localStorage.setItem(
							"userId",
							resData.data.createUser.userId
						);
						localStorage.setItem(
							"users",
							JSON.stringify(resData.data.createUser)
						);

						dispatch(
							authSuccess(
								resData.data.createUser.token,
								resData.data.createUser._id,
								resData.data.createUser
							)
						);
						dispatch(
							checkAuthTimeout(resData.data.createUser.expiresIn)
						);
					}
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		}
		if (userInput.userType === "Worker") {
			const graphqlQuery = {
				query: `
                mutation createUser($serviceId: ID!, $subServiceId: [ID!]!, $firstName: String!, $lastName: String!, $sex: String!, $telephone: String!, $email: String!, $password: String!, $userType: String!, $address: Address!, $priceTag: String, $negotiate: String) {
                    createUser(serviceId: $serviceId, subServiceId: $subServiceId, userInput: {firstName: $firstName, lastName: $lastName, sex: $sex, telephone: $telephone, email: $email, password: $password, userType: $userType, address: $address, priceTag: $priceTag, negotiate: $negotiate }) {
                        _id
                        firstName
                        lastName
                        telephone
                        email
                        userType
                        sex
                        serviceId {
                            _id
                            serviceName
                        }
                        subServiceId {
                            _id
                            subServiceName
                        }
                        address {
                            province
                            district
                            sector
                        }
                        token
                        expiresIn
                    }
                }`,
				variables: {
					serviceId: serviceId,
					subServiceId: subServiceId,
					firstName: userInput.firstName,
					lastName: userInput.lastName,
					sex: userInput.sex,
					telephone: userInput.phoneNumber,
					email: userInput.email,
					password: userInput.password,
					userType: userInput.userType,
					address: {
						province: userInput.province,
						district: userInput.district,
						sector: userInput.sector,
					},
					price: userInput.price,
					negotiate: userInput.negotiate,
				},
			};
			fetch("http://localhost:8080/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(graphqlQuery),
			})
				.then((res) => {
					return res.json();
				})
				.then((resData) => {
					if (resData.errors && resData.errors[0].status === 422) {
						dispatch(authFail(resData.errors[0].data));
					}
					if (resData.errors) {
						if (
							resData.errors[0].message.match(
								/getaddrinfo ENOTFOUND/g
							)
						) {
							const message = "Check your Internet Connection";
							dispatch(authFail(message));
						}
						dispatch(authFail(resData.errors[0].message));
					} else {
						const expirationDate = new Date(
							new Date().getTime() +
								resData.data.createUser.expiresIn * 1000
						);
						localStorage.setItem(
							"token",
							resData.data.createUser.token
						);
						localStorage.setItem(
							"expirationDate",
							expirationDate.toISOString()
						);
						localStorage.setItem(
							"userId",
							resData.data.createUser.userId
						);
						localStorage.setItem(
							"users",
							JSON.stringify(resData.data.createUser)
						);
						dispatch(
							authSuccess(
								resData.data.createUser.token,
								resData.data.createUser._id,
								resData.data.createUser
							)
						);
						dispatch(
							checkAuthTimeout(resData.data.createUser.expiresIn)
						);
					}
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		}
	};
};

export const updateUserAccount = (
	userId,
	serviceId,
	subServiceId,
	userInput
) => {
	return (dispatch) => {
		dispatch(authStart());
		if (userInput.userType === "Client") {
			const updatingQuery = {
				query: `
				mutation updateUser($userId: ID!, $firstName: String!, $lastName: String!, $sex: String!, $telephone: String!, $email: String!, $userType: String!, $password: String!, $currentPassword: String, $address: Address!){
					updateUser(userId: $userId, userInput: {firstName: $firstName, lastName: $lastName, sex: $sex, telephone: $telephone, email: $email, userType: $userType, password: $password, currentPassword: $currentPassword, address: $address}){
						_id
                        firstName
                        lastName
                        telephone
                        email
                        userType
                        sex
                        address {
                            province
                            district
                            sector
                        }
					}
				}`,
				variables: {
					userId: userId,
					firstName: userInput.firstName,
					lastName: userInput.lastName,
					sex: userInput.sex,
					telephone: userInput.telephone,
					email: userInput.email,
					userType: userInput.userType,
					password: userInput.password.newPassword,
					currentPassword: userInput.password.currentPassword,
					address: {
						province: userInput.address.province,
						district: userInput.address.district,
						sector: userInput.address.sector,
					},
				},
			};
			fetch("http://localhost:8080/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatingQuery),
			})
				.then((res) => {
					return res.json();
				})
				.then((resData) => {
					if (resData.errors && resData.errors[0].status === 422) {
						console.log("Error: ", resData.errors[0].data);
						dispatch(authFail(resData.errors[0].data));
					}

					if (resData.errors) {
						if (
							resData.errors[0].message.match(
								/getaddrinfo ENOTFOUND/g
							) &&
							!resData.data
						) {
							const message = "Check your Internet Connection";
							dispatch(authFail(message));
						}
						dispatch(authFail(resData.errors[0].message));
					} else {
						const tokenId = localStorage.getItem("token");
						const id = localStorage.getItem("userId");
						JSON.stringify(localStorage.removeItem("users"));
						localStorage.setItem(
							"users",
							JSON.stringify(resData.data.updateUser)
						);
						dispatch(
							authSuccess(tokenId, id, resData.data.updateUser)
						);
					}
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		}
		if (userInput.userType === "Worker") {
			const updatingQuery = {
				query: `
				mutation updateUser($userId: ID!, $serviceId: ID!, $subServiceId: [ID!]!, $firstName: String!, $lastName: String!, $sex: String!, $telephone: String!, $email: String!, $userType: String!, $password: String!, $currentPassword: String, $address: Address!, $priceTag: String, $negotiate: String){
					updateUser(userId: $userId, serviceId: $serviceId, subServiceId: $subServiceId, userInput: {firstName: $firstName, lastName: $lastName, sex: $sex, telephone: $telephone, email: $email, userType: $userType, password: $password, currentPassword: $currentPassword, address: $address, priceTag: $priceTag, negotiate: $negotiate}){
						_id
                        firstName
                        lastName
                        telephone
                        email
                        userType
                        sex
						serviceId {
                            _id
                            serviceName
                        }
                        subServiceId {
                            _id
                            subServiceName
                        }
                        address {
                            province
                            district
                            sector
                        }
					}
				}`,
				variables: {
					userId: userId,
					serviceId: serviceId,
					subServiceId: subServiceId,
					firstName: userInput.firstName,
					lastName: userInput.lastName,
					sex: userInput.sex,
					telephone: userInput.telephone,
					email: userInput.email,
					userType: userInput.userType,
					password: userInput.password.newPassword,
					currentPassword: userInput.password.currentPassword,
					address: {
						province: userInput.address.province,
						district: userInput.address.district,
						sector: userInput.address.sector,
					},
				},
			};
			fetch("http://localhost:8080/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatingQuery),
			})
				.then((res) => {
					return res.json();
				})
				.then((resData) => {
					if (resData.errors && resData.errors[0].status === 422) {
						console.log("Error: ", resData.errors[0].data);
						dispatch(authFail(resData.errors[0].data));
					}

					if (resData.errors) {
						if (
							resData.errors[0].message.match(
								/getaddrinfo ENOTFOUND/g
							) &&
							!resData.data
						) {
							const message = "Check your Internet Connection";
							dispatch(authFail(message));
						}
						dispatch(authFail(resData.errors[0].message));
					} else {
						const tokenId = localStorage.getItem("token");
						const id = localStorage.getItem("userId");
						JSON.stringify(localStorage.removeItem("users"));
						localStorage.setItem(
							"users",
							JSON.stringify(resData.data.updateUser)
						);
						dispatch(
							authSuccess(tokenId, id, resData.data.updateUser)
						);
						dispatch(onUpdateSuccess());
					}
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		}
	};
};
