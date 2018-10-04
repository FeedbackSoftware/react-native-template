import types from './types';

const connection = (state = {}, action) => {
  const { actual } = state;

  switch (action.type) {
    case types.CHANGE_CONNECTION_STATE: {
      return {
        ...state,
        previous: actual.toLowerCase(),
        actual: action.payload.toLowerCase()
      };
    }
    default:
      return state;
  }
};

export default connection;
