const express=require('express');
const nodemailer = require("nodemailer");
const app=express();
const config = require('../config/config');
exports.mailSend = (req, res) => {
/*-------------------SMTP Start--------------------------*/
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "t4tripty@gmail.com",
        pass: "the4thidiot"
    }
});
/*------------------Routing Started ------------------------*/
app.get('/send',function(req,res){
    var mailOptions={
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});
/*--------------------Routing Over----------------------------*/
}