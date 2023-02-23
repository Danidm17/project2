const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const Room = require('./../models/Room.model');
const { isLoggedIn, checkRole } = require('../middleware/route-guard');

router.get("/profile", isLoggedIn, (req, res, next) => {

    const promises = [
        User.findById(req.session.currentUser._id),
        Room.find({ owner: req.session.currentUser._id })
    ]

    Promise
        .all(promises)
        .then(results => {
            const user = results[0]
            const room = results[1]
            console.log(user, room)
            res.render('user/profile', {
                user,
                room,
                isRoomholder: req.session.currentUser?.role === 'ROOMHOLDER',
                isAdmin: req.session.currentUser?.role === 'ADMIN'
            })
        })
        .catch(err => next(err))
})

router.get('/profile/:_id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { _id } = req.params
    const promises = [
        User.findById(_id),
        Room.find({ owner: _id })
    ]

    Promise
        .all(promises)
        .then(results => {
            const user = results[0]
            const room = results[1]
            console.log(user, room)
            res.render('user/profile', {
                user,
                room,
                isAdmin: req.session.currentUser?.role === 'ADMIN'
            })
        })

        .catch(err => next(err))
})

router.get('/users', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('admin/list', {
                users: users,
            })
        })
        .catch(err => next(err))
})
router.get('/edit-profile/:_id', isLoggedIn, (req, res, next) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => next(err))
})
router.post('/edit-profile', isLoggedIn, (req, res, next) => {
    const { username, email, role, _id } = req.body
    User
        .findByIdAndUpdate(_id, { username, email, role })
        .then(() =>
            'ADMIN' === req.session.currentUser.role ? res.redirect(`/profile/${_id}`) : res.redirect(`/profile`))
        .catch(err => next(err))
})
router.post('/deleteProfile/:_id', isLoggedIn, (req, res, next) => {
    const { _id } = req.params
    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/users'))
        .catch(err => next(err))
})

module.exports = router