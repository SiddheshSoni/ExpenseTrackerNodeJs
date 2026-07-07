const {Users} = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateJWTToken = (id, name) =>{
     return jwt.sign({userId: id, name: name}, process.env.SECRET_KEY);
}

const addUser = async(req , res)=>{
    try {
        const {username, email, password} = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);

        const user = await Users.create({
            username,
            email, 
            password: hashedPassword,
        });

        const token = generateJWTToken(user.id, user.username);
        return res.status(201).json({
            message: "User Created successfully!",
            token: token
        }); 

    } catch (error) {
        res.status(500).send("Failed to add New User!" + error.message);        
    }
};

module.exports = {
    addUser,
    // getUser,
}