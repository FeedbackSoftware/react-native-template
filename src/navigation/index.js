import React       from 'react'
import { connect } from 'react-redux'
import {
  createStackNavigator,
}                  from 'react-navigation'
import {
  combineReducers,
}                  from 'redux'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
}                  from 'react-navigation-redux-helpers'

const AppNavigator = createStackNavigator(AppRouteConfigs)

const navReducer = createNavigationReducer(AppNavigator)

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)

const App = reduxifyNavigator(AppNavigator, 'root')

const mapStateToProps = ({nav}) => ({
  state: nav,
})

export default connect(mapStateToProps)(App)
