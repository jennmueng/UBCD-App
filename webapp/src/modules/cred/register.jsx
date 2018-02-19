import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import './register.css';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress : 'email'
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
            console.dir(this.state);
            switch (type) {
                case 'email':
                    this.setState({
                        progress : 'password'
                    })
                    break;
                case 'password':
                        this.setState({
                            progress : 'name'
                        })
                    break;
                case 'name':
                    this.setState({
                        progress : 'phone'
                    })
                    break;
                case 'phone' : 
                    this.sendDataToServer((status) => {
                        if (!status) {
                            alert('error has occured');
                        } else {
                            this.setState({
                                progress : 'otp'
                            })
                        }
                    });
                    break;
                case 'otp' : 
                    this.verifyOtp((status) => {
                        if (!status) {
                            alert('error has occured');
                        } else {
                            alert('success');
                        }
                    })
            }
        });
    }
    sendDataToServer = (status) => {
        let data = {
            email : this.state.email,
            name : this.state.name,
            password : this.state.password,
            userType : 'USER',
            phone : this.state.phone
        }
        console.dir(this.state);
        axios.post('/api/cred/new-user', data)
        .then((response) => {
            console.log(response)
            return status(true);
        })
        .catch((error) => {
            console.log(error)
            return status(false);
        });
    }
    verifyOtp = (status) => {
        let data = {
            email : this.state.email,
            otp : this.state.otp
        }
        axios.post('/api/cred/otp-verify', data)
        .then((response) => {
            console.log(response)
            return status(true);
        })
        .catch((error) => {
            console.log(error)
            return status(false);
        });
    }
  render() {
    return (
      <div className="registerContainer">
            {(this.state.progress === 'email') ? <EmailPage passData={this.recieveData} language={this.props.language}/> : null}
            {(this.state.progress === 'password') ? <PasswordPage passData={this.recieveData} language={this.props.language}/> : null}
            {(this.state.progress === 'name') ? <NamePage passData={this.recieveData} language={this.props.language}/> : null}
            {(this.state.progress === 'phone') ? <PhonePage passData={this.recieveData} language={this.props.language}/> : null}
            {(this.state.progress === 'otp') ? <OtpPage passData={this.recieveData} language={this.props.language} phone={this.state.phone}/> : null}
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
        let title = (this.props.language === 'en_US') ? 'Password' : 'รหัสผ่าน';
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
        let firstNameTitle = (this.props.language === 'en_US') ? 'First Name' : 'ชื่อ';
        let lastNameTitle = (this.props.language === 'en_US') ? 'Last Name' : 'นามสกุล';
        
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

class PhonePage extends Component {
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
        this.props.passData(this.state.value, 'phone');
    }
    render() {
        let title = (this.props.language === 'en_US') ? 'Phone Number' : 'เบอร์โทรศัพท์';
        return(
            <div className="credComponent signUp_Password">
                <h4>{title}</h4>
                <input name="phone" type="text" value={this.state.value} onChange={this.handleData}/>
                <button className="credButton" onClick={this.passData}>Next</button>
            </div>
        );
    }
}

class OtpPage extends Component {
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
        this.props.passData(this.state.value, 'otp');
    }
    render() {
        let title = (this.props.language === 'en_US') ? `Please enter the 6 digit OTP sent to ${this.props.phone}` : `กรุณาใส่เลข OTP ของคุณที่ถูกส่งไปยันเบอร์โทรศัพท์ ${this.props.phone}`;
        return(
            <div className="credComponent signUp_Password">
                <h4>{title}</h4>
                <input name="otp" type="text" value={this.state.value} onChange={this.handleData}/>
                <button className="credButton" onClick={this.passData}>Next</button>
            </div>
        );
    }
}



export default withRouter(Register);
