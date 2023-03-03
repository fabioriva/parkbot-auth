const pino = require('pino')()
const { sign, verify } = require('./jwt')
const { comparePassword, hashPassword } = require('./password')

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

async function password (micro, req, res, users) {
  if (!('authorization' in req.headers)) {
    throw micro.createError(403, 'Forbidden')
  }
  try {
    const { username, current, password } = await micro.json(req)
    // const { username, current, password, confirm } = await micro.json(req)
    // console.log('/auth/password/1', username, current, password, confirm)

    const user = await users.findOne({ username })
    // console.log('/auth/password/2', user)
    if (!user) throw micro.createError(401, 'Unauthorized')

    const check = await comparePassword(current, user.password)
    // console.log('/auth/password/3', current, user.password, check)
    if (!check) throw micro.createError(401, 'Unauthorized')

    user.password = await hashPassword(password)
    // console.log('/auth/password/4', user.password)
    const result = await users.updateOne(
      { username: user.username },
      { $set: { password: user.password } }
    )
    micro.send(res, 200, { result })
    pino.info(user, 'Authorized')
  } catch (err) {
    pino.error(err, 'Forbidden')
    throw micro.createError(403, 'Forbidden')
  }
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

async function signin (micro, req, res, users) {
  const { username, password } = await micro.json(req)
  const user = await users.findOne({ username })
  if (!user) throw micro.createError(401, 'Unauthorized')
  const check = await comparePassword(password, user.password)
  if (!check) throw micro.createError(401, 'Unauthorized')
  const payload = {
    aps: user.aps,
    locale: user.locale,
    rights: user.rights,
    roles: user.roles,
    tz: user.timezone,
    username: user.username
  }
  // const token = sign(payload)
  // const { aps, locale } = payload
  // micro.send(res, 200, { aps, locale, token })
  micro.send(res, 200, payload)
  pino.info(user, 'Authenticated')
}

async function userAdd (micro, req, res, users) {
  const user = await micro.json(req)
  user.password = await hashPassword(user.password)
  const result = await users.insertOne(user)
  micro.send(res, 200, { result })
}

module.exports = { login, password, profile, signin, userAdd }
