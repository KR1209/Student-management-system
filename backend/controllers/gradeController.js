const grade = require("../models/grades");

// controller for grades
const createGrade = async(req, res) =>{
    const {enrollment_id, grade} = req.body;
    try{
        const newGrade = await grade.createGrade(enrollment_id, grade);
        res.status(201).json(newGrade);
    } catch (err){
        res.status(500).json({error: "Error creating grade"});
    }
}

const getAllGrades = async(req, res) =>{
    try{
        const grades = await grade.getAllGrades();
        res.status(200).json(grades);
    } catch (err){
        res.status(500).json({error: "Error fetching grades"});
    }
}

const getGradeById = async(req, res) =>{
    const {id} = req.params;    
    try{
        const gradeData = await grade.getGradeById(id);
        if(gradeData){
            res.status(200).json(gradeData);
        } else{
            res.status(404).json({error: "Grade not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error fetching grade"});
    }
}

const updateGrade = async(req, res) =>{
    const {id} = req.params;
    const {enrollment_id, grade} = req.body;
    try{
        const updateGradeData = await grade.updateGrade(enrollment_id, grade, id);
        if(updateGradeData.changes > 0){
            res.status(200).json({message: "Grade updated successfully"});
        }else{
            res.status(404).json({error: "Grade not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error updating grade"});
    }
}

const deleteGrade = async(req, res) =>{
    const {id} = req.params;
    try{
        const deleteGradeData = await grade.deleteGrade(id);
        if(deleteGradeData.changes > 0){
            res.status(200).json({message: "Grade deleted successfully"});
        }else{
            res.status(404).json({error: "Grade not found"});
        }
    } catch (err){
        res.status(500).json({error: "Error deleting grade"});
    }
}

module.exports = {  
    createGrade,
    getAllGrades,
    getGradeById,
    updateGrade,
    deleteGrade
}
    