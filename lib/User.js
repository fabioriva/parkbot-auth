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

module.exports = User
