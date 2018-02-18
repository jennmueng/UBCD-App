import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import WebApp from './webapp';
import Cred from './modules/cred/cred';

import registerServiceWorker from './registerServiceWorker';

class Main extends React.Component {

      render() {
        return (
          <Router>
            <Switch>
                <Route exact path='/' component={WebApp} />
                <Route path='/cred' component={Cred} />
            </Switch>
          </Router>
        )
      }
    }

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
