const express = require('express');
const router = express.Router();
const { getAllWardsOfProvinceByCode, getWardByCode }= require('../controllers/ward_Controller');

router.get('/:code/wards', getAllWardsOfProvinceByCode);
router.get('/wards/:code', getWardByCode);

module.exports = router;