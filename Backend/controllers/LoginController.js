const Users = require("../models/Users");
const bcrypt = require("bcrypt");

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
        }else{
            res.status(200).send("User Credentials matched! Logged in successfully!");
        }
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
};

module.exports = {
    loginUser,
}