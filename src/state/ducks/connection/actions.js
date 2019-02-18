import { createAction } from 'redux-actions'
import types            from './types'

export const changeConnectionState = createAction(
    types.CHANGE_CONNECTION_STATE,
)

export default {
  changeConnectionState,
}
