const db = require("../database");

//create teachers
const createTeacher =(name, email, department) =>{
    return new Promise((resolve, reject) =>{
        const sql = "INSERT INTO teachers (name, email, department) VALUES (?, ?, ?)";
        db.run(sql, [name, email, department], function(err){
            if (err) {
                reject(err);
            } else{
                resolve({id: this.lastID, name, email, department});
            }
        });
    });
};
    
// read for teachers
const getALLTeachers = () =>{
    return new Promise((resolve, reject) =>{
        const sql = "SELECT * FROM teachers";
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
            } else{
                resolve(rows);
            }
        });
    });
};

const getTeacherById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM teacher WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err) {reject(err);
        }else {
            resolve(row);
        }
      });
    });
  };

//update for teachers
const updateTeacher = (id, name, email, department) =>{
    return new Promise((resolve, reject) =>{
        const sql = "UPDATE teachers SET name =?, email = ?, department =?, wWHERE id =?";
        db.run(sql,[name,email, department, id], function(err){
            if(err){
                reject(err);
            }else{
                resolve({message:"Update successful", chnages: this.changes});
            }
            });
    });
};

//delete for teachers
const deleteTeacher = (id) =>{
    return new Promise((resolve, reject) =>{        
        const sql = "DELETE FROM teachers WHERE id = ?";
        db.run(sql, [id], function(err){
            if(err){
                reject(err);
            } else{
                resolve({message: "Successfully deleted teacher", changes: this.changes});
            }
        });
    });
};

module.exports = {
    createTeacher,
    getALLTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};