const express = require('express');
const router = express.Router();


const {createUser, createPasswordResetToken}  = require("../controllers/userController");


router.post("/", createUser);


router.post("/reset-token", createPasswordResetToken);

module.exports = router;