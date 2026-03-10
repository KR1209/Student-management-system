const jwt = require("jsonwebtoken");

const verifyToken = (req,res, next) => {
    try{
        // read authorization
        const authHeader = req.headers.authorization;
        console.log("AUTH HEADER:", authHeader);

        //no header
        if(!authHeader){
            return res.status(401).json({message: "No token provided"});
        }
        
        //Bearer : token
        const parts = authHeader.split(" ");

        if(parts.length !== 2 || parts[0] !== "Bearer"){
            return res.status(401).json({message: "Invalid authorization format"});
        }

        //check no token
        const token = parts[1];

        if(!token){
            return res.status(401).json({message: "Invalid token "})
        }

        //verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                console.error("JWT ERROR:", err.message);
                return res.status(401).json({message: "Invalid or token expired"});
        }

        //save admin info 
        req.userId = decoded.userId;
        req.user = decoded;

        next();



    });
} catch(error){
    console.error("AUTH MIDDLEWARE ERROR:", error);
    return res.status(401).json({message:"Unauthorized"});
}
};

module.exports = verifyToken;