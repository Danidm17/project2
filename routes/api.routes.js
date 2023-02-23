const express = require('express');
const router = express.Router();

const Room = require('../models/Room.model')

router.get("/rooms", (req, res, next) => {

    Room
        .find()
        .then(rooms => res.json(rooms))
        .catch(err => console.log(err))
})

// router.get("/details/:_id", (req, res, next) => {

//     const { _id } = req.params
//     Room
//         .findById(_id)
//         .then(rooms => res.json(rooms))
//         .catch(err => console.log(err))
// })

module.exports = router 