import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NetInfo, Text, View } from 'react-native'
import { connectionActions } from '../state/ducks/connection'

const withConnectionAlert = (WrappedComponent) => {
  class ConnectionAlert extends PureComponent {
    constructor(props) {
      super(props)

      this.handleConnectivityChange = this.handleConnectivityChange.bind(this)
    }

    componentDidMount() {
      const { connection, changeConnectionState } = this.props
      NetInfo.addEventListener(
        'connectionChange',
        this.handleConnectivityChange,
      )
      NetInfo.getConnectionInfo()
        .then((connectionInfo) => {
          this.props
          && connectionInfo !== connection.actual
          && changeConnectionState(connectionInfo)
        })
    }

    componentWillUnmount() {
      NetInfo.removeEventListener(
        'connectionChange',
        this.handleConnectivityChange,
      )
    }

    handleConnectivityChange(connectionInfo) {
      const { connection, changeConnectionState } = this.props
      this.props
      && connectionInfo !== connection.actual
      && changeConnectionState(connectionInfo)
    }

    render() {
      const { connection, navigation } = this.props

      return (
        <View style={{ flex: 1 }}>
          {
            navigation
              ? (
                <WrappedComponent
                  navigation={navigation}
                />
              )
              : <WrappedComponent/>
          }
          {
            (connection.actual === 'none' || connection.actual
              === 'unknown')
            && (
              <View style={{
                backgroundColor: '#FF000050',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
                <Text style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
                >
                  You dont have connection
                </Text>
              </View>
            )
          }
        </View>
      )
    }
  }

  ConnectionAlert.router = WrappedComponent.router
  ConnectionAlert.displayName = `withConnectionAlert(${WrappedComponent.displayName
  || WrappedComponent.name})`

  const mapStateToProps = ({ connection }) => ({
    connection,
  })

  return connect(mapStateToProps, connectionActions)(ConnectionAlert)
}

withConnectionAlert.propTypes = {
  connection: PropTypes.shape({
    actual: PropTypes.string,
    previous: PropTypes.string,
  }),
}

export default withConnectionAlert
