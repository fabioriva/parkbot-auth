const http = require('http')
const User = require('./User')
const rights = require('./rights')
const roles = require('./roles')

const user = new User(
  'washingtonblvd',
  'en',
  rights.SERVICE_RIGHTS,
  roles.SERVICE_ROLES,
  '0987poiu.',
  'America/Los_Angeles',
  'service@washingtonblvd'
)
const data = JSON.stringify(user)
console.log(data, data.length)

const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/user/add',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
