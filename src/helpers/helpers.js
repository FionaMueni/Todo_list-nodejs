const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASSWORD
    }

});

module.exports = transporter;