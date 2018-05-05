var msg = require('../modal/message');
const Hr = require('../modal/hr');
const Applicant = require('../modal/applicant');
// var mongoose = require('mongoose');
// var msg = mongoose.model('messageModel')
var invite = require('../modal/invites');
module.exports = {
    fetchChat : (obj) =>{
        return new Promise(async (resolve,reject)=>{
         // console.log("Inside chatlog",obj);
         // chatlog.find({ $or: [ { 'sender': obj.sender,'reciver':obj.reciver}, { 'sender': obj.reciver ,'reciver': obj.sender} ] },
         if(obj.sender=='b'){
           try {
             const hr = await Hr.findOne({email:'b'}).populate('chats._from').populate('chats._to');
             //console.log('Consoled HR',JSON.stringify(hr.chats));
             if (!hr) {

             }
             resolve(hr.chats)
           } catch (error) {
             
           }
         }
         else if(obj.sender=='a'){
          try {
            const applicant = await Applicant.findOne({email:'a'}).populate('chats._from').populate('chats._to');
            console.log('Consoled HR',JSON.stringify(applicant.chats));
            if (!applicant) {

            }
            resolve(applicant.chats)
          } catch (error) {
            
          }
        } 
        reject({error: "cdcd"})

        //  msg.find( {$or: [ { 'sender': obj.sender,'receiver':obj.receiver},
        //   { 'sender': obj.receiver ,'receiver': obj.sender} ]},
        //  (err,data)=>{
        //    // console.log('fetching conversation');
        //     if(err){
        //      // console.log(err);
        //       reject(err);
        //     } else{
        //       // console.log(data);
              
        //       resolve(data);
        //     }
        //   });
         });
      },
      fetchInvite:(obj) =>{
        return new Promise((resolve,reject)=>{
         // console.log("Inside chatlog",obj);
         // chatlog.find({ $or: [ { 'sender': obj.sender,'reciver':obj.reciver}, { 'sender': obj.reciver ,'reciver': obj.sender} ] },
         invite.find({'sender':obj,'status':true },
         (err,data)=>{
           // console.log('fetching conversation');
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
         // console.log("Inside chatlog",obj);
         // chatlog.find({ $or: [ { 'sender': obj.sender,'reciver':obj.reciver}, { 'sender': obj.reciver ,'reciver': obj.sender} ] },
         invite.findOne({
          _id:obj
         },
         (err,data)=>{
           // console.log('fetching conversation');
            if(err){
              console.log(err);
              reject(err);
            } else{
             // console.log(data.status);
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