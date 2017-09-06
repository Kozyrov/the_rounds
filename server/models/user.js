const mongoose = require('mongoose');

var User = mongoose.model('User', {
    display_name: {
        type: String,
        equired: true,
        validate: {
            validator: (val)=>{
                return /^[\w\s]+$/.test(val);
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (val)=>{
                return /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/.test(val);
            }
        }
    }
});

module.exports = {User};