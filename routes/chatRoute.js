const express = require('express');
const Controller = require('../controllers/chatController.js')

const router = express.Router();

router.use('/', Controller.ChatController.chatDashboard );

module.exports = {
    router
}