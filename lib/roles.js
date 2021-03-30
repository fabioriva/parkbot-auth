const ALARMS = 'alarms'
const CARDS = 'cards'
const DASHBOARD = 'dashboard'
const DEVICE = 'device'
const HISTORY = 'history'
const MAP = 'map'
const OVERVIEW = 'overview'
const RACKS = 'racks'
const STATISTICS = 'statistics'

exports.ADMIN_ROLES = [
  DASHBOARD,
  DEVICE,
  OVERVIEW,
  MAP,
  RACKS,
  CARDS,
  HISTORY,
  STATISTICS,
  ALARMS
]
exports.SERVICE_ROLES = [
  OVERVIEW,
  MAP,
  RACKS,
  CARDS,
  HISTORY,
  STATISTICS,
  ALARMS
]
exports.VALET_ROLES = [OVERVIEW, MAP, CARDS, HISTORY, STATISTICS]
// exports.USER_ROLES = [APP]
