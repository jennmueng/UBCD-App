import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';

import langStore from '../../reducers/langStore';
import './register.css';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }
    componentDidMount() {
        
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
    recieveData = (data, type) => {
        this.setState({
            [type] : data
        }, () => {
            alert(this.state[type]);
            switch (type) {
                case 'email':
                this.props.history.push('password');
                case 'password':
                this.props.history.push('name'); 
            }
        });
    }
    
  render() {
    return (
      <div className="registerContainer">
            <Switch>
                <Route path="/cred/sign-up/email" component={() => <EmailPage passData={this.recieveData}/>} />
                <Route path="/cred/sign-up/password" component={() => <PasswordPage passData={this.recieveData}/>} />
                <Route path="/cred/sign-up/name" component={() => <NamePage passData={this.recieveData}/>} />
            </Switch>
      </div>
    );
  }
}

//Below are components for each page. Please declare a 'passData' prop when using one of these pages.

class EmailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value : ''
        };
    }
    handleData = (event) => {
        event.preventDefault();
        this.setState({
            value : event.target.value
        });
    }
    passData = (event) => {
        event.preventDefault();
        this.props.passData(this.state.value, 'email');
    }
    render() {
        return(
            <div className="credComponent signUp_Email">
                <h4>Email</h4>
                <input name="email" type="text" value={this.state.email} onChange={this.handleData}/>
                <button className="credButton" onClick={this.passData}>Next</button>
            </div>
        );
    }
}

class PasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value : ''
        };
    }
    handleData = (event) => {
        event.preventDefault();
        this.setState({
            value : event.target.value
        });
    }
    passData = (event) => {
        event.preventDefault();
        this.props.passData(this.state.value, 'password');
    }
    render() {
        let title = (langStore.getState() === 'en_US') ? 'Password' : 'รหัสผ่าน';
        return(
            <div className="credComponent signUp_Password">
                <h4>{title}</h4>
                <input name="email" type="password" value={this.state.email} onChange={this.handleData}/>
                <button className="credButton" onClick={this.passData}>Next</button>
            </div>
        );
    }
}

class NamePage extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            firstName : '',
            lastName : ''
        };
    }
    handleFirstName = (event) => {
        event.preventDefault();
        this.setState({
            firstName : event.target.value
        });
    }
    handleLastName = (event) => {
        event.preventDefault();
        this.setState({
            lastName : event.target.value
        });
    }
    passData = (event) => {
        event.preventDefault();
        this.props.passData({firstName : this.state.firstName, lastName : this.state.lastName}, 'name');
    }
    render() {
        let firstNameTitle = (langStore.getState() === 'en_US') ? 'First Name' : 'ชื่อ';
        let lastNameTitle = (langStore.getState() === 'en_US') ? 'Last Name' : 'นามสกุล';
        
        return(
            <div className="credComponent signUp_Password">
                <h4>{firstNameTitle}</h4>
                <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleFirstName}/>
                <h4>{lastNameTitle}</h4>
                <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleLastName}/>
                <button className="credButton" onClick={this.passData}>Next</button>
            </div>
        );
    }
}


export default withRouter(Register);
