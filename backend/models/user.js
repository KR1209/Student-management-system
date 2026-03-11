const db = require('../database');

// Define createUser
const createUser = (name, password, role) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, password, role) VALUES (?, ?, ?)`;
        db.run(sql, [name, password, role], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, name, role });
        });
    });
};

// Define findUserByName
const findUserByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE name = ?"; 
        db.get(sql, [name], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};



//  Export them all at the end
module.exports = {
    createUser,
    findUserByName
};