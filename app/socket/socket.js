var Chat = require('../modal/message.js');
var Invite = require('../modal/invites');
const Hr = require('../modal/hr');
const Applicant = require('../modal/applicant');
module.exports = {
    serversocket: () => {
        users = [];
        var io = require('socket.io')();
        io.on('connection', function (socket) {

            console.log('one client is connected with id=' + socket.id);
            socket.on('join', function (data) {
                console.log('Inside join');
                //joining  
              //  console.log("Inside Join Event", data);
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
                //        console.log(index);
                        delete users[index];
                        users = users.filter(Boolean);
                  //      console.log(users);
                    }
                }, this);
            });
            socket.on('sendInvite', function (data) {
               // console.log('Invite Event', data);
                let ob = { 'email': data.sender, 'id': socket.id, 'room': data.room };
                socket.join(data.room);
                users.push(ob);

                var newMsg = new Chat({user:data.user, message: `An invitation has been sent to ${data.receiver}`, sender: data.sender});
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
                       // console.log(data);
                       console.log("Now entered in this section")
                            
            // var oneTime = new Hr({email: data.sender});
            // oneTime.save(function(err){
            //     if(err) throw err;
            //     console.log("Saved");
                
            // });              
            
            // var temp = new Applicant({email: data.receiver});
            // temp.save(function(err){
            //     if(err) throw err;
            //     console.log("Saved");
                
            
            // });
            // let chat = {
            //     _from: "5ae94f163155792a7485c569",
            //     _to: "5ae94f163155792a7485c569"
            // }
            // console.log('Consoled');
            // Applicant.findOneAndUpdate({email: "a"},{$push: {chats: chat}},(err,fetched)=> {
            //     if(err) throw err;
                
            //     console.log("Fechjkl",fetched);  
            //     // io.to(element.room).emit('new message', data); 
            // });
                       let mess = {
                           message: data.message,
                           sender: data.sender,
                           created: Date.now()
                       }
                       Chat.findOneAndUpdate({sender:data.sender,receiver:data.receiver},
                        {$push :{messages:mess}},(err,fetched)=> {
                        if(err) throw err;
                       // console.log("Fechjkl",fetched);  
                        io.to(element.room).emit('new message', data); 
                    });
                        // var newMsg = new Chat({ user: data.user, message: data.message, sender: data.sender, receiver: data.receiver });
                        // newMsg.save(function (err) {
                        //     if (err) throw err;
                        //     io.to(element.room).emit('new message', data);
                        // });
                    }
                });
            });
        });
        io.listen(5000);
    }
};