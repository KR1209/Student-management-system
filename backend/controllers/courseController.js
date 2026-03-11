const course = require("../models/course");

// controller for courses
const createCourse = async(req, res) =>{
    const {course_name, course_code, credits, department} = req.body;
    try{
        const newCourse = await course.createCourse(course_name, course_code, credits, department);
        res.status(201).json(newCourse);
    } catch (err){
        res.status(500).json({error: "Error creating course"});
    }
}

const getAllCourses = async (req, res) =>{
    const {id} = req.params;
    try{
        const courses = await course.getAllCourses();
        res.status(200).json(courses);
    } catch(err){
        res.status(500).json({error: "Error fetching courses"});
    }
    }

    const getCourseById = async (req, res) =>{
        const {id} = req.params;
        try{
            const courseData = await courses.getCourseById(id);
            if(courseData){
                res.status(200).json(courseData)
            } else{
                res.status(404).json({error: "Course not found"});
            }
        } catch (err){
            res.status(500).json({error: "Error fetching course"});
        }
    }

    const updateCourse = async(req, res) =>{
        const {id} = req.params;
        const {course_id, course_name, credits, department} = req.body;
        try{
            const updateCourseData = await course.updateCourse(id, course_id, course_name, credits, department);
            if(updateCourseData.changes > 0){
                res.status(200).json({message: "Course updated successfully"});
            } else{
                res.status(404).json({error: "Course not found"});
            }
        } catch(err){
            res.status(500).json({error:"Error updating course"})
        }
        }
    
        const deleteCourse = async(req, res) =>{
            const {id} = req.params;
            try{
                const deleteCourseData = await course.deleteCourse(id);
                if(deleteCourseData.changes > 0){
                    res.status(200).json({message: "Course deleted successfully"});
                } else{
                    res.status(404).json({error: "Course not found"});
                }
            } catch (err){
                res.status(500).json({error: "Error deleting course"});
            }
        }

        module.exports = {
            createCourse,
            getAllCourses,  
            getCourseById,
            updateCourse,
            deleteCourse
        };