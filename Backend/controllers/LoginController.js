const {Users} = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateJWTToken = (id, name) =>{
     return jwt.sign({userId: id, name: name}, process.env.SECRET_KEY);
}
const loginUser = async(req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await Users.findOne({
            where:{
                email:email
            }
        });

        if(!user){
            return res.status(401).send("User with Email not found! try again!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect Password!");
        } else {
            console.log(user);
            const token = generateJWTToken(user.id, user.username);
            return res.status(200).json({
                message: "User Credentials matched! Logged in successfully!",
                token: token
            });
        }
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
};

module.exports = {
    loginUser,
}