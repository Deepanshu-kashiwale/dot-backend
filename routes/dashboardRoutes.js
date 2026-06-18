const express =require("express");

const router =express.Router();

const { getDashboard } = require("../controllers/dashboardController");

router.get("/dashboard/:p_code",getDashboard);

module.exports =
router;     