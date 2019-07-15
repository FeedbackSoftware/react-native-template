/** @format */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import configureStore from './src/state/store'
// import SplashScreen          from "react-native-splash-screen"

const initialState = {
  connection: {
    actual: 'unknown',
    previous: 'none',
  },
};

const Template = () => {
  // SplashScreen.hide();

  const params = configureStore(initialState);

  return <App {...params} />;
};

AppRegistry.registerComponent(appName, () => Template);
