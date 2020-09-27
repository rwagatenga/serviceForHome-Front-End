import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo(props) {
  const [state, setState] = React.useState({
    columns: [
      // { title: 'ID', field: '_id' },
      { title: 'Sub Service Name', field: 'subServiceName' },
      { title: 'Price', field: 'price' },
      // {
      //   title: 'Service Name',
      //   field: 'serviceId',
      //   lookup: props.tableTest.serviceId
      // },
    ],
    data: props.tableTest
    // [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   {
    //     name: 'Zerya Betül',
    //     surname: 'Baran',
    //     birthYear: 2017,
    //     birthCity: 34,
    //   },
    // ],
  });

  React.useEffect(() => {
    function getServices () {
      setState({
        data: [...props.tableTest]
      });
    }
    getServices();
  }, [props.tableTest]);
  console.log(state.data);
  return (
    <MaterialTable
      title="List of Sub Services"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}