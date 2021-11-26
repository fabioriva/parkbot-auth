const pino = require('pino')()
const { sign, verify } = require('./jwt')
const { comparePassword } = require('./password')

async function login (micro, req, res, users) {
  const { username, password } = await micro.json(req)
  const user = await users.findOne({ username })
  if (!user) throw micro.createError(401, 'Unauthorized')
  const check = await comparePassword(password, user.password)
  if (!check) throw micro.createError(401, 'Unauthorized')
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
  micro.send(res, 200, { aps, locale, token })
  pino.info(user, 'Authenticated')
}

async function profile (micro, req, res) {
  if (!('authorization' in req.headers)) {
    throw micro.createError(403, 'Forbidden')
  }
  try {
    const authorization = await req.headers.authorization
    const { token } = JSON.parse(authorization)
    const user = verify(token)
    micro.send(res, 200, user)
    pino.info(user, 'Authorized')
  } catch (err) {
    pino.error(err, 'Forbidden')
    throw micro.createError(403, 'Forbidden')
  }
}

module.exports = { login, profile }
