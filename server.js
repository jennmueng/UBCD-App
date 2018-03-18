const exp = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const fs = require('fs');
const DataURI = require('datauri').sync;
const uriPromise = require('datauri').promise;

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

app.get('/api/pe-content', (req, res) => {
    let placeholderPlaces = [
        {
            _id: 123,
            coordinates : {
                lat : 15.240092,
                long : 104.853332
            },
            name : `Steve's Bakery`,
            description : `The best bakery in Ubon`,
            subcategory : `Cafe`,
            category : 'Food',
            phone : `0863937528`,
            website : null,
            address : '23 Soi Luang, Tambon Nai Mueang, Amphoe Mueang Ubon Ratchathani, Chang Wat Ubon Ratchathani 34000',
            totalRateCount : 90,
            totalRateValue : 11,
            rating : 9.3,
            expenseLevel : 3,
            reviews : [],
            photos : [
                {
                    author : null,
                    place : 123,
                    likes : 10,
                    creationDate : new Date(),
                    srcLarge : './clientAssets/images/places/stevesbakery.jpg',
                    srcThumb : './clientAssets/images/places/stevesbakery.jpg',
                }
            ],
            likes : 26,
            creationDate : new Date(),
            owner : null,
            verified : true
        },
        {
            _id: 234,
            coordinates : {
                lat : 15.740092,
                long : 104.253332
            },
            name : `Khun Yai's Pad Thai`,
            description : `An old store that has been here for years`,
            subcategory : `Thai Food`,
            category : 'Food',
            phone : `094394394`,
            website : null,
            address : '23 Soi Luang, Tambon Nai Mueang, Amphoe Mueang Ubon Ratchathani, Chang Wat Ubon Ratchathani 34000',
            totalRateCount : 90,
            totalRateValue : 11,
            rating : 6.8,
            expenseLevel : 1,
            reviews : [],
            photos : [
                {
                    author : null,
                    place : 123,
                    likes : 10,
                    creationDate : new Date(),
                    srcLarge : './clientAssets/images/places/padthai.jpg',
                    srcThumb : './clientAssets/images/places/padthai.jpg',
                }
            ],
            likes : 26,
            creationDate : new Date(),
            owner : null,
            verified : true
        },
        {
            _id: 234,
            coordinates : {
                lat : 15.740092,
                long : 104.253332
            },
            name : `Little Pawn Shop`,
            description : `An old store that has been here for years`,
            subcategory : `Shop`,
            category : 'Attractions',
            phone : `094394394`,
            website : null,
            address : '23 Soi Luang, Tambon Nai Mueang, Amphoe Mueang Ubon Ratchathani, Chang Wat Ubon Ratchathani 34000',
            totalRateCount : 90,
            totalRateValue : 11,
            rating : 8.6,
            expenseLevel : 2,
            reviews : [],
            photos : [
                {
                    author : null,
                    place : 123,
                    likes : 10,
                    creationDate : new Date(),
                    srcLarge : './clientAssets/images/places/pawnshop.jpg',
                    srcThumb : './clientAssets/images/places/pawnshop.jpg',
                }
            ],
            likes : 26,
            creationDate : new Date(),
            owner : null,
            verified : true
        }
    ]
    for (let i = 0; i < placeholderPlaces.length; i++) {
        let datauri = DataURI(placeholderPlaces[i].photos[0].srcThumb);
        placeholderPlaces[i].photos[0].thumbUri = datauri;
    }
    res.send(placeholderPlaces);
})

app.get('/api/pe-place', (req, res) => {
    
    let reviews = [{
        _id : '12345',
        text : 'This place makes the best cakes I have ever tasted',
        rate : 7,
        author : {
            name : {
                first : 'John',
                last : 'Smith'
            },
            photo : {
                srcThumb : './clientAssets/images/profilePhotos/johnsmith.jpg'
            },
        },
        photos : [{ 
            srcThumb : './clientAssets/images/places/stevesbakeryReview1.jpg',
            srcLarge : './clientAssets/images/places/stevesbakeryReview1.jpg'
        }],
        likes : 3,
        creationDate : new Date(),
        
        },
        {
            _id : '2345',
            text : 'Simply Amazing',
            rate : 10,
            author : {
                name : {
                    first : 'Kelly',
                    last : 'Rogers'
                },
                photo : {
                    srcThumb : './clientAssets/images/profilePhotos/kellyrogers.jpg'
                },
            },
            photos : [],
            likes : 4,
            creationDate : new Date(),
            
        },
        {
            _id : '23434',
            text : 'Extremely Good.',
            rate : 8,
            author : {
                name : {
                    first : 'Stanley',
                    last : 'King'
                },
                photo : {
                    srcThumb : './clientAssets/images/profilePhotos/stanleyking.jpg'
                },
            },
            photos : [],
            likes : 4,
            creationDate : new Date(),
            
        }
    ];
    let photos = [
        {
            author : null,
            place : 123,
            likes : 10,
            creationDate : new Date(),
            srcLarge : './clientAssets/images/places/stevesbakery.jpg',
            srcThumb : './clientAssets/images/places/stevesbakery.jpg',
        },
        {
            author : null,
            place : 123,
            likes : 10,
            creationDate : new Date(),
            srcLarge : './clientAssets/images/places/stevesbakery1.jpg',
            srcThumb : './clientAssets/images/places/stevesbakery1.jpg',
        },
        {
            author : null,
            place : 123,
            likes : 10,
            creationDate : new Date(),
            srcLarge : './clientAssets/images/places/stevesbakery2.jpg',
            srcThumb : './clientAssets/images/places/stevesbakery2.jpg',
        },
        {
            author : null,
            place : 123,
            likes : 10,
            creationDate : new Date(),
            srcLarge : './clientAssets/images/places/stevesbakery.jpg',
            srcThumb : './clientAssets/images/places/stevesbakery.jpg',
        },
    ];
    for (let i = 0; i < reviews.length; i++) {
        let datauri = DataURI(reviews[i].author.photo.srcThumb);
        reviews[i].author.photo.thumbUri = datauri;
    }
    for (let i = 0; i < photos.length; i++) {
        let datauri = DataURI(photos[i].srcThumb);
        photos[i].thumbUri = datauri;
    }
    let placeholderPlace = 
        {
            _id: 123,
            coordinates : {
                lat : 15.240092,
                long : 104.853332
            },
            name : `Steve's Bakery`,
            description : `The best bakery in Ubon`,
            subcategory : `Cafe`,
            category : 'Food',
            phone : `0863937528`,
            website : null,
            address : '23 Soi Luang, Tambon Nai Mueang, Amphoe Mueang Ubon Ratchathani, Chang Wat Ubon Ratchathani 34000',
            totalRateCount : 90,
            totalRateValue : 11,
            rating : 9.3,
            expenseLevel : 3,
            reviews : reviews,
            photos : photos,
            likes : 26,
            creationDate : new Date(),
            owner : null,
            verified : true
        };
    res.send(placeholderPlace);
});

app.post('/api/get-image', (req, res) => {
    let src = req.body.src;
    uriPromise(src)
        .then(uri => {
            res.send({err: null, uri : uri});
        })
        .catch(err => { console.log(err); res.send({err}) });
})
//test
app.listen('8850');