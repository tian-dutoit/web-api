const express = require('express')
const bodyParser = require('body-parser')

const users = require('./routes/users')

const server = express()

// Middleware
server.use(bodyParser.json())
server.use(express.static('public'))

// Routes
server.use('/api/v1/users', users)

module.exports = server
