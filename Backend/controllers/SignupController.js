const Users = require("../models/Users");

const addUser = async(req , res)=>{
    try {
        const {username, email, password} = req.body;

        const user = await Users.create({
            username,
            email, 
            password,
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