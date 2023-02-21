const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole, } = require('../middleware/route-guard');

const Users = require('../models/User.model')
const Room = require('./../models/Room.model');


router.get('/users', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    Users
        .find()
        // .find({
        //     $or: [
        //         { role: 'USER' },
        //         { role: 'ROOMHOLDER' },
        //         { role: 'ADMIN' }
        //     ]
        // })
        // .sort({ title: 1 })
        .then(users => {
            res.render('admin/list', {
                users: users,
            })
        })
        .catch(err => next(err))
})

router.get("/profile/:_id", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { _id } = req.params
    Room, Users
        .findById(_id)
        .then((user, room) => res.render('user/profile', {user, room,
            isAdmin: req.session.currentUser?.role === 'ADMIN'}))
        .catch(err => next(err))
})

router.get('/edit-profile/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Users
        .findById(_id)
        .then(user => res.render('users/edit-profile', user))
        .catch(err => next(err))
})

router.post('/edit-profile', isLoggedIn, (req, res, next) => {
    const { username, email, role, name, type, description, location, _id } = req.body

    Users
        .findByIdAndUpdate(_id, { username, email, role, name, type, description, location })
        .then(room => res.redirect('/profile'))
        .catch(err => next(err))
})

router.post('/delete/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Room
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/rooms'))
        .catch(err => next(err))
})

module.exports = router