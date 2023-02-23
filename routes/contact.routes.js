const express = require('express');
const router = express.Router();
const transporter = require('../config/transporter.config')
const Room = require('./../models/Room.model')
const { isLoggedIn } = require('../middleware/route-guard')


router.get("/contact/:room_id", isLoggedIn, (req, res, next) => {

    const { room_id } = req.params

    Room
        .findById(room_id)
        .populate('owner', 'email')
        .then(room => {
            const { email } = room.owner
            res.render("contact/contact", { email })
        })
        .catch(error => next(error))
})

router.post("/contact", isLoggedIn, (req, res, next) => {

    const { message, subject, email } = req.body

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,

    })
        .then(() => res.redirect('/rooms'))
        .catch(error => next(error))
})

module.exports = router;
