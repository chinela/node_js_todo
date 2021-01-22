const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController')
const {ensureAuthenticated} = require('../config/auth')

router.get('/dashboard', ensureAuthenticated, DashboardController.todos)
router.get('/dashboard/profile', ensureAuthenticated, DashboardController.profile)
router.post('/profile', ensureAuthenticated, DashboardController.updateProfile)

module.exports = router;