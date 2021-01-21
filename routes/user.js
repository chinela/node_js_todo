const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController')

router.get('/dashboard', DashboardController.todos)
router.get('/dashboard/profile', DashboardController.profile)

module.exports = router;