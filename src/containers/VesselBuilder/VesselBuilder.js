import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Parameter from '../../components/Parameter';
import Cylinder from '../../components/ThreeComponents/Cylinder';
class VesselBuilder extends Component {
    state = {
        showParam : false,
        params: {
            h: 0,
            d: 0,
            p: 0
        }
    }

    showBuildParams = () => {
        this.setState({showParam: true});
    }

    submitParamsHandler = (event) => {
        this.setState({showParam: false});
        this.setState({params:event});
        console.log(event)
    }

    cancelParamsHandler = () => {
        this.setState({showParam: false});
    }
    
    render() {

        return(
            <Aux>
                <Modal show={this.state.showParam}>
                    <Parameter 
                        submitParams = {this.submitParamsHandler}
                        cancelParams = {this.cancelParamsHandler}
                        />
                </Modal>
                <Button btnType="Success" clicked={this.showBuildParams}>BUILD</Button>

            </Aux>
        );
    }
}

export default VesselBuilder;