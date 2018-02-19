import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import './login.css';
import Login from './login';
import Register from './register';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Cred extends Component {
  static get defaultProps() {
    return {
      language : 'en_US'
    }
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="cred">
        <Switch>
            <Route path='/cred/login' component={() => <Login language={this.props.language}/>} />
            <Route path='/cred/sign-up' component={() => <Register language={this.props.language}/>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Cred);