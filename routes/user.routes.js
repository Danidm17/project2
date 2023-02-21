const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const Room = require('./../models/Room.model');
const { isLoggedIn } = require('../middleware/route-guard');


router.get("/profile", isLoggedIn, (req, res, next) => {
            
    Room
        .findById()
        
        .then(room => {
            res.render('user/profile', {
                room, user: req.session.currentUser,
                isRoomholder: req.session.currentUser?.role === 'ROOMHOLDER',
                isAdmin: req.session.currentUser?.role === 'ADMIN'
            })

        })
        .catch(err => next(err))
})
// router.get('/edit-profile/:_id', isLoggedIn, (req, res, next) => {

//     const { _id } = req.params

//     User
//         .findById(_id)
//         .then(user => res.render('users/edit-profile', user))
//         .catch(err => next(err))
// })

// router.post('/edit-profile', isLoggedIn, (req, res, next) => {
//     const { username, email, role, name, type, description, location, _id } = req.body

//     User
//         .findByIdAndUpdate(_id, { username, email, role, name, type, description, location })
//         .then(user => res.redirect('/profile'))
//         .catch(err => next(err))
// })

// router.post('/delete/:_id', isLoggedIn, (req, res, next) => {

//     const { _id } = req.params

//     User
//         .findByIdAndDelete(_id)
//         .then(() => res.redirect('/'))
//         .catch(err => next(err))
// })

module.exports = router