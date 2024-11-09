const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/get-user", usersController.getUser);
router.post("/create", usersController.createUser);
router.get("/index", usersController.userIndex);
router.post("/update-role", usersController.updateRole);



module.exports = router