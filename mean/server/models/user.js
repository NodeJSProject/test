var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var db = require('../configs/database.js');
	mongoose.connect(db.url);

var userSchema = mongoose.Schema({
	username:  {type : String},
	email:     {type : String},
	password:  {type : String},
	roles: [],
	// facebook         : {
	// 	id           : String,
	// 	token        : String,
	// 	email        : String,
	// 	name         : String
	// },
	// twitter          : {
	// 	id           : String,
	// 	token        : String,
	// 	displayName  : String,
	// 	username     : String
	// },
	// google           : {
	// 	id           : String,
	// 	token        : String,
	// 	email        : String,
	// 	name         : String
	// }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(9, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null);
// };

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;