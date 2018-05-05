let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var chatSchema = mongoose.Schema({
    messageId:{
        type: Schema.Types.ObjectId
    },
    user: String,
    sender: String,
    receiver: String,
    messages:[{
        message: String,
        sender: String,
        created: { type: Date, default: Date.now}
    }],
}, {timestamp:true});
module.exports = mongoose.model('Message',chatSchema);