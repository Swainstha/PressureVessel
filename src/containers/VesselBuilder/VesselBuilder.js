import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Parameter from '../../components/Parameter';

class VesselBuilder extends Component {
    state = {
        showParam : false
    }

    showBuildParams = () => {
        this.setState({showParam: true});
    }

    submitParamsHandler = () => {
        this.setState({showParam: false});
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