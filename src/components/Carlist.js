import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Addcar from "./Addcar";
import Editcar from "./Editcar";
import DeleteCarButton from './DeleteCarButton'
import SnackbarRenderer from "./SnackbarRenderer";


export default function Carlist() {
   
    const [cars, setCars] = useState([]);
    const [isReady, setReady] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => fetchData(), []);
  
    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => {
        setCars(data._embedded.cars)
        setReady(true);
        })
    } 

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage("New car added");
        setOpen(true);
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage("Car details Updated");
        setOpen(true);
    }

    
    const deleteCar = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage("Car Deleted");
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [columns] = useState([
        { field: 'brand', filter: true, sortable: true },
        {field: 'model', filter: true, sortable: true },
        { field: 'color', filter: true, sortable: true },
        { field: 'fuel', filter: true, sortable: true },
        { field: 'year', filter: true, sortable: true },
        { field: 'price', sortable: true },
        { field: '_links.self.href', headerName: 'Edit', cellRenderer: row => <Editcar updateCar={updateCar} car={row.data}/>, width: 100 },
        { field: '_links.self.href', headerName: 'Delete', cellRenderer: row => <DeleteCarButton deleteCar={deleteCar} link={row.data._links.self.href} />, width: 100 }

    ]);
   
  
    if (!isReady){
        return <p>Loading....</p>
    }
    else {
    return (
        
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
            <Addcar saveCar={saveCar} />
            <AgGridReact
                rowData={cars}
                columnDefs={columns}
                >
            </AgGridReact>
            <SnackbarRenderer open={open} handleClose={handleClose} message={message}  />
        </div>
        
    );
    }
}