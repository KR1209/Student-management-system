const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const isAdmin = require("../middleware/adminMiddleware");
const verifyToken = require('../middleware/authMiddleware');

const {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent} 
= studentController;

router.post("/",verifyToken,isAdmin, studentController.createStudent);
router.get("/",verifyToken, studentController.getAllStudents);
router.get("/:id", verifyToken, studentController.getStudentById);
router.put("/:id", verifyToken, isAdmin, studentController.updateStudent);
router.delete("/:id", verifyToken,isAdmin, studentController.deleteStudent);



module.exports = router;