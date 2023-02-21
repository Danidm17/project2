const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
});

module.exports = transporter