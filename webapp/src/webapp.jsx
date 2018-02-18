import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import './webapp.css';
import bg from './modules/components/screenbg.svg';
import Dashboard from './modules/dashboard/dashboard';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class WebApp extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="webapp">
        <header>
          <FaIcon className="headerCheckIn" icon={faMapMarkerAlt}/>
          <svg className="headerLogo" viewBox="0 0 980.9 120.92">
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path class="cls-1" d="M196.27 120.92H81A81 81 0 0 1 0 40V7.4a5.54 5.54 0 0 1 5.55-5.54h19a5.54 5.54 0 0 1 5.54 5.54V40A50.87 50.87 0 0 0 81 90.82h85.21a5.39 5.39 0 0 0 5.39-5.39V7.25a5.39 5.39 0 0 1 5.4-5.39h19.3a5.39 5.39 0 0 1 5.4 5.39v108.27a5.4 5.4 0 0 1-5.43 5.4zM471.57 37.74C471.57 16.93 453.16 0 430.52 0H275a5.09 5.09 0 0 0-5.09 5.09v110.74a5.09 5.09 0 0 0 5.09 5.09h155.52c22.64 0 41.05-17 41.05-37.76a35.64 35.64 0 0 0-8.28-22.7 35.66 35.66 0 0 0 8.28-22.72zm-41.05-12.9a11.61 11.61 0 0 1 11.34 14A11.78 11.78 0 0 1 430.2 48H305.08a5.08 5.08 0 0 1-5.08-5.07v-13a5.09 5.09 0 0 1 5.09-5.09zm-.64 66h-124.8a5.09 5.09 0 0 1-5.08-5.1v-13a5.09 5.09 0 0 1 5.09-5.09h125.43a11.58 11.58 0 0 1 11.57 12.16c-.3 6.29-5.92 11.02-12.21 11.02zM712.65 118.06a5.4 5.4 0 0 1-4.76 2.86H596.24c-40.47 0-73.4-27.13-73.4-60.46S555.77 0 596.24 0h124.69a3.73 3.73 0 0 1 3.29 5.48l-11.57 21.75a5.4 5.4 0 0 1-4.76 2.86H596.24c-22.31 0-40.46 13.62-40.46 30.37s18.15 30.36 40.46 30.36h124.69a3.73 3.73 0 0 1 3.29 5.48zM913.85 120.92H785a5.75 5.75 0 0 1-5.75-5.75V5.74A5.74 5.74 0 0 1 785 0h128.85c37 0 67 27.12 67 60.46s-30.03 60.46-67 60.46zM809.32 85.08a5.75 5.75 0 0 0 5.75 5.74h98.78c20.38 0 37-13.62 37-30.36s-16.58-30.37-37-30.37h-98.78a5.75 5.75 0 0 0-5.75 5.75z"/>
              </g>
            </g>
          </svg>
          <FaIcon className="headerUser" icon={faUser}/>
        </header>
        <div className="webappContentBox">
          <Switch>
            <Route exact path='/' component={Dashboard}/>
          </Switch>
        </div>
        <footer>

        </footer>
        <div className="webappBackground" ref={background => this.background = background} >
        <img src={bg} alt=""/>
        </div>
      </div>
    );
  }
}

export default withRouter(WebApp);
