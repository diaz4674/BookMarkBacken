const bcrypt = require("bcryptjs");
const User = require("./users-helpers");
const jwt = require('jsonwebtoken')
// const JWT = require("jsonwebtoken");
const secrets = require('./secrets.js')

function generateToken(user) {
    const payload = {
      id: user._id,
      s: user.username,
    };
    const signOptions = {
        expiresIn: "1d"
      };
      return jwt.sign(payload, secrets, signOptions);
    }


const auth = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findUser({ email });

    //   if (!user) {
    //     res.status(400).json("User not found");
    //   }

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        console.log(token);
        req.user_id = user.id;
        req.token = token;
        next();
      } else {
        res.status(404).json("Invalid username or password!");
      }
    } catch (err) {
      res.status(500).json("Internal Server Error!");
    }
  };


module.exports = {
    auth,
  };