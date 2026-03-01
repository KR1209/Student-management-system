const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

const {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent} 
= studentController;

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;