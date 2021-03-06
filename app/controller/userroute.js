let dataBaseQuery = require('../helper/query');
let oldMessages = require('../helper/chatlog');
module.exports = {
    fetchChat: (req, res, next) => {
        oldMessages.fetchChat(req.body).then((resol) => {
           // console.log("Inside");
            if (resol == null) {
                res.status(500).send({ 'status': 0, 'data': { 'message': '' } })
             //   console.log(resol);
            } else {
               // console.log("Inside Usserroute",resol.length);
                res.status(200).send({ 'status': 1, 'data': resol })
            }
        }).catch((resj) => res.status(500).send({ 'status': 0, 'err': 'err in fetching' }));
    },
    chatInvite: (req, res, next) => {
        // console.log("Checking ",req.body.senderInfo);
        oldMessages.fetchInvite(req.body.senderInfo).then((resol) => {
           // console.log("Inside");
            if (resol == null) {
                res.status(500).send({ 'status': 0, 'data': { 'message': '' } })
             //   console.log(resol);
            } else {
              //  console.log("Inside Usserroute",resol.length);
                res.status(200).send({ 'status': 1, 'data': resol })
            }
        }).catch((resj) => res.status(500).send({ 'status': 0, 'err': 'err in fetching' }));
    },
    toggelInvite: (req, res, next) => {
      //  console.log("Checking ",req.body.id);
        oldMessages.checkInvite(req.body.id).then((resol) => {
        //    console.log("Inside");
            if (resol == null) {
                res.status(500).send({ 'status': 0, 'data': { 'message': '' } })
          //      console.log(resol);
            } else {
              //  console.log("Inside Usserroute",resol.length);
                res.status(200).send({ 'status': 1, 'data': resol })
            }
        }).catch((resj) => res.status(500).send({ 'status': 0, 'err': 'err in fetching' }));
    }
}
