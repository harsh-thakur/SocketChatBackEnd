// import { Mongoose } from 'mongoose';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var hrSchema = mongoose.Schema({
    email: String,
    chats: [{
        _from: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        },
        _to: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    }]
}, {
    timestamp: true
});
module.exports = mongoose.model('hrModel', hrSchema);