const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');
const userController  = require("../controllers/userController");


router.post('/register',userController.registerUser)

router.post('/login', userController.loginUser)

router.get('/profile', verifyToken, (req, res) => {
    res.json({message : "Welcome to your profile", user: req.user});
});

router.get('/admin-dashboard', verifyToken, isAdmin, (req, res) => {
    res.json({message:" Welcome Admin!"})
});
   

module.exports = router;