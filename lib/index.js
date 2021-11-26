require('dotenv').config()
const micro = require('micro')
const MongoClient = require('mongodb').MongoClient
const { login, profile } = require('./routes')

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
      if (method === 'POST' && url === '/auth/login') {
        await login(micro, req, res, users)
      }
      if (method === 'POST' && url === '/auth/profile') {
        await profile(micro, req, res)
      }
    }).listen(process.env.HTTP_PORT)
  } catch (err) {
    console.log.error(err)
    process.exit(1)
  }
}

start()
