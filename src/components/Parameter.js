import React,{Component} from 'react';
import Aux from '../hoc/Aux/Aux';
import Input from './UI/Input/Input';
import Button from '../components/UI/Button/Button';
import classes from './Parameter.css';
const inputVar = [
    {label:'Height', type:'h'},
    {label:'Diameter', type:'d'},
    {label:'Pressure', type:'p'}
]

class Parameter extends Component {

    state = {
        params: {
            h: 0,
            d: 0,
            p: 0
        },
    }
    inputChangeHandler = (event) => {
        const updatedParams = {
            ...this.state.params
        };
        updatedParams[event.target.name] = event.target.value;
        this.setState({params:updatedParams});
    }

    render() {
        return(
            <Aux>
            <form>  
            {inputVar.map(invar => (
                <div key={invar.label}>
                    <label className={classes.Label}>{invar.label}</label>
                    <input name={invar.type} type="number" placeholder="0.0" className={classes.InputElement}
                        onChange= {this.inputChangeHandler} />
                 </div>
            ))
            }
            </form>
            <Button btnType="Success" clicked={() => this.props.submitParams(this.state.params)}>SUBMIT</Button>
            <Button btnType="Danger" clicked={this.props.cancelParams}>CANCEL</Button>
            </Aux>
        );
    }
}

export default Parameter;