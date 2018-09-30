import React from 'react';
import classes from './NavigationSelect.css';
import Select from 'react-select';

let opts = [
    {value:"Cylinder", label: "Cylinder"},
    {value:"Ellipsoidal Head", label: "Ellipsoidal Head"}
]

const navigationItem =(props) => (
    
    <li className={classes.NavigationItem}>
        <Select options={opts} value={props.children}/>
    </li>

);

export default navigationItem;