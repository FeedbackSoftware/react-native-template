import { NavigationActions } from 'react-navigation'

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // Dive into nested navigators
  // Este condicional es muy necesario
  // No quitar
  if (route.routes) {
    return getCurrentRouteName(route)
  }

  return route.routeName
}

const getNavigator = (navigationState, screen) => {
  if (!navigationState) {
    return null
  }

  const route = navigationState.routes[navigationState.index]

  if (route.routes) {
    if (route.routeName === screen) {
      return route
    }

    return getNavigator(route, screen)
  }

  return null
}

const screenTracking = ({ dispatch, getState }) => next => (action) => {
  const types = [
    NavigationActions.BACK,
    NavigationActions.NAVIGATE,
    NavigationActions.RESET,
  ]

  if (!types.includes(action.type)) {
    return next(action)
  }

  const currentState = getState().nav
  const currentScreen = getCurrentRouteName(currentState)
  const result = next(action)
  const nextState = getState().nav
  const nextScreen = getCurrentRouteName(nextState)

  if (nextScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    // tracker.trackScreenView(nextScreen);
    return result
  }
}

const stopNavigation = ({ dispatch, getState }) => next => (action) => {
  const types = [
    NavigationActions.BACK,
    NavigationActions.NAVIGATE,
    NavigationActions.RESET,
  ]

  if (!types.includes(action.type)) {
    return next(action)
  }

  const currentState = getState().nav
  const currentScreen = getCurrentRouteName(currentState)
  const nextScreen = action.routeName
  const nextNavigator = getNavigator(currentState, nextScreen)

  if (currentScreen !== nextScreen) {
    if (nextNavigator) {
      if (!nextNavigator.routes.map(route => route.routeName)
        .includes(currentScreen)) {
        return next(action)
      }
    } else {
      return next(action)
    }
  }
}

export default [stopNavigation]

// ESTE ARCHIVO ES ORO
