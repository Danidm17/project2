const express = require('express');
// const { isLoggedIn, } = require('../middlewares/route-guard');
const router = express.Router();

const Users = require('./../models/User.model')


router.get('/users', (req, res, next) => {
    Users
        .find({
            $or: [
                { role: 'USER' },
                { role: 'ROOMHOLDER' },
                { role: 'ADMIN' }
            ]
        })
        .sort({ title: 1 })
        .then(users => {
            res.render('users/list', {
                users: users,
                isPM: req.session.currentUser?.role === 'ADMIN',
            })
        })
        .catch(err => next(err))
})

module.exports = router