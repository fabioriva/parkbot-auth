const User = require('./User')
const { hashPassword, comparePassword } = require('./crypto')
const { sign, verify } = require('./jwt')
const { ADMIN_RIGHTS } = require('./rights')
const { ADMIN_ROLES } = require('./roles')

async function routes (fastify, options) {
  /**
   * route: /login
   */
  fastify.post('/login', async function (request, reply) {
    const { username, password } = request.body
    console.log(username, password)
    const db = this.mongo.client.db(process.env.AUTH_DB)
    const users = db.collection('users')
    const user = await users.findOne({ username })
    const check = await comparePassword(password, user.password)
    if (!user || !check) {
      reply
        .code(401)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: 'message' })
    } else {
      console.log(user)
      const payload = {
        aps: user.aps,
        rights: user.rights,
        roles: user.roles,
        locale: user.locale,
        tz: user.timezone,
        username: user.username
      }
      const token = sign(payload)
      const { aps, locale } = payload
      reply.send({ aps, locale, token })
    }
  })
  /**
   * route: /profile
   */
  fastify.post('/profile', async function (request, reply) {
    if (!('authorization' in request.headers)) {
      reply
        .code(401)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: 'Authorization header missing' })
    } else {
      const authorization = await request.headers.authorization
      const { token } = JSON.parse(authorization)
      const user = verify(token)
      console.log(user)
      reply.send(user)
    }
  })
  /**
   * route: /user (insert user)
   */
  fastify.get('/user', async function (request, reply) {
    const user = new User(
      'wallstreet',
      'en',
      ADMIN_RIGHTS,
      ADMIN_ROLES,
      '123456',
      'America/Los_Angeles',
      'sotefin'
    )
    user.password = await hashPassword(user.password)
    console.log(user)
    const db = this.mongo.client.db(process.env.AUTH_DB)
    const users = db.collection('users')
    const result = await users.insertOne(user)
    console.log(result)
    reply.send({ user })
  })
}

module.exports = routes
