import React                 from 'react'
import { Provider, connect } from 'react-redux'
import SplashScreen          from 'react-native-splash-screen'
import { PersistGate }       from 'redux-persist/lib/integration/react'
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import configureStore        from './state/store'
import AppNavigator          from './navigation'

export const initialState = {}

const AppTemplate = () => {
  SplashScreen.hide()

  const {store, persistor} = configureStore(initialState)

  const mapStateToProps = ({nav}) => ({
    state: nav,
  })

  const AppNavigatorWithState = connect(mapStateToProps)(
    reduxifyNavigator(AppNavigator, 'root'))

  return (
    <Provider store={ store }>
      <PersistGate
        persistor={ persistor }
      >
        <AppNavigatorWithState />
      </PersistGate>
    </Provider>
  )
}

export default AppTemplate
