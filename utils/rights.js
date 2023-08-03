const ACTIONS = 'actions' // deprecated
const DIAGNOSTIC = 'diagnostic'
const EDIT_CARD = 'edit-card'
const EDIT_STALL = 'edit-stall'
const ENTRY = 'entry'
const EXIT = 'exit'
const ROLLBACK = 'rollback'

const ADMIN_RIGHTS = [ACTIONS, DIAGNOSTIC, EDIT_CARD, EDIT_STALL, ENTRY, EXIT, ROLLBACK]
const SERVICE_RIGHTS = [EDIT_CARD, EDIT_STALL, ENTRY, EXIT]
// const VALET_RIGHTS = [EXIT]
const VALET_RIGHTS = []
const USER_RIGHTS = []

module.exports = {
  ADMIN_RIGHTS,
  SERVICE_RIGHTS,
  USER_RIGHTS,
  VALET_RIGHTS
}
