const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    user: {
        //?enumerated validation?
        type: String,
        required: true,
        validate: {
            validator: (val)=>{
                return /^[\w\s]+$/.test(val);
            }
        }
    },
    location: {
        //enumerated validation
        type: String,
        required: true,
        validate: {
            validator: (val)=>{
                return /^[\w\s]+$/.test(val);
            }
        }
    },
    item: {
        //enumerated validation
        type: String,
        required: true,
        validate: {
            validator: (val)=>{
                return /^[\w\s]+$/.test(val);
            }
        }
    },
    notes: {
        type: String,
        trim: true,
        validate: {
            validator: (val)=>{
                return /^[\w\s\.\,\?\!]+$/.test(val);
            }
        }
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Order};