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
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.send({error : err, success : false});
        } else {
            //Hash password here, generate OTP in Schema.
            let regData = {
                email : req.body.email,
                password : hash,
                name : req.body.name,
                phone : req.body.phone,
                userType : req.body.userType,
                activated : false
            }
            console.log(regData);
            user.create(regData, function(err, user) {
                //Handshakes are communicated via objects : {error, success}
                if (err) {
                    res.send({error : err, success : false});
                } else {
                    
                    res.send({error : null, success : true});
                }
            });
        }
    });
});
app.get('/api/cred/otp_request', function(req, res) {
    user.getOTP(req.body.email, (err, status, otp) => {
        if (err || !status) {
            //Handshakes are communicated via objects : {error, success, otp}
            if (err) {
            res.send({error : err, success : false});
            }
        } else if (status) {
            res.send({error : null, success : true, otp : otp});
        } else {
            res.send({error : null, success : false});
        }
    });
});

app.post('/api/cred/otp-verify', function(req, res) {
    user.verifyOtp(req.body.email, req.body.otp, (err, result) => {
        if (result) {
             //Handshakes are communicated via objects : {error, success}
            res.send({error : err, success : true});
        } else {
            res.send({error : err, success : false});
        }
    });
});

app.post('/api/cred/login', function(req, res) {
    user.authenticate(req.body.email, req.body.password, (err, success, token, session) => {
        //Handshakes are communicated via objects : {error, success, token, session}
        if (err) {
            res.send({error : err, success : false});
        } else if (!success || !token || !session) {
            res.send({error : null, success : false});
        } else {
            res.send({error : null, success : true, token : token, session : session});
        }
    });
});

app.post('/api/cred/check-session', function(req, res) {
    //Verify the Session.
})

app.get('/api/getTest', function(req, res) {
    res.send(`yay you're connected`);
})

app.listen('8850');