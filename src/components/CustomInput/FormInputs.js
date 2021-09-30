import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
// import Button from "@material-ui/core/Button";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import {
	provinces,
	districts,
	sectors,
	// cells,
	//country,
} from "../../address/addresses";
import { ListItemAvatar } from "@material-ui/core";

//const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0",
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
	},
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		// width: '100%',
		width: "30ch",
		marginLeft: "auto",
		marginRight: "auto",
		paddingBottom: 0,
		marginTop: 0,
		fontWeight: 500,
	},
	input: {
		color: "black",
		width: "100%",
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	// textField: {
	//   width: '30ch',
	// },
	button: {
		backgroundColor: "#0E3D51",
		color: "white",
		"&:hover": {
			backgroundColor: "#0E3D51",
			color: "white",
		},
	},
}));

const FormInputs = (props) => {
	const classes = useStyles();
	const SUBS = props.subServices;
	const [state, setState] = React.useState({
		...props.user,
		address: props.user.address,
	});
	const [password, setPassword] = React.useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [error, setError] = React.useState(false);
	const [address, setAddress] = React.useState({
		provinceId: "",
		districtId: "",
		sectorId: "",
	});
	const [clientChanges, setClientChanges] = React.useState({
		services: "",
		subServices: [],
		initialUserType: state.userType,
	});
	const [subServiceId, setSubServiceId] = React.useState({
		initialServices:
			clientChanges.initialUserType === "Worker" &&
			state.userType === "Worker" &&
			state.serviceId &&
			state.hasOwnProperty("serviceId")
				? [state.serviceId[0]._id]
				: state.serviceId,
		initialSubServices:
			clientChanges.initialUserType === "Worker" &&
			state.userType === "Worker" &&
			state.subServiceId &&
			state.hasOwnProperty("subServiceId")
				? [...state.subServiceId.map((item) => item._id)]
				: [],
		subs: [],
	});
	const handleChange = (prop) => (event) => {
		setState({ ...state, [prop]: event.target.value });
		delete state.serviceId;
	};
	const passwordChangeHandler = (ev) => {
		const name = ev.target.name;
		const value = ev.target.value;
		setPassword({ ...password, [name]: value });
	};
	const confirmPasswordChangeHandler = (ev) => {
		const name = ev.target.name;
		const value = ev.target.value;
		if (value !== password.newPassword) {
			setError(true);
			setPassword({ ...password, [name]: value });
		} else {
			setPassword({ ...password, [name]: value });
			setError(false);
		}
	};

	const handleProvinceChange = (event) => {
		let findProvince = provinces.find(
			(item) => item.province_name === event.target.value
		);
		setAddress({ provinceId: findProvince.province_id });
		setState((prevState) => ({
			...state,
			address: {
				...prevState.address,
				province: findProvince.province_name,
			},
		}));
	};
	const handleDistrictChange = (event) => {
		let findDistrict = districts.find(
			(item) => item.district_name === event.target.value
		);
		setAddress({ districtId: findDistrict.district_id });
		setState((prevState) => ({
			...state,
			address: {
				...prevState.address,
				district: findDistrict.district_name,
			},
		}));
	};
	const handleSectorChange = (event) => {
		let findSector = sectors.find(
			(item) => item.sector_name === event.target.value
		);
		setAddress({ sectorId: findSector.sector_id });
		setState((prevState) => ({
			...state,
			address: {
				...prevState.address,
				sector: findSector.sector_name,
			},
		}));
	};
	const serviceChangeHandler = (ev) => {
		const value = ev.target.value;

		const findService = props.services.find((item) => item._id === value);
		if (findService) {
			setState({
				...state,
				serviceId: findService._id,
				subServiceId: findService.subServiceId,
			});
			// setSubServiceId({ ...subServiceId, subs: [] });
			if (
				state.userType === "Worker" &&
				typeof state.serviceId === "undefined" &&
				typeof state.subServiceId === "undefined"
			) {
				setState({
					...state,
					serviceId: findService._id,
					subServiceId: findService.subServiceId,
				});
				// setSubServiceId({ ...subServiceId, subs: [] });
			}
		}
	};
	const handleSubServiceChange = (id, ev) => {
		let array = [];
		const value = ev.target.value;

		if (ev.target.checked) {
			let findSubService = state.subServiceId.find(
				(item) => item._id === value
			);
			setSubServiceId({
				...subServiceId,
				subs: [findSubService._id],
			});
		} else {
			setSubServiceId({
				...subServiceId,
				subs: subServiceId.subs.filter((item) => item !== id),
			});
		}
	};
	const handleChangeSubmit = (e, data) => {
		e.preventDefault();
		if (password.newPassword !== password.confirmPassword) {
			throw new Error("Password does not match");
		}

		if (
			(state.userType === "Client" &&
				clientChanges.initialUserType === "Worker") ||
			(state.userType === "Client" &&
				clientChanges.initialUserType === "Client")
		) {
			delete data.serviceId;
			delete data.subServiceId;
			props.onSubmitData(e, { ...data });
		}

		if (
			(state.userType === "Worker" &&
				clientChanges.initialUserType === "Worker" &&
				state.serviceId === null &&
				subServiceId.subs.length < 1) ||
			(state.userType === "Worker" &&
				clientChanges.initialUserType === "Client" &&
				state.serviceId === null &&
				subServiceId.subs.length < 1)
		) {
			throw new Error("Empty Services or SubServices");
		}

		if (
			(state.userType === "Worker" &&
				clientChanges.initialUserType === "Worker" &&
				state.serviceId !== null &&
				subServiceId.subs.length > 0) ||
			(state.userType === "Worker" &&
				clientChanges.initialUserType === "Client" &&
				state.serviceId !== null &&
				subServiceId.subs.length > 0)
		) {
			props.onSubmitData(e, { ...data, subServiceId: subServiceId.subs });
		}
	};
	console.log("ADDRESS", state);
	console.log("INITIAL", clientChanges);
	return (
		<>
			<GridItem xs={12} sm={12} md={8}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>Edit Profile</h4>
						<p className={classes.cardCategoryWhite}>
							Complete your profile
						</p>
					</CardHeader>
					<form
						onSubmit={(e) =>
							handleChangeSubmit(e, {
								...state,
								password: password,
							})
						}
					>
						<CardBody>
							<GridContainer>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="telephone"
											label="Telephone"
											placeholder="+2507XXXX"
											name="telephone"
											value={state.telephone}
											onChange={handleChange("telephone")}
										/>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="email"
											label="E-Mail"
											placeholder="example@domain"
											name="email"
											value={state.email}
											onChange={handleChange("email")}
										/>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="userType"
											label="User Type"
											placeholder="Client or Worker"
											select
											name="userType"
											onChange={handleChange("userType")}
											value={state.userType}
										>
											{state.userType === "Client"
												? [
														<MenuItem
															value={
																state.userType
															}
														>
															Client
														</MenuItem>,
														<MenuItem value="Worker">
															Worker
														</MenuItem>,
												  ]
												: [
														<MenuItem
															value={
																state.userType
															}
														>
															Worker
														</MenuItem>,
														<MenuItem value="Client">
															Client
														</MenuItem>,
												  ]}
										</TextField>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="province"
											label="Province"
											placeholder="Southern"
											select
											name="province"
											onChange={handleProvinceChange}
											value={
												state.address.province
													? state.address.province
													: ""
											}
										>
											<MenuItem
												value={
													state.address.province
														? state.address.province
														: ""
												}
											>
												{state.address.province}
											</MenuItem>
											{provinces
												.filter(
													(item) =>
														item.province_name !==
														state.address.province
												)
												.map((option) => (
													<MenuItem
														key={option.province_id}
														value={
															option.province_name
														}
													>
														{option.province_name}
													</MenuItem>
												))}
										</TextField>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="district"
											label="District"
											placeholder="Nyanza"
											select
											name="district"
											onChange={handleDistrictChange}
											value={state.address.district || ""}
										>
											<MenuItem
												value={
													state.address.district || ""
												}
											>
												{state.address.district}
											</MenuItem>
											{districts
												.filter(
													(item) =>
														item.district_name !==
															state.address
																.district &&
														item.province_id ===
															address.provinceId
												)
												.map((option) => (
													<MenuItem
														key={option.district_id}
														value={
															option.district_name
														}
													>
														{option.district_name}
													</MenuItem>
												))}
										</TextField>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="sector"
											label="Sector"
											placeholder="Kacyiru"
											select
											name="sector"
											value={state.address.sector || ""}
											onChange={handleSectorChange}
										>
											<MenuItem
												value={
													state.address.sector || ""
												}
											>
												{state.address.sector}
											</MenuItem>
											{sectors
												.filter(
													(item) =>
														item.sector_name !==
															state.address
																.sector &&
														item.district_id ===
															address.districtId
												)
												.map((option) => (
													<MenuItem
														key={option.sector_id}
														value={
															option.sector_name
														}
													>
														{option.sector_name}
													</MenuItem>
												))}
										</TextField>
									</FormControl>
								</GridItem>

								{/**Client Services */}
								{clientChanges.initialUserType === "Client" &&
								state.userType === "Worker" &&
								state.serviceId ? (
									<GridItem xs={11} sm={6} md={4}>
										<FormControl fullWidth>
											<TextField
												id="serviceId"
												label="Service"
												placeholder="Massage"
												select
												name="serviceId"
												value={state.serviceId}
												onChange={serviceChangeHandler}
											>
												{props.services.map(
													(service) => (
														<MenuItem
															value={service._id}
															key={service._id}
														>
															{
																service.serviceName
															}
														</MenuItem>
													)
												)}
											</TextField>
										</FormControl>
									</GridItem>
								) : null}
								{/** Worker Services */}
								{clientChanges.initialUserType === "Worker" &&
								state.userType === "Worker" &&
								state.serviceId ? (
									<GridItem xs={11} sm={6} md={4}>
										<FormControl fullWidth>
											<TextField
												id="serviceId"
												label="Service"
												placeholder="Massage"
												select
												name="serviceId"
												value={
													clientChanges.initialUserType ===
														"Worker" &&
													state.userType ===
														"Worker" &&
													Array.isArray(
														state.serviceId
													) &&
													state.serviceId
														? state.serviceId[0]._id
														: state.serviceId
												}
												onChange={serviceChangeHandler}
											>
												{state.serviceId &&
												Array.isArray(state.serviceId)
													? state.serviceId.map(
															(item) => (
																<MenuItem
																	value={
																		item._id
																	}
																	key={
																		item._id
																	}
																>
																	{
																		item.serviceName
																	}
																</MenuItem>
															)
													  )
													: null}
												{clientChanges.initialUserType ===
													"Worker" &&
												state.userType === "Worker"
													? props.services
															.filter(
																(option) =>
																	option._id !==
																	state
																		.serviceId[0]
																		._id
															)
															.map((service) => (
																<MenuItem
																	value={
																		service._id
																	}
																	key={
																		service._id
																	}
																>
																	{
																		service.serviceName
																	}
																</MenuItem>
															))
													: null}
											</TextField>
										</FormControl>
									</GridItem>
								) : null}
								{/** Client Checkbox of SubServices */}
								{clientChanges.initialUserType === "Client" &&
								state.userType === "Worker" &&
								state.subServiceId
									? props.services
											.filter(
												(option) =>
													state.serviceId &&
													option._id ===
														state.serviceId
											)
											.map((service) =>
												service.subServiceId.map(
													(item) => (
														<GridItem>
															<br />
															<FormControlLabel
																control={
																	<Checkbox
																		checked={
																			subServiceId
																				.subs[
																				item
																					._id
																			]
																		}
																		onChange={(
																			e
																		) =>
																			handleSubServiceChange(
																				item._id,
																				e
																			)
																		}
																		name="subServiceId"
																		color="primary"
																		value={
																			item._id
																		}
																	/>
																}
																label={
																	item.subServiceName
																}
															/>
														</GridItem>
													)
												)
											)
									: null}
								{/** Worker Checkbox and SubServices */}
								{clientChanges.initialUserType === "Worker" &&
								state.userType === "Worker" &&
								state.serviceId &&
								Array.isArray(state.serviceId) &&
								state.subServiceId &&
								subServiceId.initialSubServices
									? props.services
											.filter(
												(option) =>
													state.serviceId &&
													option._id ===
														state.serviceId[0]._id
											)
											.map((service) =>
												service.subServiceId.map(
													(item) => (
														<GridItem>
															<br />
															<FormControlLabel
																control={
																	<Checkbox
																		checked={subServiceId.initialSubServices.includes(
																			item._id
																		)}
																		onChange={(
																			e
																		) =>
																			handleSubServiceChange(
																				item._id,
																				e
																			)
																		}
																		name="subServiceId"
																		color="primary"
																		value={
																			item._id
																		}
																	/>
																}
																label={
																	item.subServiceName
																}
															/>
														</GridItem>
													)
												)
											)
									: clientChanges.initialUserType ===
											"Worker" &&
									  state.userType === "Worker" &&
									  state.serviceId &&
									  !Array.isArray(state.serviceId) &&
									  state.subServiceId &&
									  subServiceId.initialSubServices
									? props.services
											.filter(
												(option) =>
													option._id ===
													state.serviceId
											)
											.map((service) =>
												service.subServiceId.map(
													(item) => (
														<GridItem>
															<br />
															<FormControlLabel
																control={
																	<Checkbox
																		checked={
																			subServiceId.initialServices.toString() ===
																			state.serviceId
																				? subServiceId.initialSubServices.includes(
																						item._id
																				  )
																				: subServiceId.initialSubServices.includes(
																						item._id
																				  )
																		}
																		onChange={(
																			e
																		) =>
																			handleSubServiceChange(
																				item._id,
																				e
																			)
																		}
																		name="subServiceId"
																		color="primary"
																		value={
																			item._id
																		}
																	/>
																}
																label={
																	item.subServiceName
																}
															/>
														</GridItem>
													)
												)
											)
									: null}
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="currentPassword"
											label="Current Password"
											placeholder="xxxx"
											name="currentPassword"
											value={password.currentPassword}
											onChange={passwordChangeHandler}
										/>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="newPassword"
											label="New Password"
											placeholder="xxxxx"
											name="newPassword"
											value={password.newPassword}
											onChange={passwordChangeHandler}
										/>
									</FormControl>
								</GridItem>
								<GridItem xs={11} sm={6} md={4}>
									<FormControl fullWidth>
										<TextField
											id="confirmPassword"
											label="Confirm Password"
											placeholder="xxxxx"
											name="confirmPassword"
											value={password.confirmPassword}
											onChange={
												confirmPasswordChangeHandler
											}
											helperText={
												error
													? "Password does not match "
													: null
											}
										/>
									</FormControl>
								</GridItem>
							</GridContainer>
						</CardBody>
						<CardFooter>
							<Button
								color="primary"
								type="submit"
								style={{
									backgroundColor: "#8E24AA",
									color: "white",
								}}
							>
								Update Profile
							</Button>
						</CardFooter>
					</form>
				</Card>
			</GridItem>
		</>
	);
};

export default FormInputs;
