require('dotenv').config()
const fastify = require('fastify')({ logger: { name: 'parkbot-auth' } })
const MongoClient = require('mongodb').MongoClient

const start = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    fastify.register(require('fastify-mongodb'), { client })
    fastify.register(require('./routes'), {
      prefix: '/auth'
    })
    await fastify.listen(process.env.HTTP_PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
