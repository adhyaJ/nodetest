const express = require('express'),
routes = express.Router();
const userController = require('./controller/user-controller');
const eventController = require('./controller/event-controller');
const passController = require('./controller/passController');
const passport = require('passport');
const nodemailer = require("nodemailer");

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/forget-password',passController.forgotPassword);
routes.post('/reset-password',passController.resetPassword);
routes.post('/event', eventController.createEvent);



/*-------------------SMTP Start--------------------------*/
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "adhaya.jain@gmail.com",
        pass: "adhyaJ@1604"
    }
});
/*------------------Routing Started ------------------------*/
routes.post('/send',function(req,res){
    var mailOptions={
        from: req.body.from,
        to : req.body.to,
        subject : req.body.subject,
        text : 'Check out this link and respond! http://ec2-18-220-116-185.us-east-2.compute.amazonaws.com'
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.json({
            message: 'Error'
        })
     }else{
            console.log("Message sent: " + response.message);
        res.json({
            message: 'Sent'
        })
         }
});
});
/*--------------------Routing Over----------------------------*/

module.exports = routes;
