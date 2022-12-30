const express = require('express')
const { login } = require('../controllers/user')

const routes = express()

routes.post('/login', login)

module.exports = routes