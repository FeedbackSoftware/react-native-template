import React    from 'react'
import {
  createStackNavigator,
}               from 'react-navigation'
import { Home } from '../scenes'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
})

export default AppNavigator

