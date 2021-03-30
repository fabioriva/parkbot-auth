const bcrypt = require('bcrypt')
const util = require('util')

const saltRounds = 10

exports.hashPassword = util.promisify((password, callback) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return callback(err)
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return callback(err)
      callback(err, hash)
    })
  })
})

exports.comparePassword = util.promisify((password, hash, callback) => {
  bcrypt.compare(password, hash, function (err, result) {
    if (err) return callback(err)
    callback(err, result)
  })
})
