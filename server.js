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

const app = exp();

//bodyparser to parse the incoming data.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/api/cred/new-user', function(req, res) {
    //Register Account
    let regData = {
        email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        phone : req.body.phone,
        userType : req.body.userType,
        activated : false
    }

    user.create(regData, function(err, user) {
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

app.post('/api/cred/otp-verify', function(req, res) {
    user.verifyOtp(req.body.email, req.body.otp, function(err, result) {
        if (result) {
            res.send(result);
            console.log('otp success');
        } else {
            res.send(result);
            console.log('otp failed');
        }
    });
});

app.post('/api/cred/login', function(req, res) {
    res.send(req.body);
});

app.post('/api/cred/check-session', function(req, res) {
    //Verify the Session.
})

app.listen('8850');