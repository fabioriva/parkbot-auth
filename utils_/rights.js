const ACTIONS = 'actions' // deprecated
const DIAGNOSTIC = 'diagnostic'
const EDIT_CARD = 'edit-card';
const EDIT_STALL = 'edit-stall'
const ENTRY = 'entry'
const EXIT = 'exit'
const ROLLBACK = 'rollback'

const ADMIN_RIGHTS = [ACTIONS, DIAGNOSTIC, EDIT_CARD, EDIT_STALL, ENTRY, EXIT, ROLLBACK]
const SERVICE_RIGHTS = [EXIT, EDIT_CARD, EDIT_STALL]
const VALET_RIGHTS = [EXIT]
const USER_RIGHTS = []

module.exports = {
  ADMIN_RIGHTS: ADMIN_RIGHTS,
  SERVICE_RIGHTS: SERVICE_RIGHTS,
  USER_RIGHTS: USER_RIGHTS,
  VALET_RIGHTS: VALET_RIGHTS
}
