import React, { useState, useEffect, set } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Carlist() {
    const [cars, setCars] = useState([]);

    const [isReady, setReady] = useState(false);
    
    useEffect(() => fetchData(), []);
  
    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => {
        setCars(data._embedded.cars)
        setReady(true);
        console.log(cars);
        })
    }

    const columns = [
        { field: "brand", headerName: "Brand" },
        { field: "model" }
    ]

    if (!isReady){
        return <p>Loading....</p>
    }
    else {
    return (
        
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact
            columDefs={columns}
            rowData={cars}>
            </AgGridReact>
        </div>
        
    );
    }
}