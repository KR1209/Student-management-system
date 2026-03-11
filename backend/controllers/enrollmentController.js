const enrollment = require("../models/enrollment");

// controller for enrollments
const createEnrollment = async(req, res) =>{
    const {student_id, course_id} = req.body;
    try{
        const newEnrollment = await enrollment.createEnrollment(student_id, course_id);
        res.status(201).json(newEnrollment);
    } catch (err) {
        res.status(500).json({error: "Error enrolling student in course"});
    } 
}

const getAllEnrollments = async(req, res) =>{
    const {id} = req.params;
    try{
        const enrollments = await enrollment.getAllEnrollments();
        res.status(200).json(enrollments);
    } catch (err){
        res.status(500).json({error: "Error fetching enrollments"});
    }
}

const getEnrollmentById = async(req, res) =>{
    const {id} = req.params;
    try{
        const enrollmentData = await enrollment.getEnrollmentById(id);
        if(enrollmentData){
            res.status(200).json(enrollmentData);
        }else{
            res.status(404).json({erro: "Enrollment not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error in fetching enrollment"});
    }
    }


const updateEnrollment = async (req, res) =>{
    const { id} = req.params;
    const {student_id, course_id} = req.body;
    try{
        const updateEnrollmentData = await enrollment.updateEnrollment(course_id, student_id, id);
        if(updateEnrollmentData.changes > 0){
            res.status(200).json({message: "Enrollment updated successfully"});
        } else{
            res.status(404).json({error:" Enrollment not found"});
        }
    }
    catch (err){
        res.status(500).json({error: "Error in updating enrollment"});
    }
}

const deleteEnrollment = async(req, res) =>{
    const {id} = req.params;   
    try{
        const deleteEnrollmentData = await enrollment.deleteEnrollment(id);
        if(deleteEnrollmentData.changes >0){
            res.status(200).json({message: "Enrollment deleted successfully"});
        }else{
            res.status(404).json({error: "Enrollment not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error in deleting enrollment"});  
    }
}

module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
}
