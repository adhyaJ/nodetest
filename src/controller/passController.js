const nodemailer = require('nodemailer');
const path = require('path');
const User = require('../models/user');
const hbs = require('nodemailer-express-handlebars');
const async= require('async');
const crypto = require('crypto');
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "adhaya.jain@gmail.com",
        pass: "adhyaJ@1604"
    }
});
// const handlebarsOptions = {
//     viewEngine: 'handlebars',
//     viewPath: path.resolve('./templates/'),
//     extName: '.html'
//   };
  
//   smtpTransport.use('compile', hbs(handlebarsOptions));

//Method for forgot passwords starts.....

exports.forgotPassword = function(req, res) {
    
    async.waterfall([
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          const token = Buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        const data = {
          to: user.email,
          from: "adhaya.jain@gmail.com",
          subject: 'Password help has arrived!',
          text: 'http://localhost:5000/api/reset-password'
          
        };
  
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };
  
//Method for reset passwords starts.....

exports.resetPassword = function(req, res, next) {
    User.findOne({
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    }).exec(function(err, user) {
      if (!err && user) {
        if (req.body.newPassword === req.body.verifyPassword) {
          user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function(err) {
            if (err) {
              return res.status(422).send({
                message: err
              });
            } else {
              var data = {
                to: user.email,
                from: email,
                template: 'reset',
                subject: 'Password Reset Confirmation',
                context: {
                }
              };
  
              smtpTransport.sendMail(data, function(err) {
                if (!err) {
                  return res.json({ message: 'Password reset' });
                } else {
                  return done(err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      } else {
        return res.status(400).send({
          message: 'Password reset token is invalid or has expired.'
        });
      }
    });
  };