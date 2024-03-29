const ALARMS = 'alarms'
const CARDS = 'cards'
const DASHBOARD = 'dashboard'
const DEVICE = 'device'
const DSS = 'dss'
const HISTORY = 'history'
const MAP = 'map'
const NOTIFICATIONS = 'notifications'
const OVERVIEW = 'overview'
const RACKS = 'racks'
const STATISTICS = 'statistics'

const ADMIN_ROLES = [
  DASHBOARD,
  DEVICE,
  DSS,
  OVERVIEW,
  MAP,
  NOTIFICATIONS,
  RACKS,
  CARDS,
  HISTORY,
  STATISTICS,
  ALARMS
]
const SERVICE_ROLES = [
  DASHBOARD,
  OVERVIEW,
  MAP,
  RACKS,
  CARDS,
  HISTORY,
  STATISTICS,
  ALARMS
]
const VALET_ROLES = [
  DASHBOARD,
  OVERVIEW,
  MAP,
  // CARDS,
  HISTORY,
  STATISTICS
]

const DSS_ROLES = [DSS]
const USER_ROLES = []

module.exports = {
  ADMIN_ROLES,
  DSS_ROLES,
  SERVICE_ROLES,
  USER_ROLES,
  VALET_ROLES
}
