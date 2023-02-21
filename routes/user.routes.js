const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const Room = require('./../models/Room.model');
const { isLoggedIn } = require('../middleware/route-guard');


router.get("/profile", isLoggedIn, (req, res, next) => {


    Room
        .find({ owner: req.session.currentUser._id })
        .sort({ title: 1 })
        .then(room => {
            res.render('user/profile', {
                room, user: req.session.currentUser,
                isRoomholder: req.session.currentUser?.role === 'ROOMHOLDER'
            })

        })
        .catch(err => next(err))
})


module.exports = router