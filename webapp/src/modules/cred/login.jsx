import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import './login.css';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }
    handleEmail = (event) =>  {
        this.setState({email: event.target.value});
    }
    handlePass = (event) =>  {
        this.setState({password: event.target.value});
    }
    
    handleSubmit = (event) => {
        axios.post('/api/cred/login', {
            email : this.state.email,
            password : this.state.password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        event.preventDefault();
    }
    
  render() {
    return (
      <div className="loginPage">
        <form onSubmit={this.handleSubmit}>
            <input name="email" type="text" value={this.state.email} onChange={this.handleEmail}/>
            <input name="password" type="password" value={this.state.password} onChange={this.handlePass}/>
            <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
