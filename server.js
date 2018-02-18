const exp = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//import Schemas
const user = require('./models/user.js');

//connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/ubcd');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// Twilio Credentials
const accountSid = 'AC474a0efd5c0db412f69959e6cbd899ec';
const authToken = '2dc2629b911877b56ab4d1684ad56465';

// require the Twilio module and create a REST client
const twil = require('twilio')(accountSid, authToken);

const app = exp();

//bodyparser to parse the incoming data.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/api/cred/register', function(req, res) {
    //Register Account
    let regData = {
        email : req.body.email,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone,
        userType : req.body.userType,
        activation : false
    }

    user.create(employeeData, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.send(true);
        }
    });
});
app.get('/api/cred/otp_request', function(req, res) {
    user.getOTP(req.body.email, function(err, status, otp) {
        if (err || !status) {
            res.send(err);
        } else if (status) {
            res.send(null, true, otp);
        } else {
            res.send(null, false);
        }
    })
});

app.post('/api/cred/otp_verify', function(req, res) {
    //recieve otp
    //compare to otp in user db, check timeout
    //if verified, save that user is authenticated
    //return true or false
});

app.post('/api/cred/login', function(req, res) {
    res.send(req.body);
});

app.post('/api/cred/check-session', function(req, res) {
    //Verify the Session.
})

app.listen('8850');