import React from "react";
import Button from '@mui/material/Button';

export default function DeleteButtonRenderer(props) {
  
    const link = props.value;
    
    
    const buttonClicked = () => {
        if (window.confirm('Are you sure?')){
            console.log(props)
       //     fetch(link, {method: 'DELETE'})
       //     .then(res => fetchData())
       //     .catch(err => console.error(err))
            props.deleteCar();
        }
    };
 
    return (
    
      <span>
        <Button variant="contained" color="error" size="small" onClick={() => buttonClicked()}>Delete</Button>
      </span>
      
    );
};