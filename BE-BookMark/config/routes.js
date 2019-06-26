const axios = require('axios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const secrets = require('./secrets.js')
// const db = require('../database/dbConfig.js')
// const Users = require('./helpers.js')

// const {authenticate} = require('..auth/authenticate')

module.exports = server => {
    server.get('/', welcome)
}

const welcome = (req, res) => {
    res.send('Welcome!')
}