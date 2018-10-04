import types from './types';

const appState = (state = {}, action) => {
  const { actual } = state;

  switch (action.type) {
    case types.CHANGE_STATE: {
      return {
        ...state,
        actual: action.payload.nextAppState,
        previous: actual
      };
    }
    default:
      return state;
  }
};

export default appState;
