const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let date = require('date-and-time');
var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	photo: {
		type: String,
		required: true
	},
	userType : {
		type: String,
		trim: true
	},
	phone : {
		type: String,
		trim: true
	},
	activated: {
		type: Boolean,
		required: true
	},
	prevOTP: {
		otp : String,
		creationDate : Date
	},
	validTokens : [{tokenID : String, lastUsed : Date}],
	lastLoginDate : {
		type: Date
	},
	prefs : {
		type: Object
	},
	registrationDate : {
		type: Date,
		default: Date.now
	},
    history : [{locationID : String, timeVisited : Date}]
});
//authenticate against database
userSchema.statics.authenticate = function(email, password, callback) {
	user.findOne({email : email})
		.exec(function(err, emp) {
		if (err) {
			return callback(err);
		} else if (!emp) {
			var err = new Error(`No user called ${email} was found`);
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, emp.password, function(err, result) {
			console.log(emp.lastLoginDate);
			if (result === true) {
				if (!emp.lastLoginDate) {
					return callback(err, result, true);
				} else {
					return callback(null, email);
				}
			} else {
				return callback(err, result);	
			}
		});
	});
};

//Generate OTP AFTER Phone Number Exists.
userSchema.statics.getOTP = function(email, callback) {
	user.findOne({email : email})
	.exec(function(err, usr) {
		if (err) {
			return callback(err);
		} else if (!usr) {
			let err = new Error(`No user with the email ${email} found.`)
		} else {
			let otp = Math.floor(1000 + Math.random() * 9000);
			twil.messages
				.create({
					to: usr.phone,
					from: '+17866291967',
					body: `Your OTP for the UBCD App is ${otp}. เลข OTP สำหรับแอพ UBCD ของคุณคือ ${otp}`,
				})
				.then(message => {
					console.log(message.sid);
					usr.prevOTP = otp;
					user.save(function(err) {
						if (err) {
							return callback(err);
						} else {
							return callback(null, true, otp);
						}
					});
				})
				.catch(error => {
					console.log(error);
					return callback(error, false);
				});
				}
	});
}

//find by Email
userSchema.statics.findByEmail = function(email, callback) {
	user.findOne({email : email})
		.exec(function(err, emp) {
			if (err) {
			return callback(err);
		} else if (!emp) {
			var err = new Error(`No user with the email ${email} was found`);
			err.status = 401;
			return callback(err);
		} else {
			emp.password = null;
			return callback(null, emp);
		}
	});
};

userSchema.statics.changePassword = function(username, curPass, newPass, callback) {
	user.findOne({username : username})
		.exec(function(err, emp) {
			if (err) {
				return callback(err);
			} else if (!emp) {
				return callback(err);
			}
			bcrypt.compare(curPass, emp.password, function(err, result) {
				if (result === true) {
					emp.password = newPass;
					emp.save(function(err) {
						if (err) {
							return callback(err);
						} else {
							return callback(null, true);
						}
					})
					
				} else {
					return callback(err, result);
				}
			});
	});
};

userSchema.statics.updateInfo = function(email, newInfo, callback) {
	user.findOne({email : email})
		.exec(function(err, emp) {
			if (err) {
				return callback(err);
			} else if (!emp) {
				return callback(err);
			}
			for (var prop in newInfo) {
				if (!newInfo.hasOwnProperty(prop)) {
					//The current property is not a direct property of p
					continue;
				} else if (!newInfo[prop]) {
					//The current property is empty
					continue;
				}
				console.log(newInfo[prop]);
				emp[prop] = newInfo[prop];
			}
			emp.save(function (err) {
				if (err) {
					return callback(err);
				} else {
					return callback(null, true);
				}
			});
	});
};

userSchema.statics.tokenGenerate = function(email, callback) {
	user.findOne({email : email})
		.exec(function(err, emp) {
			if (err) {
				return callback(err);
			} else if (!emp) {
				return callback(err);
			}
			let currentTime = new Date();
			//generate raw key
			let rawKey = temp.generate();
			//hash it
			bcrypt.hash(rawKey, 10, function(err, hash) {
				if (err){
					return callback(err);
				} else {
					let token = {
						value : hash,
						creationDate : currentTime,
						lastUseDate : currentTime
					}
					emp.validTokens.push(token);
					emp.save(function (err) {
						if (err) {
							return callback(err);
						} else {
							return callback(null, rawKey);
							}
						});
				}
			});
	});
						  
};

userSchema.statics.tokenVerify = function(token, username, callback) {
	user.findOne({username : username})
		.exec(function(err, emp) {
			if (err) {
				return callback(err);
			} else if (!emp.lastToken) {
				return callback(null, false);
			}
			bcrypt.compare(token, emp.lastToken, function(err, result) {
				if (result === true) {
					var loginDate = emp.lastLoginDate;
					var currentTime = new Date();
					var timeDiff = (Math.abs(currentTime.getTime() - loginDate.getTime())/100000);
					if (timeDiff > 860) {
						return callback(null, false);
					} else {
						return callback(null, true);
					}
				} else {
					return callback(null, false);
				}
			});
	});
};

//find and list
userSchema.statics.findAll = function(company, callback) {
	user.find({company : company})
		.lean().exec(function(err, emps) {
			if (err) {
			return callback(err);
		} else if (!emps) {
			var err = new Error(`None`);
			err.status = 401;
			return callback(err);
		} else {
			//return the user object
			for (let emp in emps) {
				emps[emp].password = null;
			}
			return callback(null, emps);
        	}
		});
};

userSchema.statics.logout = function(username, callback) {
	user.findOne({username: username})
		.exec(function(err, emp) {
			if (err) {
				return callback(err);
			} else if (!emp) {
				var error = new Error("couldn't find user.");
				error.status = 404;
				return callback(error);
			} else {
				emp.lastLoginDate = null;
				emp.lastToken = null;
				return callback(null, true);
				}
		});
};


//password reset
var user = mongoose.model('user', userSchema);
module.exports = user;