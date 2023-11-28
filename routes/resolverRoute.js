const express = require('express');
const Controller = require('../controllers/resolverController.js')

const router = express.Router();

router.get('/login', Controller.ResolverController.getLogin );
router.post('/login', Controller.ResolverController.checkValidResolver );
router.get('/signup', Controller.ResolverController.getSignup );
router.post('/signup', Controller.ResolverController.createResolver );
router.get('/resolverdashboard', Controller.ResolverController.getDashboard );


module.exports = {
    router
}
