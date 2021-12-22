import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ServiceTable from "components/ServiceTable/ServiceTable.js";
import SubServiceTable from "components/ServiceTable/SubServiceTable.js";
// import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


const styles = {
  formControl: {
    marginTop: '10px',
    minWidth: '20ch',
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  button: {
    backgroundColor: '#0E3D51',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0E3D51',
      color: 'white'
    }
  }
};

const useStyles = makeStyles(styles);

export default function ViewServices() {
  const classes = useStyles();
  const [serviceId, setServiceId] = React.useState("");
  const [subServiceId, setSubServiceId] = React.useState([]);
  const [stateData, setData] = React.useState({
    stateErrors: [],
    stateResults: [],
    services: [],
    subServices: [],
  });
  // const [test, setTest] = React.useState([
  //   {
  //     _id: "da3223",
  //     serviceName: "Massage",
  //     subServiceId: [
  //       {
  //         _id: "dah3892",
  //         subServiceName: "Reflexology",
  //         price: "5000"
  //       },
  //       {
  //         _id: "dah3899",
  //         subServiceName: "Swedish",
  //         price: "5000"
  //       }
  //     ]
  //   },
  //   {
  //     _id: "da3245",
  //     serviceName: "Cleaning",
  //     subServiceId: [
  //       {
  //         _id: "dah7792",
  //         subServiceName: "Garden",
  //         price: "5000"
  //       },
  //       {
  //         _id: "dah78882",
  //         subServiceName: "Mopping",
  //         price: "5000"
  //       }
  //     ]
  //   }
  // ]);
  // const [sub, setSub] = React.useState([
  //   {
  //     _id: "dah3892",
  //     subServiceName: "Reflexology",
  //     price: "5000",
  //     serviceId: [
  //       {
  //         _id: "da3223",
  //         serviceName: "Massage",
  //       }
  //     ]
  //   },
  //   {
  //     _id: "dah3899",
  //     subServiceName: "Swedish",
  //     price: "5000",
  //     serviceId: [
  //       {
  //         _id: "da3223",
  //         serviceName: "Massage",
  //       }
  //     ]
  //   },
  //   {
  //     _id: "dah7792",
  //     subServiceName: "Garden",
  //     price: "5000",
  //     serviceId: [
  //       {
  //         _id: "da3245",
  //         serviceName: "Cleaning",
  //       }
  //     ]
  //   },
  //   {
  //     _id: "dah78882",
  //     subServiceName: "Mopping",
  //     price: "5000",
  //     serviceId: [
  //       {
  //         _id: "da3245",
  //         serviceName: "Cleaning",
  //       }
  //     ]
  //   }
  // ])
  const dataError = [];
  React.useEffect(() => {
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
    async function getServices () {
      await fetch("http://localhost:8080/graphql", {
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
          dataError.push({message: "Check your Internet Connection Services not Found"});
          setData(stateData.stateErrors.concat(dataError));
          throw new Error('Service Not Available!');
        }
        setData({
          services: resData.data.viewServices.services,
          //subServices: resData.data.viewServices.services.map(item => item.subServiceId)
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
    getServices();
  }, [serviceId]);

  const handleServiceChange = (event) => {
    let findService = stateData.services.find((item) => item._id === event.target.value);
    setServiceId(findService._id);
    setSubServiceId(findService.subServiceId);
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Services</h4>
            {/*<p className={classes.cardCategoryWhite}>
              Click to View its Sub-Services 
            </p>*/}
          </CardHeader>
          <CardBody>
          {stateData.services ? (
            <ServiceTable
              tableHeaderColor="primary"
              //tableHead={[{id: "ID", field: "id"}, {serviceName: "Service Name", "Action"]}
              tableSubHead={["ID", "Sub-Service Name", "Min-Price", "Order", "Action"]}
              //tableData={stateData.services}
              tableTest={stateData.services}
              colors={classes.button}
              adminView = "admin"
              sub="subService"
            />
          ) : null}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              List of  Sub Services
            </h4>
            {/*<p className={classes.cardCategoryWhite}>
              Select a Service in Text Field below to see its Sub Services on a Table
            </p>*/}
          </CardHeader>
          <Grid item className="gridItem">
          {stateData.services ? (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
             <Select
              labelId="Service Name"
              id="serviceName"
              onChange={handleServiceChange}
              value={serviceId || ""}
              name="serviceId"
            >
               {stateData.services.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.serviceName}
                </MenuItem>
              )) }
            </Select>
          </FormControl> ) : null }
         
        </Grid>
          <CardBody>
            <SubServiceTable
              tableHeaderColor="primary"
              tableHead={["ID", "Sub-Service Name", "Min-Price", "Order", "Action"]}
              //tableData={subServiceId}
              tableTest={subServiceId} 
              colors={classes.button} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
