import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Parameter from '../../components/Parameter';
import Parameter1 from '../../components/UI/Parameter/Parameter1/Parameter1';
import Parameter2 from '../../components/UI/Parameter/Parameter2/Parameter2';
import Parameter3 from '../../components/UI/Parameter/Parameter3/Parameter3';
import ThreeScene from '../../components/ThreeComponents/ThreeScene/ThreeScene';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import axios from '../../axios';
class VesselBuilder extends Component {
    state = {
        showParam : false,
        showParam1: true,
        showParam3: true,
        showCylinder: false,
        showEllipsoid: false,
        cylinder: false,
        ellipsoid: false,
        params1: {
            material: "",
            ip: 0,
            temp1:0,
            ep: 0,
            temp2:0,
            ih: false,
            ci: 0,
            co: 0
            
        },
        params2: {
            hd: 0,
            mht: 0,
            sfl: 0,
            nsrt: 0,
            hr: 0,
        },
        params3: {
            material: "",
            ip: 0,
            temp1:0,
            ep: 0,
            temp2:0,
            ih: false,
            ci: 0,
            co: 0
        },
        params4: {
            sd: 0,
            l: 0,
            t: 0
        }
    }

    // showBuildParams = () => {
    //     this.setState({showParam: true});
    // }

    submitParamsHandler1 = (event) => {
        //this.setState({showParam: false});
        
        if(this.state.showCylinder) {
            this.setState({params3:event});
            this.setState({showParam3: false});
        } else if(this.state.showEllipsoid) {
            this.setState({params1 :event});
            this.setState({showParam1: false});
        }
        // console.log(event)
    }

    submitParamsHandler2 = (event) => {
        this.setState({showParam: false});
        this.setState({showParam1: true});
        this.setState({params2:event});
        this.setState({ellipsoid: true});
        // console.log(event)
    }

    submitParamsHandler3 = (event) => {
        this.setState({showParam: false});
        this.setState({showParam3: true});
        this.setState({params4:event});
        this.setState({cylinder: true});
        console.log(this.state);
    }

    cancelParamsHandler = () => {
        this.setState({showParam: false,showCylinder:false, showCylinder:false});
    }

    previousParamsHandler = () => {
        if(this.state.showEllipsoid) {
        this.setState({showParam1: true});
        } else if(this.state.showCylinder) {
            this.setState({showParam3: true});
        }
    }

    resetThenSet= (id) => {
        this.setState({showParam: true});
        if(id === 0) {
            this.setState({showParam: true,showCylinder: true,
            showEllipsoid: false});
        } else if(id === 1) {
            this.setState({showParam: true,showCylinder: false,
                showEllipsoid: true});
        }
        
    }

    getRequest = () => {
        axios.get("/polls/" + 5)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
              this.setState({error: true});
              //console.log(error);
          });
    }

    postRequest = () => {
        axios.post("/polls/",this.state)
            .then(response => {
                console.log(response);
            });
    }
    
    render() {

        // console.log("Rerendered");
        return(
            <Aux>
                <Modal show={this.state.showParam && this.state.showEllipsoid}>
                    <Parameter1
                        show = {this.state.showParam1} 
                        submitParams = {this.submitParamsHandler1}
                        cancelParams = {this.cancelParamsHandler}
                        />
                    <Parameter2 
                        show = {!this.state.showParam1} 
                        submitParams = {this.submitParamsHandler2}
                        cancelParams = {this.cancelParamsHandler}
                        previousParams = {this.previousParamsHandler}
                        min1 = {0.3625}
                        min2 = {0.3625}
                        />
                </Modal>
                <Modal show={this.state.showParam && this.state.showCylinder}>
                    <Parameter1
                        show = {this.state.showParam3} 
                        submitParams = {this.submitParamsHandler1}
                        cancelParams = {this.cancelParamsHandler}
                        />
                    <Parameter3 
                        show = {!this.state.showParam3} 
                        submitParams = {this.submitParamsHandler3}
                        cancelParams = {this.cancelParamsHandler}
                        previousParams = {this.previousParamsHandler}
                        min = {0.3625}
                        />
                </Modal>
                <Toolbar 
                resetThenSet={this.resetThenSet}/>
                <ThreeScene showC={this.state.cylinder} showE={this.state.ellipsoid}/>
                {/* <Button btnType="Success" clicked={this.showBuildParams}>BUILD</Button> */}

            </Aux>
        );
    }
}

export default VesselBuilder;