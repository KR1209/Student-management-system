const db = require("../database");

//create courses
const createCourse =(course_name, course_code, credits, department) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO courses (course_name, course_code, credits, department) VALUES (?, ?, ?, ?)";
        db.run(sql, [course_name, course_code, credits, department], function(err){
            if (err) {
                reject(err);
            }else{
                resolve({id: this.lastID, course_name, course_code, credits, department});
            }
        });
    });
};

//read for courses
const getAllCourses = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM courses";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getCourseById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM course WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err) {reject(err);
        }else {
            resolve(row);
        }
      });
    });
  };

//update for courses
const updateCourse = (id, course_name, course_code, credits, department) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE courses SET course_name = ?, course_code = ?, credits = ?, department = ? WHERE id = ?";
        db.run(sql, [course_name, course_code, credits, department, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Update successful", changes: this.changes });
            }
        });
    });
};

//delete for courses
const deleteCourse = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM courses WHERE id = ?";
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Successfully deleted course", changes: this.changes });
            }
        });
    });
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};