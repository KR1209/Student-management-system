const db = require("../database");

// enrollment model
const createEnrollment = (student_id, course_id) =>{
    return new Promise((resolve, reject) =>{
        const sql = "INSERT INTO enrollments(student_id, course_id) VALUES (?, ?)";
        db.run(sql, [student_id, course_id] , function(err){
            if(err) {
                reject(err);
            } else {
                resolve({id: this.lastID, student_id, course_id});
            }
    });
});
};

//read for enrollments
const getAllEnrollments = () =>{
    return new Promise((resolve, reject) =>{
        const sql = "SELECT * FROM enrollments";
        db.all(sql, [], (err, rows) =>{
            if(err){
                reject(err);
            } else{
                resolve(rows);
            }
            });
        });
};

const getEnrollmentById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM enrollment WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err) {reject(err);
        }else {
            resolve(row);
        }
      });
    });
  };
    
//update for enrollments
const updateEnrollment = (id, student_id, course_id) =>{
    return new Promise((resolve, reject) =>{
        const sql = "UPDATE enrollments SET student_id = ?, course_id = ? WHERE id = ?";
        db.run(sql, [student_id,course_id, id], function(err){
            if(err){
                reject(err);
            }else{
                resolve({message: "Update successful", changes: this.changes});
                }
            });
        });
    };

    //delete for enrollments
    const deleteEnrollment = (id) =>{
        return new Promise((resolve, reject) =>{
            const sql = "DELETE FROM enrollments WHERE id = ?";
            db.run(sql,[id], function(err){
                if (err){
                    reject(err);
                } else{
                    resolve({message: "Successfully deleted enrollment", changes: this.changes});
                }
            });
        });
    };

    module.exports = {
        createEnrollment,
        getAllEnrollments,
        getEnrollmentById,
        updateEnrollment,
        deleteEnrollment
    };