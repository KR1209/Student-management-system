const express = require('express');
const router = express.Router();

const {createEnrollment, getAllEnrollments, getEnrollmentById, updateEnrollment, deleteEnrollment}
 = require("../controllers/enrollmentController");

router.post("/", createEnrollment);

router.get("/", getAllEnrollments);

router.get("/:id", getEnrollmentById);

router.put("/:id", updateEnrollment);

router.delete("/:id", deleteEnrollment);

module.exports = router;
