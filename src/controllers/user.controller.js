const User = require('./../models/User.model')
const transporter = require("./../helpers/helpers")
const generateRandomString = require('./../helpers/GenerateRandom');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const ejs = require('ejs')
const path = require("path");

require("dotenv").config();

class UserController {

async Register(req, res){
    try{
        const {username, email, phoneNumber, password, passwordconfirmation} = 
        req.body;
        if(password !== passwordconfirmation){
            res.status(500).json("password do not match");
        }


        const hashed = CryptoJs.SHA256(password, process.env.PASSWORD_KEY).toString();

        const newUser = new User({
            username,
            email,
            phoneNumber,
            password: hashed
        });

        await newUser.save();

        const filePath = path.join(__dirname, '../services/emails/register.ejs');
        const html = await ejs.renderFile(filePath, {name:newUser.username, email: newUser.email})

       const info = await transporter.sendMail({
            from: process.env.GMAIL_NAME,
            to: newUser.email,
            subject: "welcome to Todo-List",
            html: html

        })

        console.log ("Message sent: %s ", info.messageId);

        res.status(201).json({
            message: "Registration successful. Proceeed to login",
            data: newUser
        });




    }catch(error){
        console.log(error)
    }
}
async Login (req, res){
    try{
        // Email && Password to login
        // check if user exists with email
        // check if password matches
        // generate access token => userid and email
        // send access token + Username

        const {email, password} = req.body
        const user = await User.findOne({ email: email})
        if(!user){
            res.status(404).json({ message: "User not found"})
        }

        const hashedPassword = CryptoJs.SHA256(password, process.env.PASSWORD_KEY).toString();

         /* `ifPasswordMatch` is a boolean variable that checks if the hashed password provided by
        the user matches the hashed password stored in the database for the user. It compares
        the two hashed passwords and returns `true` if they match, indicating that the
        password provided by the user is correct. If the hashed passwords do not match, it
        returns `false`, indicating that the password provided by the user is incorrect. */
        const ifPasswordMatch  = user.password === hashedPassword
        if (!ifPasswordMatch){
            res.status(404).json({ message: "Either password of email is incorrect" })
        }

        // JSONWEBTOKEN 
        // import jwt from jsonwebtoken
        // Accepts 3 things, 
        // => object 
        // =>secret key
        // expiration period

        const accessToken = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_KEY, {expiresIn: "5h"})

        res.status(200).json({ 
            message: "login successful",
            data: {
                email: user.email, 
                username: user.username
            },
            accessToken: accessToken
        })


    }catch(error){
        console.log(error)
    }
}

// forget password will have two steps
// pass in email
// use email to check database if user exists 
// if user exists, send a reset token => a certain page where user will pass a reset token and enter new password
// use reset token to check for user. if user exists take a password and update password and reset token to null.

async ForgotPassword (req, res) {
    try{
    const {email} = req.body;
    const user = await User.findOne({ email: email})
    if (!user){
        res.status(404).json({ message: "User not found"})
    }
    user.resetToken = generateRandomString(6);
    user.save()

    const filePath = path.join(__dirname, "../services/emails/forgotpassword.ejs");
    let html = await ejs.renderFile(filePath, {
        username: user.username,
        resetToken: user.resetToken,
    })

    const info = await transporter.sendMail({
        from: process.env.GMAIL_NAME,
        to: user.email,
        subject: "password reset",
        html,
    });

    console.log("message sent: %s", info.messageId);
    res.status(200).json({
        message: "Request has been received. An email has been sent with the reset token.",
    })

    }catch(error){
        console.log(error)
    }


}
}

module.exports = new UserController();