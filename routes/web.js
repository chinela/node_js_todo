const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController')
const {notAuthenticated} = require('../config/guest')

router.get('/', MainController.index)
router.get('/register', notAuthenticated, MainController.register)
router.get('/login', notAuthenticated, MainController.login)
router.post('/register', MainController.postRegister)
router.post('/login', MainController.postLogin)
router.get('/logout', MainController.logout)

module.exports = router;