import React from "react";
import { connect } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormInputs from "components/CustomInput/FormInputs.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/faces/marc.jpg";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import Backdrop from "../../components/backdrop/backdrop";
// Redux
import * as actions from "../../store/actions/index";

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

function UserProfile(props) {
	const classes = useStyles();
	React.useEffect(() => {
		props.onFetchServices();
	}, []);

	const handleChangeSubmit = (e, data) => {
		e.preventDefault();
		const updatedData = { ...data, userId: props.userId };

		console.log("SUBMIT", updatedData);
		// props.onUpdateUser(
		// 	updatedData.userId,
		// 	updatedData.serviceId,
		// 	updatedData.subServiceId,
		// 	{ ...updatedData }
		// );
	};
	return (
		<div>
			<GridContainer>
				<FormInputs
					user={props.user}
					onSubmitData={handleChangeSubmit}
					services={props.services}
					subServices={props.services.map(
						(item) => item.subServiceId
					)}
				/>
				{props.error ? (
					<ErrorHandler
						error={props.error}
						onHandle={props.onCancel}
					/>
				) : props.updateSuccess ? (
					<ErrorHandler
						title="Account Updated"
						error={"Thank You for Updating Your Account"}
						onHandle={props.onCancel}
					/>
				) : null}
				{props.loading ? <Backdrop open={props.loading} /> : null}
				{/* <GridItem xs={12} sm={12} md={4}>
					<Card profile>
						<CardAvatar profile>
							<a
								href="#pablo"
								onClick={(e) => e.preventDefault()}
							>
								<img src={avatar} alt="..." />
							</a>
						</CardAvatar>
						<CardBody profile>
							<h6 className={classes.cardCategory}>
								CEO / CO-FOUNDER
							</h6>
							<h4 className={classes.cardTitle}>Alec Thompson</h4>
							<p className={classes.description}>
								Don{"'"}t be scared of the truth because we need
								to restart the human foundation in truth And I
								love you like Kanye loves Kanye I love Rick
								Owens’ bed design but the back is...
							</p>
							<Button color="primary" round>
								Follow
							</Button>
						</CardBody>
					</Card>
				</GridItem> */}
			</GridContainer>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		updateSuccess: state.auth.updateSuccess,
		success: state.auth.success,
		loading: state.auth.loading,
		userId: state.auth.userId,
		user: state.auth.user,
		isAuthenticated: state.auth.token !== null,
		services: state.service.services,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
		onUpdateUser: (userId, serviceId, subServiceId, userInput) =>
			dispatch(
				actions.updateUserAccount(
					userId,
					serviceId,
					subServiceId,
					userInput
				)
			),
		onCancel: () => dispatch(actions.onCancel()),
		onFetchServices: () => dispatch(actions.initServices()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
