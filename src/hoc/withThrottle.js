import React, { PureComponent } from 'react'
import { throttle }             from 'lodash'

const withThrottle = (WrappedComponent) => {
  class PreventDoubleClick extends PureComponent {
    componentDidMount() {
      this.onPress = throttle(this.onPress.bind(this), 700,
          {
            leading: true,
            trailing: false,
          })
    }

    componentWillUnmount() {
      this.onPress.cancel()
    }

    onPress() {
      this.props.onPress && this.props.onPress()
    }

    render() {
      return <WrappedComponent { ...this.props } onPress={ this.onPress } />
    }
  }

  PreventDoubleClick.displayName = `withThrottle(${WrappedComponent.displayName
                                                   || WrappedComponent.name})`
  return PreventDoubleClick
}

export default withThrottle
