'use strict';

var React = require('react-native');

var {
  StatusBarIOS,
  Platform,
  View,
} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var StatusBar = React.createClass({
  getInitialState() {
    return {
      color: '#FFFFFF',
    };
  },
  render() {
    return (
      Platform.OS == 'ios' 
        ? <View 
            ref='status'
            style={[{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 20,
              width: width,
              backgroundColor: this.state.color,
            }, this.props.style]}
          /> 
        : false
    );
  },
  getHeight() {
    return Platform.OS == 'ios' ? 20 : 0;
  },
  setColor(color) {
    var red = parseInt(color.substr(1, 2), 16)/255;
    var green = parseInt(color.substr(1, 2), 16)/255;
    var blue = parseInt(color.substr(1, 2), 16)/255;

    var luminance = (red <= 0.03928 ? red/12.92 : Math.pow((red+0.055)/1.055, 2.4)) * 0.2126
      + (green <= 0.03928 ? green/12.92 : Math.pow((green+0.055)/1.055, 2.4)) * 0.2126
      + (blue <= 0.03928 ? blue/12.92 : Math.pow((blue+0.055)/1.055, 2.4)) * 0.0722;
    Platform.OS == 'ios' 
      // && parseInt(this.state.color.substr(1), 16) > 0xffffff/2
      && luminance > 0.179
      ? StatusBarIOS.setStyle('default')
      : StatusBarIOS.setStyle('light-content');
    this.refs.status.setNativeProps({
      style: {
        backgroundColor: color,
      },
    });
  },
});

module.exports = StatusBar;