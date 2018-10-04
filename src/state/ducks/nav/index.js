import { AppNavigator } from '../../../navigators';

const { getStateForAction } = AppNavigator.router;

const nav = (state, action) => {


  const newState = getStateForAction(action, state);
  return newState || state;
};

export default nav;
