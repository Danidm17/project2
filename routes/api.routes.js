const express = require('express');
const router = express.Router();

const Room = require('../models/Room.model')

router.get("/rooms", (req, res) => {

    Room
        .find()
        .select({ name: 1, _id: 1, location: 1 })
        .sort({ name: 1 })
        .then(rooms => res.json(rooms))
        .catch(err => res.status(500).json(err))
})

router.get("/details/:_id", (req, res) => {

    const { _id } = req.params

    Room
        .findById(_id)
        .then(room => res.json(room))
        .catch(err => res.status(500).json(err))
})

module.exports = router 