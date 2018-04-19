var express = require('express');
var app = express();
var path = require('path');

let router = express.Router();
var bodyParser= require('body-parser');
app.use(bodyParser());
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chats', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});
var root = require('./app/routes/route');
var socket = require('./app/socket/socket.js');
socket.serversocket();

app.use('/routes',root);
app.listen(3000,function(){
    console.log('server is runnig on port 3000');
});