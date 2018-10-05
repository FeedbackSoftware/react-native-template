import React, { PureComponent }   from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {};

class Home extends PureComponent<Props> {
  render () {
    return (
      <View style={ styles.container }>
        <Text style={ styles.welcome }>Welcome to React Native!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

export default Home
