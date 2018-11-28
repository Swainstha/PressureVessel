import React, { Component } from 'react';
import './App.css';
import VesselBuilder from './containers/VesselBuilder/VesselBuilder';
import SignIn from './containers/SignIn/SignIn';
import axios from './axios';
class App extends Component {

  state = {
    user: {
      username: "",
      password: ""
    },
    token: '',
    show: true
  }

  loginHandler = (e, event) => {
    console.log("Inside Sign In in App.js");
    e.preventDefault();
    this.setState({ user: event });
    const data = {
      ...event
    }
    axios.post("/token-auth/", data).then(response => {
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.token);
        this.setState({ token: response.data.token, show: true });
      }
    });
  }


  render() {

    let data = <SignIn handle_login={this.loginHandler} />;
    // let data = <SignIn  />

    if (this.state.show) {
      data = <VesselBuilder token = {this.state.token} />
    }


    return (
      <div >
        {data}

      </div>
    );
  }
}

export default App;
