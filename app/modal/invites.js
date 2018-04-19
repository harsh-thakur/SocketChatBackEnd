let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var invitesSchema = mongoose.Schema({
    sender: String,
    message: String,
    status: Boolean,
    created: { type: Date, default: Date.now}
});
module.exports = mongoose.model('Invitations',invitesSchema);