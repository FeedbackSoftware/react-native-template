import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import * as reducers from './ducks';
import { api, auth, messages, newsfeed, notifications, nav } from './middlewares';

const configureStore = (initialState = {}) => {
  const middlewares = [thunk];

  if (__DEV__) {
    middlewares.push(logger);
  }

  // Los middleware 'api' y 'messages' deben ir de últimos
  middlewares.push(
    ...[
      ...nav,
      ...auth,
      ...newsfeed,
      ...notifications,
      ...api,
      ...messages
    ],
  );

  const rootReducer = combineReducers({
    ...reducers,
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
