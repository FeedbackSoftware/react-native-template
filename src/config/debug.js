// config.js

// Only load these in the development environment, you'll never need them
// outside of it.
if (__DEV__) {
  // I use getState() all the time to inspect our app's redux state. Even when
  // using Redux Devtools, it's often much faster to find what you're looking
  // for by navigating at the console with autocomplete.
  //window.getState = require('../store').getState;

  // Pretty-prints ImmutableJS data structures in the chrome console
  /*const installDevTools = require('immutable-devtools').default;
   const Immutable = require('immutable');
   installDevTools(Immutable);*/

  // Disable spammy error messages when you're developing on a device
  // and the computer's clock is out of sync.
  // https://github.com/facebook/react-native/issues/1598
  console.ignoredYellowBox = ['jsSchedulingOverhead'];

  // Keep a reference to React handy in the console to experiment with
  // component APIs.
  window.React = require('react-native');

  // We do a lot of filesystem manipulation for storing photo/video, and it's
  // great to be able to query it from the console.
  //window.FS = require('react-native-fs');
}
