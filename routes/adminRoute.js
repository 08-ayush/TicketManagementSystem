const express = require('express');
const Controller = require('../controllers/userController.js')
const router = express.Router();

router.get('/', Controller.UserController.getAdmin );
router.get('/admindashboard', Controller.UserController.getAdminDashboard )
router.post('/', Controller.UserController.checkAdmin );

module.exports = {
    router
}