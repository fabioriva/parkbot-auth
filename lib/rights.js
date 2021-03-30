const ACTIONS = 'actions' // overview page actions
const EDIT_CARD = 'edit-card'
const EDIT_STALL = 'edit-stall'
const DIAGNOSTIC = 'diagnostic'

const ADMIN_RIGHTS = [ACTIONS, DIAGNOSTIC, EDIT_CARD, EDIT_STALL]
const SERVICE_RIGHTS = [ACTIONS, EDIT_CARD, EDIT_STALL]
const VALET_RIGHTS = []
const USER_RIGHTS = [ACTIONS]

module.exports = {
  ADMIN_RIGHTS: ADMIN_RIGHTS,
  SERVICE_RIGHTS: SERVICE_RIGHTS,
  VALET_RIGHTS: VALET_RIGHTS,
  USER_RIGHTS: USER_RIGHTS
}
