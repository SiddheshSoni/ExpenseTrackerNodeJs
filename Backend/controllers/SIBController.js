const { BrevoClient } =  require('@getbrevo/brevo');
require("dotenv").config();
const brevo = new BrevoClient({ apiKey: process.env.SendInBlueAPIKey });

const forgotPass = async(req, res) =>{
    try {
        const { email } = req.body;

        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: 'Hello from Sid!',
            htmlContent: '<html><body><p>Hello,</p><p>This is my first transactional email.</p></body></html>',
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
}


module.exports = {
    forgotPass
}