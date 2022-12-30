const express = require('express')

const routes = express()

routes.use('/member', require('./user.js'))

module.exports = routes