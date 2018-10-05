import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore }                           from 'redux-persist';
import logger                                                     from 'redux-logger';
import storage                                                    from 'redux-persist/lib/storage';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
}                  from 'react-navigation-redux-helpers';

import * as reducers                                              from './ducks';
import { api, messages, nav }      from './middlewares';
import { AppNavigator }                                           from '../navigation'

const configureStore = (initialState = {}) => {

  const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
  )

  // Los middleware 'api' y 'messages' deben ir de últimos
  const middlewares = [
    ...(__DEV__ ? [logger] : []),
    ...nav,
    ...api,
    ...messages,
    reactNavigationMiddleware,
  ];

  const rootReducer = combineReducers({
    ...reducers
  });

  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav', 'messages', 'passwordUrl'],
  };

  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

export default configureStore;
