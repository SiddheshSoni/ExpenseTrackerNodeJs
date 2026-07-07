const { Users } = require("../models/index");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const Authenticate = async (req, res, next) =>{
    try {
        const token = req.header('Authorization');

        const user = jwt.verify(token, process.env.SECRET_KEY);
        console.log(user);
        Users.findByPk(user.userId).then(user =>{
            req.user = user;
            next();
        });

    } catch (error) {
        return res.status(401).json({sucess: false});
    }
}

module.exports = Authenticate;