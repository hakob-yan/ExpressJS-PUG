const User = require('../models/Users')

module.exports.authorize = (req, res, next) => {
    if (req.session && req.session.admin)
        return next()
    else
        return res.send(401)
}
module.exports.authenticate = (req, res, next) => {
    if (req.session && req.session.auth)
        return next()
    else
        return res.redirect('login')
}