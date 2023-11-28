const express =  require('express');
const Controller = require('../controllers/userController.js')
const router = express.Router();

router.get('/', Controller.UserController.getLogin );
router.get('/signup', Controller.UserController.getSignup )
router.post('/signup', Controller.UserController.createUser );
router.post('/', Controller.UserController.checkValidity );

module.exports = {
    router
}