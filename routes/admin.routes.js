const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole, } = require('../middleware/route-guard');

const Users = require('../models/User.model')


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

module.exports = router