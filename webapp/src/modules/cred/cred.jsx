import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import './login.css';
import Login from './login';
import Register from './register';
import langStore from '../../reducers/langStore'
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Cred extends Component {
  componentDidMount() {
    
  }
  switchLanguage = () => {
    if (langStore.getState() === 'en_US')  {
      langStore.dispatch({ type : "TH"});
    } else {
      langStore.dispatch({ type : "en_US"});
    }
  }
  render() {
    return (
      <div className="cred">
        <Switch>
            <Route path='/cred/login' component={Login} />
            <Route path='/cred/sign-up' component={Register} />
        </Switch>
        <button onClick={this.switchLanguage}>Change Language</button>
      </div>
    );
  }
}

export default withRouter(Cred);