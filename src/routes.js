const express = require('express'),
routes = express.Router();
const userController = require('./controller/user-controller');
const eventController = require('./controller/event-controller');
const emailController = require('./controller/email-controller');
const passport = require('passport');
const nodemailer = require("nodemailer");

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

routes.post('/event', eventController.createEvent);



/*-------------------SMTP Start--------------------------*/
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "adhaya.jain@gmail.com",
        pass: "soopy@adhya"
    }
});
/*------------------Routing Started ------------------------*/
routes.post('/send',function(req,res){
    var mailOptions={
        from: req.body.from,
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text
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
