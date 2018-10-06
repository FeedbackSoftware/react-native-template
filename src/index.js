import React                 from 'react'
import { Provider, connect } from 'react-redux'
import { PersistGate }       from 'redux-persist/lib/integration/react'
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import AppNavigator          from './navigation'

const App = ({store, persistor}) => {
  const AppNavigatorWithState = connect(
    // Map state to props
    ({ nav: state }) => ({
      state
    })
  )(reduxifyNavigator(AppNavigator, 'root'))

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

export default App
