import React from "react";
import Button from '@mui/material/Button';

export default function DeleteButtonRenderer(props) {
  
    const link = props.value;
    
    
    const buttonClicked = () => {
        if (window.confirm('Are you sure?')){
            props.context[1](link);
        }
    };
 
    return (
    
      <span>
        <Button variant="contained" color="error" size="small" onClick={() => buttonClicked()}>Delete</Button>
      </span>
      
    );
};