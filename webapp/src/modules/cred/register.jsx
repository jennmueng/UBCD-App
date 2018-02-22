import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/fontawesome-free-solid';
import $Cookie from 'js-cookie';
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
                    this.sendDataToServer((err, success) => {
                        if (err || !success) {
                            alert('An error has occured. Please check console.');
                            console.error(err);
                        } else {
                            this.setState({
                                progress : 'otp'
                            })
                        }
                    });
                    break;
                case 'otp' : 
                    this.verifyOtp((err, success) => {
                        if (err) {
                            alert('An error has occured. Please check console.');
                            console.error(err);
                        } else if (!err && !success) {
                            alert('OTP was incorrect, please try again.');
                        } else {
                            alert('OTP Successful.');
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
        .then((res) => {
            if(res.data.error || !res.data.success) {
                return status(res.data.error, false)
            } else {
                return status(null, true);
            }
        })
        .catch((error) => {
            console.log(error)
            return status(error, false);
        });
    }
    verifyOtp = (status) => {
        let data = {
            email : this.state.email,
            otp : this.state.otp
        }
        axios.post('/api/cred/otp-verify', data)
        .then((res) => {
            if(res.data.error) {
                return status(res.data.error, false)
            } else if (!res.data.success) {
                return status(null, false)
            } else {
                axios.post('/api/cred/login', {email : this.state.email, password : this.state.password})
                .then((res) => {
                    let auth = {
                        token : res.data.token,
                        session : res.data.session,
                        email : this.state.email
                    };
                    console.dir(auth);
                    $Cookie.set('auth', auth , { expires : 7});
                    
                    return status(null, true);
                })
                
                
            }
        })
        .catch((error) => {
            console.log(error)
            return status(error, false);
        });
    }
  render() {
    return (
      <div className="cred_signup">
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
            <div className="signup_form signUp_Email">
                <h4>Email</h4>
                <input name="email" className="cred_input" type="text" value={this.state.email} onChange={this.handleData}/>
                <button className="cred_button" onClick={this.passData}>Next</button>
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
            <div className="signup_form signUp_Password">
                <h4>{title}</h4>
                <input name="email" className="cred_input" type="password" value={this.state.email} onChange={this.handleData}/>
                <button className="cred_button" onClick={this.passData}>Next</button>
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
        this.props.passData({first : this.state.firstName, last : this.state.lastName}, 'name');
    }
    render() {
        let firstNameTitle = (this.props.language === 'en_US') ? 'First Name' : 'ชื่อ';
        let lastNameTitle = (this.props.language === 'en_US') ? 'Last Name' : 'นามสกุล';
        
        return(
            <div className="signup_form signUp_Password">
                <h4>{firstNameTitle}</h4>
                <input name="firstName" className="cred_input" type="text" value={this.state.firstName} onChange={this.handleFirstName}/>
                <h4>{lastNameTitle}</h4>
                <input name="lastName" className="cred_input" type="text" value={this.state.lastName} onChange={this.handleLastName}/>
                <button className="cred_button" onClick={this.passData}>Next</button>
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
            value : '+66' + event.target.value.slice(1, event.target.value.length)
        });
    }
    passData = (event) => {
        event.preventDefault();
        this.props.passData(this.state.value, 'phone');

        
    }
    render() {
        let title = (this.props.language === 'en_US') ? 'Phone Number' : 'เบอร์โทรศัพท์';
        return(
            <div className="signup_form signUp_Password">
                <h4>{title}</h4>
                <input name="phone" className="cred_input" type="text" onChange={this.handleData}/>
                <button className="cred_button" onClick={this.passData}>Next</button>
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
        let title = (this.props.language === 'en_US') ? `Please enter the 4 digit OTP sent to ${this.props.phone}` : `กรุณาใส่เลข OTP ของคุณที่ถูกส่งไปยันเบอร์โทรศัพท์ ${this.props.phone}`;
        return(
            <div className="signup_form signUp_Password">
                <h4>{title}</h4>
                <input name="otp" className="cred_input" type="text" value={this.state.value} onChange={this.handleData}/>
                <button className="cred_button" onClick={this.passData}>Next</button>
            </div>
        );
    }
}



export default withRouter(Register);
