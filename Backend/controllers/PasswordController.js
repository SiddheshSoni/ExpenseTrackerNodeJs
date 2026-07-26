const { BrevoClient } =  require('@getbrevo/brevo');
const brevo = new BrevoClient({ apiKey: process.env.SendInBlueAPIKey });
const ForgotPasswordRequest = require('../models/ForgotPassReq');
const { Users } = require('../models');
const { v4 } = require('uuid');
require("dotenv").config();


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
        const uuid = await v4();
        console.log(uuid);
        console.log(user);

        const resetPassRequest = await ForgotPasswordRequest.create({
            id:uuid,
            UserId:user.id,
            isActive:true,
        });

        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: 'Hello from Sid!',
            htmlContent: `<html><body><p>Hello,${user.username}</p><p>Password Reset Link: https://localhost:3000/password/resetPassword/${uuid}</p></body></html>`,
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
    try{
        const uuid = req.params.uuid;

        const PassRequest = await ForgotPasswordRequest.findOne({
            where:{
                id:uuid,
            },
            //transaction
        });
        if(PassRequest.isActive === true){
            
        }
        
    }catch(error){
        console.log(error);
    }
};

module.exports = {
    forgotPass
}