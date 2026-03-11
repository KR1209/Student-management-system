const db = require("../database.js");

//create students
const createStudent = (name, email, year, department) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO students (name, email, year, department) VALUES (?, ?, ?, ?)"; 
    db.run(sql, [name, email, year, department], function(err) {
      if (err) {
        reject(err);
        } else {
            resolve({ id: this.lastID, name, email, year, department });
        }
    });
    });
};



//read for students
const getAllStudents = () => {
  return new Promise((resolve, reject) => { 
    const sql = "SELECT * FROM students";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        } else {
            resolve(rows);
        }
    });
    });
};


const getStudentById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err){ reject(err);
       } else{ resolve(row);
       }
      });
    });
  };

//update for students
const updateStudent = (id, name, email, year, department) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE students SET name = ?, email = ?, year = ?, department = ? WHERE id = ?";
    db.run(sql, [name, email, year, department, id], function(err) {
      if (err) {
        reject(err);
        } else {
            resolve({ message: "Update successful", changes: this.changes });
        }
    });
    });
};

//delete for students
const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM students WHERE id = ?";
    db.run(sql, [id], function(err) {
        if (err) {
            reject(err);
        } else {
            resolve({ message: "Successfully deleted student", changes: this.changes });
        }
    });
    });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};