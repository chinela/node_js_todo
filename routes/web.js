const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController')

router.get('/', MainController.index)
router.get('/register', MainController.register)
router.get('/login', MainController.login)
router.post('/register', MainController.postRegister)

module.exports = router;