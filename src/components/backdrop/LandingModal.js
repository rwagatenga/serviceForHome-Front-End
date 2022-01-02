import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function LandingModal(props) {
	const [open, setOpen] = React.useState(false);
	const [copy, setCopy] = React.useState(false);
	const [value, setValue] = React.useState(props.tel);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			{/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>*/}
			<Dialog
				open={props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={props.close}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				{/* <DialogTitle id="alert-dialog-slide-title">
					
				</DialogTitle> */}
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
                        { props.children }
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.close} color="primary" autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
