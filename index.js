require('dotenv').config()
const micro = require('micro')
const MongoClient = require('mongodb').MongoClient
const { login, password, profile, userAdd } = require('./lib/routes')

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
      // console.log(method, url)
      if (method === 'POST' && url === '/auth/login') {
        return await login(micro, req, res, users)
      }
      if (method === 'POST' && url === '/auth/password') {
        return await password(micro, req, res, users)
      }
      if (method === 'POST' && url === '/auth/profile') {
        return await profile(micro, req, res)
      }
      if (method === 'POST' && url === '/user/add') {
        return await userAdd(micro, req, res, users)
      }
      micro.send(res, 200, '<h1>Parkbot authorization provider</h1>')
    }).listen(process.env.HTTP_PORT)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
