const express = require("express");
const router = express.Router();
const systemController = require('../controllers/systemControllers')

router.get("/statistics", systemController.getStatChannel );
router.get("/setting", systemController.getSystemSetting );





module.exports = router;