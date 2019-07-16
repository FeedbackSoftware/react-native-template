import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import {
  persistReducer, persistStore,
} from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import {
  createReactNavigationReduxMiddleware, createNavigationReducer,

} from 'react-navigation-redux-helpers';

import * as reducers from './ducks';
// import { api, messages, nav } from './middlewares';
import AppNavigator from '../navigation';
import configurei18n from '../i18n';

const configureStore = (initialState = {}) => {
  const navReducer = createNavigationReducer(AppNavigator);

  const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav, 'root',
  );

  // Los middleware 'api' y 'messages' deben ir de últimos
  const middlewares = [
    ...(__DEV__ ? [logger] : []), // ...nav,
    // ...api,
    // ...messages,
    reactNavigationMiddleware,
  ];

  const rootReducer = combineReducers({
    nav: navReducer, ...reducers,
  });

  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav', 'messages', 'passwordUrl'],
  };

  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

  const store = createStore(persistedReducer, initialState,
    compose(applyMiddleware(...middlewares)));

  const persistor = persistStore(store);
  configurei18n(store);
  return {
    store,
    persistor,
  };
};

export default configureStore;
