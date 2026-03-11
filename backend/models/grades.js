const db = require("../database");

//create grades
const createGrade = (enrollment_id, grade) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO grades (enrollment_id, grade) VALUES (?, ?)";
        db.run(sql, [enrollment_id, grade], function(err) {
            if (err) {
                reject(err);
            }else {
                resolve({ id: this.lastID, enrollment_id, grade });
            }
        });
    });
};

//read for grades
const getAllGrades = () => {
    return new Promise((resolve, reject) => {   
        const sql = "SELECT * FROM grades";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getGradeById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM grade WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err) {reject(err);
        }else {
            resolve(row);
        }
      });
    });
  };

//update for grades
const updateGrade = (id, enrollment_id, grade) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE grades SET enrollment_id = ?, grade = ? WHERE id = ?";
        db.run(sql, [enrollment_id, grade, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Update successful", changes: this.changes });
            }
        });
    });
};

//delete for grades
const deleteGrade = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM grades WHERE id = ?";
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Successfully deleted grade", changes: this.changes });
            }
        });
    });
};

module.exports = {
    createGrade,
    getAllGrades,
    getGradeById,
    updateGrade,
    deleteGrade
};