require('dotenv').config()
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const util = require('util')
const { generatePassword } = require('../lib/password')

const APS = 'qihe'
const DATABASE = APS
const FILE = `./${APS}.js`
const SIZE = 6

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const insertMany = util.promisify((db, collection, data, callback) => {
  db.collection(collection).insertMany(data, function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})

const start = async () => {
  try {
    const a = []
    for (let i = 0; i < 100; i++) {
      const password = await generatePassword(SIZE)
      a.push({ key: password, valid: true })
      fs.appendFileSync(FILE, `{key: ${password}\r\n}`)
    }
    console.log(a)

    await client.connect()
    const db = client.db(DATABASE)
    await insertMany(db, 'keys', a)
    await client.close()
    process.exit(1)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

start()
