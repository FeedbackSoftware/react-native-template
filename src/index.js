import React                       from 'react'
import { Provider }                from 'react-redux'
import { ActivityIndicator, View } from 'react-native'
// import SplashScreen from 'react-native-splash-screen'

import configureStore  from './state/store'
import MainNavigator   from './navigators'
import { PersistGate } from 'redux-persist/lib/integration/react'

// Funcion donde va toda la logica de la inicializacion de redux
const initRedux = () => {
  // Estado inicial
  const initialState = {}

  // Esto sirve para limpiar el estado
  // persistor.purge();

  // Esto sirve para observar variables en el entorno de desarrollo
  // if (__DEV__) {
  //   window.store = store
  //   window.persistor = persistor
  // }

  return configureStore(initialState)
}

const AppTemplate = () => {
  // Esto en dado caso que se requiera splash screen
  // SplashScreen.hide();

  // const { store, persistor } = initRedux();

  return (
    <Provider store={ store }>
      <PersistGate
        persistor={ persistor }
      >
        <MainNavigator />
      </PersistGate>
    </Provider>
  )
}

export default AppTemplate
