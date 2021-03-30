const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

exports.sign = payload => jwt.sign(payload, secret)

exports.verify = token => jwt.verify(token, secret)
