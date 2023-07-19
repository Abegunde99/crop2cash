const { createDatabase, createTable, createFarmer, getFarmers } = require('../controllers/farmers');
const express = require('express');
const router = express.Router();

router.get('/createDatabase', createDatabase);
router.get('/createTable', createTable);
router.post('/createFarmer', createFarmer);
router.get('/getFarmers', getFarmers);

module.exports = router;

