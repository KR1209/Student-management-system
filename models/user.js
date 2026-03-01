const db = require('../database');

// create user
const createUser = (name, password, role) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (name, password, role)VALUES (?, ?, ?)`;
    db.run(sql, [name, password, role], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, name, role });
    });
  });
};

    // create for password reset token
    const createPasswordResetToken = (user_id, token, expires_at) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)";
            db.run(sql, [user_id, token, expires_at], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, user_id, token, expires_at });
                }
            });
        });
    }

    module.exports = {
        createUser,
        createPasswordResetToken
    };