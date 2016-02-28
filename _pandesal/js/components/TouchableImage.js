'use strict';

var React = require('react-native');

var {
  TouchableHighlight,
  Image,
  StyleSheet,
} = React;

var TouchableImage = React.createClass({
  render() {
    return (
    <TouchableHighlight
      style={[styles.container, this.props.style]}
      onPress={this.props.onPress}
      onLongPress={this.props.onLongPress}
      underlayColor={this.props.underlayColor || 'rgba(0,0,0,0.12)'}
    >
      <Image
        style={[{
          width: this.props.iconSize || 24,
          height: this.props.iconSize || 24,
          tintColor: this.props.color,
        }, this.props.iconStyle]}
        resizeMode='contain'
        source={this.props.data}
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

module.exports = TouchableImage;