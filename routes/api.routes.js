const express = require('express');
const router = express.Router();

const Room = require('../models/Room.model')

router.get("/rooms", (req, res, next) => {

    Room
        .find()
        .then(rooms => res.json(rooms))
        .catch(err => console.log(err))
})


module.exports = router