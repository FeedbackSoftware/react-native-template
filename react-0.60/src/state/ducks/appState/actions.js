import { createAction } from 'redux-actions'
import types            from './types'

export const changeState = createAction(types.CHANGE_STATE)

export default {
  changeState,
}
