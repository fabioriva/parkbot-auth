const {
  hashPassword,
  comparePassword,
  generatePassword
} = require('./password')
const { sign, verify } = require('./jwt')
const rights = require('./rights')
const roles = require('./roles')
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
      reply.send(user)
    }
  })
  /**
   * route: /user (insert user)
   */
  fastify.get('/user', async function (request, reply) {
    const user = new User(
      'bmc',
      'en',
      rights.SERVICE_RIGHTS,
      roles.SERVICE_ROLES,
      '0987poiu.',
      'Asia/Kolkata',
      'service@bmc'
    )
    user.password = await hashPassword(user.password)
    const result = await users.insertOne(user)
    reply.send({ result })
  })
  /**
   * route: /password
   */
  fastify.get('/password', async function (request, reply) {
    const password = await generatePassword(6)
    reply.send({ password })
  })
  /**
   * route: /users
   */
  fastify.get('/users', async function (request, reply) {
    const userList = await users.find({}).toArray()
    reply.send({ userList })
  })
}

module.exports = routes
