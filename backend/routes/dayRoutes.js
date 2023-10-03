const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');
const { client } = require('../prisma/index');

// GET /api/days - Retrieve all Day data and the available number of appointments.
router.get('/api/days', dayController.getAllDaysWithAppointments);

module.exports = router;

