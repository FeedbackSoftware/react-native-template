import { createAction } from 'redux-actions'
import types            from './types'

export const startFetch = createAction(types.START_FETCH)
export const endFetch = createAction(types.END_FETCH)
export const clear = createAction(types.CLEAR)
export const logout = createAction(types.LOGOUT)
export const signIn = createAction(types.SIGN_IN)

export const showMessage = createAction(types.MESSAGE,
  ({ message }) => ({ message }),
  ({ config }) => ({ config }))

export default {
  showMessage,
  startFetch,
  endFetch,
  signIn,
  clear,
  logout,
}
