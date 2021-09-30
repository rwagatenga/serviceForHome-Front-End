import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "components/CustomButtons/Button.js";

// const styles = {
// };

// const useStyles = makeStyles(styles);

export default function Buttons(props) {
	// const classes = useStyles();
	const orderCart = (carts) => {
		props.orderCart(carts);
	};
	return (
	  <Button 
	  	color="primary"
	  	onClick={e => orderCart(props.carts)}
	  	disable={(props.orders == "undefined"  
        && props.orders == null  
        && props.orders.length == null  
        && props.orders.length == 0
      )}
	  >
	  	Order
	  </Button>
	)
};