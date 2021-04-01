const bcrypt = require('bcrypt')
const crypto = require('crypto')
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

/**
 * Generates cryptographically strong pseudo-random data.
 * The size argument is a number indicating the number of bytes to generate.
 * @returns Buffer
 */
exports.generatePassword = util.promisify((size, callback) => {
  crypto.randomBytes(size, function (err, buffer) {
    if (err) return callback(err)
    const password = buffer.toString('base64')
    callback(err, password)
  })
})
