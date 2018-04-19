let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var chatSchema = mongoose.Schema({
    user: String,
    sender: String,
    receiver: String,
    message: String,
    created: { type: Date, default: Date.now}
});
module.exports = mongoose.model('Message',chatSchema);