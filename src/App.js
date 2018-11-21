import React, { Component } from 'react';
import './App.css';
import VesselBuilder from './containers/VesselBuilder/VesselBuilder';
import SignIn from './containers/SignIn/SignIn';
class App extends Component {

  state = {
    user : {
      name : "",
      pwd : ""
    },
    show : false
  }

  handler = (event) => {
    console.log("Logged In");
    this.setState({show: true});
  }
  render() {

    let data = <SignIn signInHandler={this.handler} />;
      
    if(this.state.show) {
      data = <VesselBuilder/>
    }


    return (
      <div >
        {data}
        
      </div>
    );
  }
}

export default App;
