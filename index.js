require('dotenv').config()
const http = require('http')
const micro = require('micro')
const MongoClient = require('mongodb').MongoClient
const { login, password, profile, signin } = require('./lib/routes')

const run = async () => {
  try {
    // const client = MongoClient.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // })
    const client = new MongoClient(process.env.MONGODB_URI, {})
    await client.connect()
    const db = await client.db('parkbot')
    const users = db.collection('users')
    await users.createIndex({ username: 1 }, { unique: true })
    const server = new http.Server(
      micro.serve(async (req, res) => {
        if (req.method === 'POST' && req.url === '/auth/login') {
          return await login(micro, req, res, users)
        }
        if (req.method === 'POST' && req.url === '/auth/password') {
          return await password(micro, req, res, users)
        }
        if (req.method === 'POST' && req.url === '/auth/profile') {
          return await profile(micro, req, res)
        }
        if (req.method === 'POST' && req.url === '/auth/signin') {
          return await signin(micro, req, res, users)
        }
        micro.send(res, 404, 'Error 404 - Resource not found')
      })
    )
    server.listen(process.env.HTTP_PORT)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
