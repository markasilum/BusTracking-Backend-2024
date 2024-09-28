const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/get-user", usersController.getUser);
router.post("/create", usersController.createUser);

module.exports = router