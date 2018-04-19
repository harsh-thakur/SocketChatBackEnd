var msg = require('../modal/msg');
var invite = require('../modal/invites');
module.exports = {
    fetchChat : (obj) =>{
        return new Promise((resolve,reject)=>{
          console.log("Inside chatlog",obj);
         // chatlog.find({ $or: [ { 'sender': obj.sender,'reciver':obj.reciver}, { 'sender': obj.reciver ,'reciver': obj.sender} ] },
         msg.find( {$or: [ { 'sender': obj.sender,'receiver':obj.receiver},
          { 'sender': obj.receiver ,'receiver': obj.sender} ]},
         (err,data)=>{
            console.log('fetching conversation');
            if(err){
              console.log(err);
              reject(err);
            } else{
              resolve(data);
            }
          });
        });
      },
      fetchInvite:(obj) =>{
        return new Promise((resolve,reject)=>{
          console.log("Inside chatlog",obj);
         // chatlog.find({ $or: [ { 'sender': obj.sender,'reciver':obj.reciver}, { 'sender': obj.reciver ,'reciver': obj.sender} ] },
         invite.find({'sender':obj,'status':true },
         (err,data)=>{
            console.log('fetching conversation');
            if(err){
              console.log(err);
              reject(err);
            } else{
              resolve(data);
            }
          });
        });
      },
      checkInvite:(obj) =>{
        return new Promise((resolve,reject)=>{
          console.log("Inside chatlog",obj);
         // chatlog.find({ $or: [ { 'sender': obj.sender,'reciver':obj.reciver}, { 'sender': obj.reciver ,'reciver': obj.sender} ] },
         invite.findOne({
          _id:obj
         },
         (err,data)=>{
            console.log('fetching conversation');
            if(err){
              console.log(err);
              reject(err);
            } else{
              console.log(data.status);
              data.status = false;
              data.save(function(err,updatedData){
                if(err) {
                  console.log(err);
                }
                else
                resolve(updatedData);
              });
            }
          });
        });
      },
}