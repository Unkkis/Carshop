import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Addcar from "./Addcar";
import Editcar from "./Editcar";
import DeleteCarButton from './DeleteCarButton'


export default function Carlist() {
    const [cars, setCars] = useState([]);

    const [isReady, setReady] = useState(false);
    const [open, setOpen] = useState(false);
    
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
    }

    
    const deleteCar = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
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
        { field: '_links.self.href', headerName: 'Edit', cellRenderer: Editcar, width: 100 },
        { field: '_links.self.href', headerName: 'Delete', cellRenderer: DeleteCarButton, width: 100 }

    ]);
   
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
   
    if (!isReady){
        return <p>Loading....</p>
    }
    else {
    return (
        
        <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
            <Addcar saveCar={saveCar} />
            <AgGridReact
                rowData={cars}
                columnDefs={columns}
                context={[updateCar, deleteCar]}
                >
            </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Car deleted!"
                action={action}
            />
        </div>
        
    );
    }
}