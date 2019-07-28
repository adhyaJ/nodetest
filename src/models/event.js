const mongoose = require('mongoose');
const user = require('../models/user');
  
const UserSchema = new mongoose.Schema({

    eventname: {
        type: String,
        required: true
    },
    eventdesc: {
        type: String,
        required: true
    },
    eventvenue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, 
    time: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model('Event', UserSchema);