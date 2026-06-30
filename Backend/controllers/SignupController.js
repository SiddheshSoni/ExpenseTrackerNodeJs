const Users = require("../models/Users");
const bcrypt = require("bcrypt");


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

        res.status(201).send("Added New User Successfully!");
        
    } catch (error) {
        res.status(500).send("Failed to add New User!" + error);        
    }
};

module.exports = {
    addUser,
    // getUser,
}