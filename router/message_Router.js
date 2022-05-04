const msg_controller = require('../controller/message_Controller');
const router = require('express').Router();

router.get('/getall', msg_controller.getall);
router.get('/getonce', msg_controller.get_once);

module.exports=router;