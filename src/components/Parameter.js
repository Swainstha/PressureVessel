import React,{Component} from 'react';
import Aux from '../hoc/Aux/Aux';
import Input from './UI/Input/Input';
import Button from '../components/UI/Button/Button';

const inputVar = [
    {label:'Height', type:'height'},
    {label:'Diameter', type:'diameter'},
    {label:'Pressure', type:'pressure'}
]

const Parameter = (props) => (

    <div>    
    {inputVar.map(invar => (
        <Input
            key={invar.label}
            label={invar.label}
            value={invar.value}
            submit = {() => props.valueSubmit(invar.label)} />
    ))

    }
    <Button btnType="Success" clicked={props.submitParams}>SUBMIT</Button>
    <Button btnType="Danger" clicked={props.cancelParams}>CANCEL</Button>
    </div>
);

export default Parameter;