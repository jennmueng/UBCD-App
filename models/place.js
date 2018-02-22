const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let date = require('date-and-time');

var placeSchema = new mongoose.Schema({
	coordinates : {
        lat : Number,
        long : Number
    },
    name : {
        type : String,
        required : true
    },
    phone : String,
    website : String,
    address : String,
    totalRateCount : Number,
    totalRateValue : Number,
    rating : Number,
    reviews : [{
        text : String,
        author : { type : Schema.Types.ObjectId, ref : 'user'},
        photos : [{ type : Schema.Types.ObjectId, ref : 'photo'}],
        likes : Number,
        creationDate : Date,
        
    }],
    photos : [{ type : Schema.Types.ObjectId, ref : 'photo'}],
    likes : Number,
    creationDate : Date,
    owner : { type : Schema.Types.ObjectId, ref : 'user'},
    verified : {
        type : boolean,
        required : true
    }

});

var photoSchema = new mongoose.Schema({
    author : { type : Schema.Types.ObjectId, ref : 'user'},
    place : { type : Schema.Types.ObjectId, ref : 'place'},
    likes : Number,
    creationDate : Date,
    src : String,    
})

var photo = mongoose.model('photo', photoSchema);
var place = mongoose.model('place', placeSchema);
module.exports = place;