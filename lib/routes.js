const { hashPassword, comparePassword } = require('./bcrypt')
const { sign, verify } = require('./jwt')
const { ADMIN_RIGHTS } = require('./rights')
const { ADMIN_ROLES } = require('./roles')
const User = require('./User')

async function routes (fastify, options) {
  const db = fastify.mongo.client.db('parkbot')
  const users = db.collection('users')
  await users.createIndex({ username: 1 }, { unique: true })
  /**
   * route: /login
   */
  fastify.post('/login', async function (request, reply) {
    const { username, password } = request.body
    const user = await users.findOne({ username })
    if (!user) return new Error('Unathorized')
    const check = await comparePassword(password, user.password)
    if (!check) return new Error('Unathorized')
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
      'h0savP6L.',
      'America/Los_Angeles',
      'sotefin@wallstreet'
    )
    user.password = await hashPassword(user.password)
    console.log(user)
    // const db = this.mongo.client.db(process.env.AUTH_DB)
    // const users = db.collection('users')
    const result = await users.insertOne(user)
    console.log(result)
    reply.send({ user })
  })
  fastify.get('/test', async function (request, reply) {
    const username = 'sotefin@wallstreett'
    const user = await users.findOne({ username })
    console.log(user)
    if (!user) return new Error('Unathorized')
    console.log('!!!!!', user)
    reply.send({ user })
  })
}

module.exports = routes
