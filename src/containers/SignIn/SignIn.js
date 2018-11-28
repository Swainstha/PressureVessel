import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios';
import classes from './SignIn.css';
class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  // handle_login(e) {
  //   e.preventDefault();
  //     const data = {
  //         ...this.state
  //     }
  //   axios.post("/token-auth/", data).then(response => {
  //       console.log(response.data);
  //     });
  // }

  render() {
    return (
      // <form onSubmit={(e) => this.handle_login(e)}>
      <div className={classes.LoginForm}>
      <form onSubmit={(e) => this.props.handle_login(e, this.state)}>
        <h4>Log In</h4>
        <div className={classes.Login}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        </div>
        <div className={classes.Login}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        </div>
        <input type="submit" />
      </form>
      </div>
    );
  }
}

export default LoginForm;

// LoginForm.propTypes = {
//   handle_login: PropTypes.func.isRequired
// };