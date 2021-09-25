import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './App.css';

export default function Hello() {

  const [columns, setColumns] = useState([
    { title: 'Full Name', field: 'name'},
    { title: 'Username', field: 'username'},
    { title: 'Email', field: 'email'},
    { title: 'Website', field: 'website', type: 'link'},
    { title: 'Phone', field: 'phone'}
    
  ]);

  // const [data, setData] = useState([
  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  //   ]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])
  if (notes === 0) {
    return(
      <h1>Loading</h1>
      )
  } else {
    return(
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="User Information"
          columns={columns}
          data={notes}
          editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setNotes([...notes, newData]);
                resolve();
              }, 1000)
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...notes];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setNotes([...dataUpdate]);

                resolve();
              }, 1000)
            }),
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...notes];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setNotes([...dataDelete]);

                resolve()
              }, 1000)
            }),
          }}
        />
      </div>

    )
}
  }
  
