import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import Button from '../../Button/Button';
import classes from './Parameter4.css';
import Select from 'react-select';
const inputVar = [
    { label: 'Shell Diameter', type: 'number', id: 1 },
    { label: 'Length', type: 'number', id: 2 },
    { label: 'Thickness', type: 'number', id: 3 }
]

class Parameter3 extends Component {

    state = {
        params: {
            position: 'radial',
            offset: 0.0,
            distance: 0,
            angle: 0,
            length: 0,
            ca: 0.0,
            nps: '',
            schedule: ''
        },
        showNext: false
    }
    inputHandler = (event) => {
        console.log(event.target.value);
        const updatedParams = {
            ...this.state.params
        };
        updatedParams[event.target.name] = event.target.value;
        this.setState({ params: updatedParams });
    }

    materialHandler1 = (event) => {
        console.log(event);
        const updatedParams = {
            ...this.state.params
        };
        updatedParams['nps'] = event.value;
        // console.log(updatedParams);
        this.setState({ params: updatedParams });
    }

    materialHandler2 = (event) => {
        console.log(event);
        const updatedParams = {
            ...this.state.params
        };
        updatedParams['schedule'] = event.value;
        // console.log(updatedParams);
        this.setState({ params: updatedParams });
    }

    render() {

        const opts1 = [
            { value: '10', label: 'NPS 10' },
            { value: '8', label: 'NPS 8' }
        ];

        const opts2 = [
            { value: 'XS', label: 'XS' },
            { value: '80S', label: '80S' }
        ];

        let form = null;
        if (this.props.show) {
            form = (
                <div>
                    <div className={classes.Input}>
                        <label className={classes.Label2}>{this.props.label}</label>
                    </div>
                    <form>
                        <div className={classes.Input} >
                            <label className={classes.Label}>NPS</label>
                            <Select className={classes.Input2} name='nps' options={opts1}
                                onChange={this.materialHandler1} />
                        </div>

                        <div className={classes.Input} >
                            <label className={classes.Label}>Schedule</label>
                            <Select className={classes.Input2} name='schedule' options={opts2}
                                onChange={this.materialHandler2} />
                        </div>

                        <div className={classes.Input}>
                            <label className={classes.Label}>Corrosion Allowance</label>
                            <input name="ca" type="number" placeholder="0.0" className={classes.InputElement}
                                onChange={this.inputHandler} />
                        </div>

                        <div className={classes.Input}>
                            <input type="radio" name="position" value="radial" checked={this.state.params.position === 'radial'} onChange={this.inputHandler} />Radial<br />
                            <input type="radio" name="position" value="offset" checked={this.state.params.position === 'offset'} onChange={this.inputHandler} />Offset<br />
                        </div>
                        <div className={classes.Input}>
                            <label className={classes.Label}>Offset</label>
                            <input name="offset" type="number" placeholder="0.0" className={classes.InputElement}
                                onChange={this.inputHandler} /> -0.3 to 0.3
                        </div>
                        <div className={classes.Input}>
                            <label className={classes.Label}>Length</label>
                            <input name="length" type="number" placeholder="0.0" className={classes.InputElement}
                                onChange={this.inputHandler} />
                        </div>

                        <div className={classes.Input}>
                            <label className={classes.Label}>Distance</label>
                            <input name="distance" type="number" placeholder="0.0" className={classes.InputElement}
                                onChange={this.inputHandler} />
                        </div>
                        <div className={classes.Input}>
                            <label className={classes.Label}>Angle</label>
                            <input name="angle" type="number" placeholder="0.0" className={classes.InputElement}
                                onChange={this.inputHandler} />
                        </div>


                    </form>
                    <Button btnType="Success" clicked={() => this.props.submitParams(this.state.params)}>Submit</Button>
                    <Button btnType="Success" disabled={this.props.btndisabled} clicked={this.props.finish6}>Finish</Button>
                    <Button btnType="Danger" disabled={!this.props.btndisabled} clicked={this.props.cancelParams}>Cancel</Button>

                </div>
            );
        } else {
            form = null;
        }
        return (
            <Aux>
                {form}
            </Aux>
        );
    }
}

export default Parameter3;
