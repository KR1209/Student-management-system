const student = require("../models/student");

// controller for students
const createStudent = async(req, res) =>{
    const {name, email, year, department} = req.body;
    try{
        const newStudent = await student.createStudent(name, email,year, department);
        res.status(201).json(newStudent);
    } catch (err){
        res.status(500).json({error: "Error creating student"});
    }
}

const getAllStudents = async(req, res) =>{
    try{
        const students = await student.getAllStudents();
        res.status(200).json(students);
    } catch (err){
        res.status(500).json({error: "Error fetching students"});
    }
}

const getStudentById = async(req,res) =>{
    const {id} = req.params;
    try{
        const studentData = await student.getStudentById(id);
        if(studentData){
            res.status(200).json(studentData);
        } else{
            res.status(404).json({error: "student not found"});
        }
    }
    catch (err){
        res.status(500).json({error: "Error fetching student"});
    }
}

const updateStudent = async(req, res) =>{
    const {id} = req.params;
    const{name, email, year, department} = req.body;
    try{
        const updateStudentData = await student.updateStudent(id,name, email, year, department);
        if(updateStudentData.changes > 0){
            res.status(200).json({message: "Student updated successfully"});
        } else{
            res.status(404).json({error: "student not found"});
        }
    }catch (err){
        res.status(500).json({error: "Error in updating student"});
    }
    }

    const deleteStudent = async(req, res) =>{
        const{id} = req.params;
        try{
            const deleteStudentData = await student.deleteStudent(id);
            if(deleteStudentData.changes > 0){
                res.status(200).json({message: "student deleted successfully"});
            }else{
                res.status(404).json({message: "Student not found"});
            }
            }
            catch (err) {
                res.status(500).json({error : "Error deleting student"});
            }
        }

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}
    