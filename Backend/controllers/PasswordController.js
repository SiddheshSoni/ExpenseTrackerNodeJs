const { BrevoClient } =  require('@getbrevo/brevo');
const brevo = new BrevoClient({ apiKey: process.env.SendInBlueAPIKey });
const ForgotPasswordRequest = require('../models/ForgotPassReq');
const { Users } = require('../models');
const { v4 } = require('uuid');
require("dotenv").config();
const bcrypt = require("bcrypt");

//SIB Brevo
const forgotPass = async(req, res) =>{
    try {
        const { email } = req.body;
        const user = await Users.findOne({
            where:{
                email,
            },
            //transaction
        });
        if(!user){
            throw new Error("No User with Email found!");
        }
        const uuid = v4();
        console.log(uuid);
        console.log(user);

        const resetPassRequest = await ForgotPasswordRequest.create({
            id:uuid,
            UserId:user.id,
            isActive:true,
        });

        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: 'Hello from Sid!',
            htmlContent: `<html><body><p>Hello,${user.username}</p><p>Password Reset Link: <a href="http://localhost:3000/password/resetpassword/${uuid}">Reset Passowrd</a></p></body></html>`,
            sender: { name: 'Siddhesh Soni', email: 'sidxd8801@gmail.com' },
            to: [{ email: email }],
        });

        
        console.log('Email sent. Message ID:', result.messageId);
        res.status(200).json({
            message:'Email sent.',
            data: result.messageId
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error.message
        });
    }
};

const resetPassword = async(req, res) =>{
    // check req isActive? -> if active send a form -> set password in user password -> change isActive to false
    try{
        const uuid = req.params.uuid;

        const PassRequest = await ForgotPasswordRequest.findOne({
            where:{
                id:uuid,
                isActive:true
            },
            //transaction
        });

        if(!PassRequest){
            return res.status(400).send("Link Expired Regenerate!");
        }
        
        res.redirect(`http://localhost:5173/password/resetpassword/${uuid}`);
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
};

const updatePassword = async(req, res) =>{
    try {
        const uuid = req.params.uuid;
        const { newPassword }= req.body;

        const Request = await ForgotPasswordRequest.findOne({
            where:{
                id:uuid,
                isActive: true,
            }
        });

        if(!Request){
            return res.status(400).send("Link Expired Regenerate!");
        }

        const userId = Request.UserId;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await Users.update(
            {
                password:hashedPassword
            },
            {
                where:{
                    id:userId
                }
            }
        );
        
        await Request.update({
            isActive:false
        });

        return res.status(200).json({
            message: "Password updated successfully."
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}
module.exports = {
    forgotPass,
    resetPassword,
    updatePassword,
}