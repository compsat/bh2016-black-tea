'use strict';

var React = require('react-native');

var {View} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var TouchableIcon = require('./TouchableIcon.js');

var BTFloatingActionButton = React.createClass({
  render() {
    return (
      <View
        style={[{
          position: 'absolute',
          top: height - 24 - 56,
          left: width - 16 - 56,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: this.props.color,
        }, this.props.style]}
      >
        <TouchableIcon
          iconName={this.props.iconName}
          iconColor={this.props.iconColor}
          underlayColor={this.props.underlayColor}
          onPress={this.props.onPress}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
          }}
        />
      </View>
    );
  },
});

module.exports = BTFloatingActionButton;