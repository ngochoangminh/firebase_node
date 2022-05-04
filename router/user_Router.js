const user_controller = require('../controller/user_Controller');
const router = require('express').Router();

router.get('/getall', user_controller.getall);

module.exports=router;