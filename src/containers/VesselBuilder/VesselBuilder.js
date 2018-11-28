import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Modal1 from '../../components/UI/Modal/Modal1';

import Button from '../../components/UI/Button/Button';
import Parameter from '../../components/Parameter';
import Parameter1 from '../../components/UI/Parameter/Parameter1/Parameter1';
import Parameter2 from '../../components/UI/Parameter/Parameter2/Parameter2';
import Parameter3 from '../../components/UI/Parameter/Parameter3/Parameter3';
import Parameter4 from '../../components/UI/Parameter/Parameter4/Parameter4';
import ThreeScene from '../../components/ThreeComponents/ThreeScene/ThreeScene';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import axios from '../../axios';
import Data from '../../components/UI/Data/Data';

const API_HOST = 'http://192.168.1.75:8000';
let _csrfToken = null;

async function getCsrfToken() {
  try {
    if (_csrfToken === null) {
      const response = await fetch(`${API_HOST}/api/csrf/`, {
        credentials: 'include',
      });
      const data = await response.json();
      _csrfToken = data.csrfToken;
      console.log(_csrfToken);
    }
  } catch (error) {
    console.log("Error");
  }
  return _csrfToken;
}

async function testRequest(method) {
  try {
    const response = await fetch(`${API_HOST}/api/ping/`, {
      method: method,
      headers: (
        method === 'POST'
          ? { 'X-CSRFToken': await getCsrfToken() }
          : {}
      ),
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data.result;
  } catch (error) {
    console.log("error");
  }

}

class VesselBuilder extends Component {

  state = {
    token : '',
    showParam: false,
    showParam1: true,
    showParam3: true,
    showCylinder: false,
    showEllipsoid: false,
    showNozzle: false,
    nozzle: false,
    cylinder: false,
    ellipsoid: false,
    btn1: true,
    btn2: true,
    params1: {
      material: "SA-516 70",
      ip: 200,
      temp1: 200,
      ep: 0,
      temp2: 0,
      ih: false,
      ci: 1,
      co: 0

    },
    params2: {
      hd: 0,
      mht: 0,
      sfl: 0,
      nsrt: 0,
      hr: 0
    },
    params3: {
      material: "SA-516 70",
      ip: 200,
      temp1: 200,
      ep: 0,
      temp2: 0,
      ih: false,
      ci: 1,
      co: 0
    },
    params4: {
      sd: 2,
      l: 0,
      t: 0,
      n: 1
    },
    params5: {
      mawp: 200,
      map: 241.44,
      maep: 55.67,
      sfi: 0.365,
      sfo: 0.1404,
      mdmt: 23.2,
      sfmawp: 206.61,
      sfmap: 248.14,
      sfmaep: 188.22
    },
    params6: {
      position: 'radial',
      distance: 0,
      angle: 0,
      length: 0,
      ca: 0.0,
      nps: '',
      schedule: ''
    },
    test: {
      name: "SA-516",
      "strength": 55
    },
    testGet: 0,
    testPost: 0
  }


  getRequest = () => {
    axios.get("/api/cylinder/" + 513 + "/").then(response => {
      console.log(response);
    }).catch(error => {
      this.setState({ error: true });
      //console.log(error);
    });
  }

  postRequest = (data) => {

    //const data = await testRequest('POST');

    var headers = {
      'Content-Type': 'application/json',
      'JWT': this.state.token 
  }
  console.log(this.state.token);
    axios.post("/api/data/", data, {header: headers}).then(response => {
      console.log(response);
      // console.log(response);
    });
  }

  async componentDidMount() {
    //console.log(this.props.token)
    this.setState({token : this.props.token});
    console.log("COmponentDidMount");
    this.setState({
      testGet: await getCsrfToken(),
      testPost: await getCsrfToken(),
    });
  }

  // componentDidMount() {
  //   //this.getRequest();
  //   //this.postRequest();
  //   console.log("COmponentDidMount");
  // }
  submitParamsHandler1 = (event) => {
    //this.setState({showParam: false});
    this.setState({ cylinder: false, ellipsoid: false });
    if (this.state.showCylinder) {
      this.setState({ params3: event });
      this.setState({ showParam3: false });
    } else if (this.state.showEllipsoid) {
      this.setState({ params1: event });
      this.setState({ showParam1: false });
    }
    // console.log(event)
  }

  submitParamsHandler2 = (event) => {
    // this.setState({showParam: false});
    // this.setState({showParam1: true});
    // this.setState({ellipsoid: true});
    this.setState({ cylinder: false, ellipsoid: false });
    this.setState({ params2: event });
    // this.sendDataEllipsoid();
    // console.log(event)
  }

  submitParamsHandler3 = (event) => {
    // this.setState({showParam: false});
    // this.setState({showParam3: true});

    // this.setState({cylinder: true});
    this.setState({ cylinder: false, ellipsoid: false });
    this.setState({ params4: event });
    // this.sendDataCylinder();
    // console.log(this.state);
  }

  submitParamsHandler6 = (event) => {
    console.log(event);
    this.setState({ params6: event });
  }

  cancelParamsHandler = () => {
    this.setState({ cylinder: false, ellipsoid: false });
    this.setState({ showParam: false, showCylinder: false, showEllipsoid: false, showParam1: true, showParam3: true });
  }

  previousParamsHandler = () => {
    this.setState({ cylinder: false, ellipsoid: false });
    if (this.state.showEllipsoid) {
      this.setState({ showParam1: true });
    } else if (this.state.showCylinder) {
      this.setState({ showParam3: true });
    }
  }

  resetThenSet = (id) => {
    this.setState({ cylinder: false, ellipsoid: false, nozzle: false });
    console.log(id);
    this.setState({ showParam: true });
    if (id === 0) {
      this.setState({ showParam: true, showCylinder: true, showEllipsoid: false, showNozzle: false });
    } else if (id === 1) {
      this.setState({ showParam: true, showCylinder: false, showEllipsoid: true, showNozzle: false });
    } else if (id === 2) {
      this.setState({ showParam: true, showCylinder: false, showEllipsoid: false, showNozzle: true });
    }
  }

  sendDataCylinder = () => {
    const data = {
      ...this.state.params3,
      ...this.state.params4,
      shape: "cylinder"
    }
    this.setState({ showParam: false });
    this.setState({ showParam3: true });
    this.setState({ ellipsoid: false, cylinder: true, nozzle: false });
    this.postRequest(data);
  }

  sendDataEllipsoid = () => {
    const data = {
      ...this.state.params1,
      ...this.state.params2,
      shape: "ellipsoid"
    }
    this.setState({ showParam: false });
    this.setState({ showParam1: true });
    this.setState({ ellipsoid: true, cylinder: false, nozzle: false });
    this.postRequest(data);
  }

  sendDataNozzle = () => {
    this.setState({ showParam: false });
    const data = {
      ...this.state.params6,
      shape: "nozzle"
    }
    console.log(data);
    this.setState({ ellipsoid: false, cylinder: false, nozzle: true });
    this.postRequest(data);
  }



  render() {

    // console.log("Rerendered");
    return (<Aux>
      <Modal show={this.state.showParam && this.state.showNozzle}>
        <Parameter4 label={"Nozzle"} show={true} finish6={this.sendDataNozzle} submitParams={this.submitParamsHandler6} cancelParams={this.cancelParamsHandler} />

      </Modal>
      <Modal show={this.state.showParam && this.state.showEllipsoid}>
        <Parameter1 label={"Ellipsoidal Head"} show={this.state.showParam1} submitParams={this.submitParamsHandler1} cancelParams={this.cancelParamsHandler} />
        <Parameter2 label={"Ellipsoidal Head Dimensions"} show={!this.state.showParam1} finish1={this.sendDataEllipsoid} submitParams={this.submitParamsHandler2} cancelParams={this.cancelParamsHandler} previousParams={this.previousParamsHandler} min1={0.3625} min2={0.3625} />
      </Modal>
      <Modal1 show={this.state.showParam && this.state.showEllipsoid && !this.state.showParam1}>
        <Data map={this.state.params5.map} maep={this.state.params5.maep} mawp={this.state.params5.mawp} sfi={this.state.params5.sfi} sfo={this.state.params5.sfo} sfmap={this.state.params5.sfmap} sfmawp={this.state.params5.sfmaep} sfmaep={this.state.params5.sfmawp} mdmt={this.state.params5.mdmt} />
      </Modal1>
      <Modal show={this.state.showParam && this.state.showCylinder}>
        <Parameter1 label={"Cylinder"} show={this.state.showParam3} submitParams={this.submitParamsHandler1} cancelParams={this.cancelParamsHandler} />
        <Parameter3 label={"Cylinder Dimensions"} show={!this.state.showParam3} finish2={this.sendDataCylinder} submitParams={this.submitParamsHandler3} cancelParams={this.cancelParamsHandler} previousParams={this.previousParamsHandler} min={0.3625} />
      </Modal>
      <Modal1 show={this.state.showParam && this.state.showCylinder && !this.state.showParam3}>
        <Data map={this.state.params5.map} maep={this.state.params5.maep} mawp={this.state.params5.mawp} sfi={this.state.params5.sfi} sfo={this.state.params5.sfo} sfmap={this.state.params5.sfmap} sfmawp={this.state.params5.sfmaep} sfmaep={this.state.params5.sfmawp} mdmt={this.state.params5.mdmt} />
      </Modal1>
      <Toolbar resetThenSet={this.resetThenSet} />
      <ThreeScene num={this.state.params4.n} showC={this.state.cylinder} showE={this.state.ellipsoid} showN={this.state.nozzle} data ={this.state.params6}/>

    </Aux>);
  }
}

export default VesselBuilder;
