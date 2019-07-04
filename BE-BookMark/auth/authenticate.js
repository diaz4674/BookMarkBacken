const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const User = require("../config/users-helpers");
const jwToken = require('jsonwebtoken')
// const JWT = require("jsonwebtoken");
const secrets = require('../config/secrets.js')


const jwtKey =
  process.env.JWT_SECRET;


function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if(err) return res.status(401).json(err)

            req.decoded = decoded
            
            next()
        })
    } else {
        return res.status(401).json({
            error: 'No token provided, must be set on the Authorization Header'
        })
    }
}


function generateToken(user) {
    const payload = {
      id: user.id,
    };
    const signOptions = {
        expiresIn: "1d"
      };
      return jwToken.sign(payload, secrets, signOptions);
    }


    async function auth(req, res, next) {
    try {
        // res.status(200).json({message: 'works'})
      const { email } = req.body;

      const user = await User.findBy({ email });


      if (!user) {
          
        res.status(400).json("User not found");
      } else {

        const token = generateToken(user)
        console.log(token.id);
   
        req.user_id = user.id;
        req.token = token;
        next();
      }

    } catch (err) {
      res.status(500).json("Internal Server Error!");
    }
  };


  module.exports = {
    authenticate,
    auth
}