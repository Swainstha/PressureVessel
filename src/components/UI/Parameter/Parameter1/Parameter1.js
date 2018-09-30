import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import Button from '../../Button/Button';
import classes from './Parameter1.css';
const inputVar = [
    { label: 'Material', type: 'dropdown', id: 1 },
    { label: 'Internal Pressure', type: 'number', id: 2 },
    { label: 'External Pressure', type: 'number', id: 3 },
    { label: 'Height', type: 'number', id: 4 },
    { label: 'Internal Head', type: 'checkbox', id: 5 },
    { label: 'Corrosion Inner', type: 'number', id: 6 },
    { label: 'Corrosion Outer', type: 'number', id: 7 }
]

class Parameter1 extends Component {

    state = {
        params: {
            material: 0,
            ip: 0,
            temp1: 0,
            ep: 0,
            temp2: 0,
            height: 0,
            ih: false,
            ci: 0,
            co: 0
        },
        showNext: false
    }
    materialHandler = (event) => {
        const updatedParams = {
            ...this.state.params
        };
        updatedParams[event.target.name] = event.target.value;
        this.setState({ params: updatedParams });
    }

    render() {

        let form = null;
        if (this.props.show) {
            form = (
                <div>
                    <form>
                        <div className={classes.Input}>
                            <div className={classes.Input}>
                                <label className={classes.Label}>Internal Pressure</label>
                                <input name="ip" type="text" placeholder="0.0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                            <div className={classes.Input}>
                                <label className={classes.Label}>@</label>
                                <input name="temp1" type="number" placeholder="0.0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                        </div>

                        <div className={classes.Input}>
                            <div className={classes.Input}>
                                <label className={classes.Label}>External Pressure</label>
                                <input name="op" type="text" placeholder="0.0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                            <div className={classes.Input}>
                                <label className={classes.Label}>@</label>
                                <input name="temp2" type="number" placeholder="0.0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                        </div>

                        <div className={classes.Input}>
                            <label className={classes.Label1}>Corrosion</label>
                            <div className={classes.Input}>
                                <label className={classes.Label}>Internal</label>
                                <input name="ic" type="text" placeholder="0.0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                            <div className={classes.Input}>
                                <label className={classes.Label}>External</label>
                                <input name="ec" type="number" placeholder="0.0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                        </div>

                        <div className={classes.Input}>
                            <div className={classes.Input}>
                                <label className={classes.Label}>Internal Head</label>
                                <input name="ih" type="checkbox" placeholder="0" className={classes.InputElement}
                                    onChange={this.materialHandler} />
                            </div>
                        </div>

                    </form>
                    <Button btnType="Success" clicked={() => this.props.submitParams(this.state.params)}>NEXT</Button>
                    <Button btnType="Danger" clicked={this.props.cancelParams}>CANCEL</Button>
                </div>
            );

        }
        return (
            <Aux>
                {form}
            </Aux>
        );
    }
}

export default Parameter1;