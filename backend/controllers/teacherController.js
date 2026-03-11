const teacher = require("../models/teacher");

// controller for teachers
const createTeacher = async(req, res) =>{
    const {name, email, department} = req.body;
    try{
        const newTeacher = await teacher.createTeacher(name, email, department);
        res.status(201).json(newTeacher);
    } catch (err){
        res.status(500).json({error: "Error creating teacher"});
    }
}

const getAllTeachers = async(req, res) =>{
    try{
        const teachers = await teacher.getAllTeachers();
        res.status(200).json(teachers);
    } catch (err){
        res.status(500).json({error: "Error fetching teachers"});
    }
}

const getTeacherById = async(req, res) =>{
    const {id} = req.params;
    try{
        const teacherData = await teacher.getTeacherById(id);
        if(teacherData){
            res.status(200).json(teacherData);
        }
        else{
            res.status(404).json({error: "Teacher not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error fetching teacher"});
    }
}

const updateTeacher = async(req, res) =>{
    const {id} = req.params;
    const {name, email, department} = req.body;
    try{
        const updateTeacherData = await teacher.updateTeacher(id, name, email, department);
        if(updateTeacherData.changes > 0){
            res.status(200).json({message: "Teacher updated successfully"});
        } else{
            res.status(404).json({error: "Teacher not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error updating teacher"});
    }
}

const deleteTeacher = async(req, res) =>{
    const {id} = req.params;
    try{
        const deleteTeacherData = await teacher.deleteTeacher(id);
        if(deleteTeacherData.changes > 0){
            res.status(200).json({message: "Teacher deleted successfully"});
        } else{
            res.status(404).json({error: "Teacher not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error deleting teacher"});
    }
}

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}