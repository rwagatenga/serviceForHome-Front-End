import React from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,16);
  });

export default function CustomEditComponent(props) {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: 'Service Name', field: 'serviceId', editable: 'never'},
    { title: 'Sub-Service Name', field: 'subServiceId', editable: 'never'},
    { title: 'Price', field: 'price'},
    {
      title: 'Duration', field: 'duration',
      editComponent: props => (
        <TextField
            id="datetime-local"
            label="Date and Time"
            type="datetime-local"
            defaultValue={new Date(props.tableTest.map(item => item.price)).toDateInputValue()}
            onChange={e => props.onChange(e.target.value)}
            //onChange={handleChange('duration')}
            value={props.value}
            //value={values.duration}
            name="duration"
            //className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
      )
    },
    { title: 'Description', field: 'description' }
  ]);

  const [data, setData] = useState([
    props.tableTest.map(item => ({
      clientId: '',
      serviceId: '',
      subServiceId: '',
      price: '',
      duration: '',
      description: ''
    }))
  ]);
  return (
    <MaterialTable
      title="List of Orders in Your Cart"
      columns={columns}
      data={props.tableData.map(prop => prop.orders.map(item => ({
        serviceId: item.serviceId.map(prop => prop.serviceName),
        subServiceId: item.subServiceId.map(prop => prop.subServiceName),
        price: item.price,
        duration: item.duration,
        description: item.description
      })))}
      options={{
        rowStyle: {
          fontSize: 15,
          fontFamily: 'cursive',
        }
      }}
      style={{fontFamily: 'cursive'}}
      editable={{
        // onRowAdd: newData =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       setData([...data, newData]);
              
        //       resolve();
        //     }, 1000)
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000)
          }),
      }}
    />
  )
}
