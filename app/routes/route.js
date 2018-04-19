let express = require('express');
let router = express.Router();
let bodyparser = require('body-parser');
let cors = require('cors');
let user = require('../controller/userroute');
router.use(bodyparser());
router.use(cors());
// router.post('/send-invitation', user.sendInvite);

    router.post('/join', user.fetchChat);
    router.post('/enter/invites', user.chatInvite);
    router.put('/enter/accept/invites', user.toggelInvite);

// router.get('/fetchuser',user.fetchuser);
module.exports = router;
