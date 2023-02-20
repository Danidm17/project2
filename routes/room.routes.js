const express = require('express');
const router = express.Router();
// const User = require('./../models/User.model')
const Room = require('./../models/Room.model')


router.get('/rooms', (req, res, next) => {
    Room
        .find()
        .sort({ title: 1 })
        .then(room => {
            res.render('rooms/list-rooms', { room })
        })
        .catch(err => next(err))
})

router.get("/create-rooms", (req, res, next) => {
    res.render("rooms/create-rooms")
})

router.post("/create-rooms", (req, res, next) => {

    const { name, type, profileImg, longitude, latitude, description } = req.body

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Room
        .create({ name, type, location, profileImg, description })
        .then(() => res.redirect('/rooms'))
        .catch(err => next(err))
})

router.get('/edit/:_id', (req, res, next) => {

    const { _id } = req.params

    Room
        .findById(_id)
        .then(room => res.render('rooms/edit-rooms', room))
        .catch(err => next(err))
})

router.post('/edit', (req, res, next) => {
    const { name, type, description, location, _id } = req.body

    Room
        .findByIdAndUpdate(_id, { name, type, description, location })
        .then(room => res.redirect('/rooms'))
        .catch(err => next(err))
})

router.post('/delete/:_id', (req, res, next) => {

    const { _id } = req.params

    Room
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/rooms'))
        .catch(err => next(err))
})


module.exports = router