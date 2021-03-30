const bcrypt = require('bcrypt')
// const mongo = require('mongodb')
// const util = require('util')

const saltRounds = 10

class User {
  constructor (aps, locale, rights, roles, password, timezone, username) {
    this.aps = aps
    this.locale = locale
    this.rights = rights
    this.roles = roles
    this.password = password
    this.timezone = timezone
    this.username = username
  }

  decrypt (hash, password) {
    try {
      bcrypt.compare(password, hash, function (err, result) {
        if (err) throw err
        return result // result = bool
      })
    } catch (error) {}
  }

  encrypt (password) {
    try {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) throw err
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) throw err
          // Store hash in your password DB.
          return hash
        })
      })
    } catch (error) {}
  }

  async getAuthenticated (db, username, password) {
    const users = db.collection('parkbot-users')
    const user = await users.findOne({ username })
    return user
  }
}

module.exports = User
