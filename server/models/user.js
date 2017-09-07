const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    display_name: {
        type: String,
        unique: true,
        equired: true,
        validate: {
            validator: (val)=>{
                return /^[\w\s]+$/.test(val);
            },
            message: '{VALUE} is not a valid display name. Only alphanumeric, upper and lower case characters are allowed.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'            
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
//instance methods
//needs a this keyword! So no arrow functions.
UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'Ross-Allen').toString();
    user.tokens.push({access, token});
    return user.save().then(()=>{
        return token;
    });
};

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['display_name', 'email', '_id']);
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};