import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import './cred.css';
import credBg from '../components/top-wallpaper.svg';
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
          <img className="cred_wallpaper" src={credBg} alt=""/>
      </div>
    );
  }
}

export default withRouter(Cred);