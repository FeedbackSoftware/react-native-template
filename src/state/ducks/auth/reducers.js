import types from './types'

const auth = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR: {
      return {
        ...state,
        // Aqui va el estado por defectoa
      }
    }
    case types.START_FETCH: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.END_FETCH: {
      const { error } = action
      return {
        ...state,
        loading: false,
        error: error || null,
      }
    }
    default:
      return state
  }
}

export default auth
