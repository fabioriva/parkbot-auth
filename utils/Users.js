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
}

class Users {
  constructor (db) {
    this.collection = db.collection('users')
  }

  async userAdd (aps, locale, rights, roles, password, timezone, username) {
    const user = new User(aps, locale, rights, roles, password, timezone, username)
    const res = await this.collection.insertOne(user)
    console.log(`A user was inserted with the _id: ${res.insertedId}`)
  }

  async userDelete (query) {
    const result = await this.collection.deleteOne(query)
    if (result.deletedCount === 1) {
      console.log('Successfully deleted one document.')
    } else {
      console.log('No documents matched the query. Deleted 0 documents.')
    }
  }

  async userFind (query, options = {}) {
    const res = await this.collection.findOne(query, options)
    console.log('res', res)
  }

  async userRightAdd (username, right) {
    const res = await this.collection.updateOne({ username }, { $push: { rights: right } })
    console.log(res)
  }

  async userRoleAdd (username, role) {
    const res = await this.collection.updateOne({ username }, { $push: { roles: role } })
    console.log(res)
  }
}

module.exports = Users
