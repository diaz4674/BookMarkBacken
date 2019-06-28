const axios = require('axios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('./secrets.js')
const db = require('../data/dbConfig.js')
const Users = require('./users-helpers.js')

const {authenticate} = require('../auth/authenticate')

generateToken = (user) =>{
    return jwt.sign({
        userId: user.id,
    }, secrets.jwt, {
        expiresIn:'1d'
    })
}

module.exports = server => {
    server.get('/', welcome)
    server.post('/register', register)
    server.post('/login', login)
    server.get('/financial', authenticate, financial)
    server.get('/shopping', authenticate, shopping)
    server.get('/personal', authenticate, personal)
    server.post('/addBanks', addBanks)
    server.get('/getUser/:id', getUser)
}

const welcome = (req, res) => {
    res.send('Welcome!')
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

const financial = (req, res) => {
    db('financial')
        .then(finance => {
            res.status(200).json(finance)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const addBanks = (req, res) => {
    let bod = req.body

    bod.map(theseBanks => {
        Users.addFinancial(theseBanks)
        .then(newBank => {
            res.status(200).json(newBank)
        })
        .catch(err =>  {
            res.status(500).json(err)
        })
    })

}

const shopping = (req, res) => {
    db('shopping')
        .then(shopping => {
            res.status(200).json(shopping)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const personal = (req, res) => {
    db('personal')
        .then(personal => {
            res.status(200).json(personal)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const getUser = (req, res) => {
    let {id} = req.params
    console.log(req.body)
    

}