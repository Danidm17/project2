const express = require('express');
const router = express.Router();
const uploaderMiddleware = require('../middleware/uploader.middleware');
const Room = require('./../models/Room.model')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get('/rooms', (req, res, next) => {
    Room
        .find()
        .select({ name: 1, type: 1, profileImg: 1, description: 1 })
        .sort({ name: 1 })
        .then(room => {
            res.render('rooms/list-rooms', {
                room,
                user: req.session.currentUser,
                isAdmin: req.session.currentUser?.role === 'ADMIN'
            })
        })
        .catch(err => next(err))
})

router.get("/create-rooms", isLoggedIn, checkRole('ROOMHOLDER'), (req, res, next) => {
    res.render("rooms/create-rooms")
})

router.post("/create-rooms", uploaderMiddleware.single('profileImg'), isLoggedIn, checkRole('ROOMHOLDER'), (req, res, next) => {

    const { name, type, latitude, longitude, description } = req.body
    const { path: profileImg } = req.file
    const { _id: owner } = req.session.currentUser

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Room
        .create({ name, type, location, profileImg, description, owner })
        .then(() => res.redirect('/rooms'))
        .catch(err => next(err))
})

router.get('/details/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Room
        .findById(_id)
        .then(room => {
            res.render('rooms/details-rooms', { room, isAdmin: req.session.currentUser?.role === 'ADMIN' })
        })
        .catch(err => next(err))
})

router.get('/edit/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Room
        .findById(_id)
        .then(room => res.render('rooms/edit-rooms', room))
        .catch(err => next(err))
})

router.post('/edit', isLoggedIn, (req, res, next) => {

    const { name, type, description, location, _id } = req.body

    Room
        .findByIdAndUpdate(_id, { name, type, description, location })
        .then(room => {

            'ADMIN' === req.session.currentUser.role ? res.redirect(`/profile/${room.owner.toString()}`) : res.redirect(`/profile`)

        })
        .catch(err => next(err))
})

router.post('/delete/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Room
        .findByIdAndDelete(_id)
        .then(room => {
            'ADMIN' === req.session.currentUser.role ? res.redirect(`/profile/${room.owner.toString()}`) : res.redirect(`/profile`)
        })
        .catch(err => next(err))
})

router.get("/rooms-map", (req, res, next) => {
    res.render("maps/show-map")
})

module.exports = router