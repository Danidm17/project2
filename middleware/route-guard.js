const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/log-in', { errorMessage: 'Log in' })
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/rooms')
    }
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/log-in', { errorMessage: 'You don´t have permissions' })
    }
}

module.exports = { isLoggedIn, isLoggedOut, checkRole }