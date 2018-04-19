var Chat = require('../modal/msg.js');
var Invite = require('../modal/invites');
module.exports = {
    serversocket: () => {
        users = [];
        var io = require('socket.io')();
        io.on('connection', function (socket) {
            console.log('one client is connected with id=' + socket.id);

            socket.on('join', function (data) {
                //joining  
                console.log("Inside Join Event", data);
                let ob = { 'email': data.sender, 'id': socket.id, 'room': data.room };
                socket.join(data.room);
                users.push(ob);
                Chat.find({
                    $or: [{ user: data.user, sender: data.sender, receiver: data.receiver },
                    { sender: data.receiver, receiver: data.sender }]
                }, function (err, docs) {

                    if (err) throw err;
                    else
                        socket.emit('load old msgs', docs);
                });
            });

            socket.on('disconnect', function () {
                let index;
                console.log('one user is disconnected');
                users.forEach(function (element) {
                    if (element.id == socket.id) {
                        index = users.indexOf(element);
                        console.log(index);
                        delete users[index];
                        users = users.filter(Boolean);
                        console.log(users);
                    }
                }, this);
            });
            socket.on('sendInvite', function (data) {
                console.log('Invite Event', data);
                let ob = { 'email': data.sender, 'id': socket.id, 'room': data.room };
                socket.join(data.room);
                users.push(ob);

                var newMsg = new Chat({user:data.user, message: `An invitation has been sent to ${data.receiver}`, sender: data.sender });
                newMsg.save(function (err) {
                    if (err) throw err;
                });

                var newMsg = new Invite({ message: `${data.sender} with username: ${data.user} has sent an invitation to chat`, status:true,  sender: data.receiver });
                newMsg.save(function (err) {
                    if (err) throw err;
                });
                io.to(data.room).emit('send-invitation', {
                    user: data.user, room: data.room,
                    message: `An invitation has been sent to ${data.receiver}`,
                    sender: data.sender, receiver: data.receiver
                });
            });
            socket.on('message', function (data) {
                //Send Message
                console.log(data);
                users.forEach(function (element) {
                    if (element.email == data.sender) {
                        io.to(element.room).emit('new message', data);
                    }
                });
                users.forEach(function (element) {

                    if (element.email == data.receiver) {
                        console.log(data);
                        var newMsg = new Chat({ user: data.user, message: data.message, sender: data.sender, receiver: data.receiver });
                        newMsg.save(function (err) {
                            if (err) throw err;
                            io.to(element.room).emit('new message', data);
                        });
                    }
                });
            });
        });
        io.listen(5000);
    }
};