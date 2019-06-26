const axios = require('axios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('./secrets.js')
const db = require('../data/dbConfig.js')
const Users = require('./helpers.js')

const {authenticate} = require('../auth/authenticate')

generateToken = (user) =>{
    return jwt.sign({
        userId: user.id,
    }, secrets.jwt, {
        expiresIn:'1h'
    })
}

module.exports = server => {
    server.get('/', welcome)
    server.post('/register', register)
    server.post('/login', login)
    server.get('/works', authenticate, works)
}

const welcome = (req, res) => {
    res.send('Welcome!')
}

const works = (req, res) => {
    res.send('it passed!')
}

const register = (req, res) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    Users.add(user)
    .then(saved => {
        const token = generateToken(saved)

        res.status(200).json({
            message: `Welcome ${user.username}`,
            token: token
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

const login = (req, res) => {
    let {email, password} = req.body

    Users.findBy({email})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)

            res.status(200).json({
                message: `Welcome back ${user.username}`,
                token: token
            })
        } else {
            res.status(500).json({message: "Sorry, email or password does not match. Try again."})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

