import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';


class HorizontalProgressComp extends Component {

  render() {
      return (
        <ActivityIndicator
          color={this.props.color}
          animating={true}
          size='small'
          />
      );
  }
}

export default HorizontalProgressComp;