const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedOut } = require('../middleware/route-guard')
const saltRounds = 10

router.get('/sign-up', isLoggedOut, (req, res, next) => res.render('auth/sign-up',
    { isAdmin: req.session.currentUser?.role === 'ADMIN' }))
router.post('/sign-up', (req, res, next) => {

    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/rooms'))
        .catch(error => next(error))
})

router.get('/log-in', isLoggedOut, (req, res, next) => res.render('auth/log-in'))
router.post('/log-in', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/log-in', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/log-in', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/rooms')
            }
        })
        .catch(error => next(error))
})

router.post('/log-out', (req, res, next) => {
    console.log('hola')
    req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router
