const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// CREATE USER
const createUser = async (req, res) => {
    try {
      const { name, password, role } = req.body;
  
      // VALIDATION (CRUCIAL)
      if (!name || !password || !role) {
        return res.status(400).json({
          error: "name, password, and role are required"
        });
      }
  
      const user = await User.createUser(name, password, role);
      res.status(201).json(user);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating user" });
    }
  };

// CREATE PASSWORD RESET TOKEN
const createPasswordResetToken = async (req, res) => {
    const { user_id } = req.body;

    try {
        if (!user_id) {
            return res.status(400).json({ error: "user_id required" });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires_at = new Date(Date.now() + 3600000); // 1 hour

        const newToken = await User.createPasswordResetToken(
            user_id,
            token,
            expires_at
        );

        res.status(201).json(newToken);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating password reset token" });
    }
};

module.exports = {
    createUser,
    createPasswordResetToken
};