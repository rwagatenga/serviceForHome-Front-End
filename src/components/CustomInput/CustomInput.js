import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
	const classes = useStyles();
	const {
		formControlProps,
		labelText,
		id,
		labelProps,
		inputProps,
		error,
		success,
		name,
	} = props;
	const [state, setState] = React.useState({
		firstName: "",
		lastName: "",
	});
	const [values, setValues] = React.useState("");
	const labelClasses = classNames({
		[" " + classes.labelRootError]: error,
		[" " + classes.labelRootSuccess]: success && !error,
	});
	const underlineClasses = classNames({
		[classes.underlineError]: error,
		[classes.underlineSuccess]: success && !error,
		[classes.underline]: true,
	});
	const marginTop = classNames({
		[classes.marginTop]: labelText === undefined,
	});
	let inputElement = null;
	return (
		<FormControl
			{...formControlProps}
			className={formControlProps.className + " " + classes.formControl}
		>
			{labelText !== undefined ? (
				<InputLabel
					className={classes.labelRoot + labelClasses}
					htmlFor={id}
					{...labelProps}
					//value={value}
				>
					{labelText}
				</InputLabel>
			) : null}
			{id === "service-name" ? (
				<Select
					classes={{
						root: marginTop,
						disabled: classes.disabled,
						underline: underlineClasses,
					}}
					//onChange={handleServiceChange}
					//value={serviceId || ""}
					name="serviceId"
				>
					<MenuItem>Service</MenuItem>
				</Select>
			) : (
				<Input
					classes={{
						root: marginTop,
						disabled: classes.disabled,
						underline: underlineClasses,
					}}
					id={id}
					//name={name}
					//value={props.value}
					//onChange={handleChangeInput}
					{...inputProps}
				/>
			)}
			{error ? (
				<Clear
					className={classes.feedback + " " + classes.labelRootError}
				/>
			) : success ? (
				<Check
					className={
						classes.feedback + " " + classes.labelRootSuccess
					}
				/>
			) : null}
		</FormControl>
	);
}

CustomInput.propTypes = {
	labelText: PropTypes.node,
	labelProps: PropTypes.object,
	id: PropTypes.string,
	inputProps: PropTypes.object,
	formControlProps: PropTypes.object,
	error: PropTypes.bool,
	success: PropTypes.bool,
};
