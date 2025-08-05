const express = require("express");
const router = express.Router();
const { getAllProvinces, getProvinceByCode } = require("../controllers/province_Controller");

router.get("/", getAllProvinces);
router.get("/:code", getProvinceByCode);

module.exports = router;
