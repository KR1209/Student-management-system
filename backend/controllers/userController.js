const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


// CREATE USER
const registerUser = async (req, res) => {
      const { name, password, role } = req.body;

      // VALIDATION (CRUCIAL)
      if (!name || !password || !role) {
        return res.status(400).json({error: "name, password, and role are required" });
      }
      try{
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.createUser(name, hashPassword, role);
      res.status(201).json({message: "user registered successfully", user: user});
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
    }
  };

const loginUser = async (req, res) =>{
    const {name, password} = req.body;
    try{
      const user = await User.findUserByName(name);
      if (!user){
        return res.status(400).json({error: "Invalid username or password"});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        return res.status(400).json({error: "Invalid username or pasword"});
      }

      const token = jwt.sign(
        {userId: user.id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
        );
      res.json({
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });
    } catch (err){
      res.status(500).json({error: "Error logging in user"});
    }

  }



module.exports = {
    registerUser,
    loginUser
};