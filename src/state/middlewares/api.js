import axios                      from 'axios'
import { authActions, authTypes } from '../ducks/auth'

const api = ({dispatch, getState}) => (next) => (action) => {
  const types = [
    authTypes.API_CALL,
  ]

  if (!types.includes(action.type)) {
    return next(action)
  }

  const {auth: {user}, connection} = getState()
  const {config: preConfig, authorization = false, onStart, onEnd, onComplete, onError} = action.payload

  if (connection.actual === 'none' || connection.actual === 'unknown') {
    return
  }

  const config = authorization ? {
    ...preConfig,
    headers: {
      ...preConfig.headers,
      Authorization: `Bearer ${user.access_token}`,
    },
  } : preConfig

  onStart && dispatch(onStart())
  axios(config).then((response) => {
    __DEV__ && console.log(response, config)
    const {status} = response
    if (status === 'blocked' || status === 401) {
      dispatch(authActions.logout())
    }
    onComplete && onComplete(dispatch, response)
    onEnd && dispatch(onEnd(response))
  }).catch((error) => {
    __DEV__ && console.error(error, config)
    const {response} = error
    if (response) {
      const {status} = response
      if (status === 'blocked' || status === 401) {
        dispatch(authActions.logout())
      }
    }
    onError && onError(error)
    onEnd && dispatch(onEnd(error))
  })
}

export default [api]
