require('dotenv').config()
const micro = require('micro')
const MongoClient = require('mongodb').MongoClient
const { login, profile } = require('./routes')
// const fastify = require('fastify')({ logger: { name: 'parkbot-auth' } })
// const { sign, verify } = require('./jwt')
// const {
//   hashPassword,
//   comparePassword,
//   generatePassword
// } = require('./password')
// const rights = require('./rights')
// const roles = require('./roles')
// const User = require('./User')

const start = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = client.db('parkbot')
    const users = db.collection('users')
    await users.createIndex({ username: 1 }, { unique: true })
    micro(async (req, res) => {
      const { method, url } = req
      console.log(method, url)
      if (method === 'POST' && url === '/auth/login') {
        await login(micro, req, res, users)
      }
      if (method === 'POST' && url === '/auth/profile') {
        await profile(micro, req, res)
      }
      /**
       * route: /user/add
       */
      // if (req.url === '/user/add') {
      //   const user = new User(
      //     'wallstreet',
      //     'en',
      //     rights.ADMIN_RIGHTS,
      //     roles.ADMIN_ROLES,
      //     'h0savP6L.',
      //     'America/Los_Angeles',
      //     'sotefin@wallstreet'
      //   )
      //   user.password = await hashPassword(user.password)
      //   const result = await users.insertOne(user)
      //   micro.send(res, 200, result)
      // }
    }).listen(process.env.HTTP_PORT)
  } catch (err) {
    console.log.error(err)
    process.exit(1)
  }
}

// const start = async () => {
//   try {
//     const client = await MongoClient.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     fastify.register(require('fastify-mongodb'), { client })
//     fastify.register(require('./routes'), {
//       prefix: '/auth'
//     })
//     await fastify.listen(process.env.HTTP_PORT)
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }
start()
