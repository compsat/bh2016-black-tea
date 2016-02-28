'use strict';

var React = require('react-native');

var {
  TouchableHighlight,
  StyleSheet,
} = React;

var Icon = require('react-native-vector-icons/MaterialIcons');

var TouchableIcon = React.createClass({
  render() {
    return (
    <TouchableHighlight
      style={[styles.container, this.props.style]}
      onPress={this.props.onPress}
      onLongPress={this.props.onLongPress}
      underlayColor={this.props.underlayColor || 'rgba(0,0,0,0.12)'}
    >
      <Icon
        style={this.props.iconStyle}
        name={this.props.iconName}
        size={this.props.iconSize || 24}
        color={this.props.iconColor}
      />
    </TouchableHighlight>
    );
  },
  setNativeProps(props) {
    this.setState(props);
  },
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 56, 
    height: 56,
  }
});

module.exports = TouchableIcon;