const express = require('express');
// const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const User = require('./../models/User.model')
const Room = require('./../models/Room.model')

router.get("/profile", (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser })
})

// router.get('/profile', (req, res, next) => {
//     Room
//         .find()
//         .sort({ title: 1 })
//         .then(room => {
//             res.render('user/profile', { room })
//         })
//         .catch(err => next(err))
// })

module.exports = router