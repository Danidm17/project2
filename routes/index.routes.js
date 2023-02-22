const express = require('express');
const router = express.Router();
const transporter = require('../config/transporter.config')
const Room = require('./../models/Room.model')
const { isLoggedIn } = require('../middleware/route-guard')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
})

module.exports = router;
