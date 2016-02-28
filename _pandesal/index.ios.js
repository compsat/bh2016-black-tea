'use strict';

var React = require('react-native');

var {
  AppRegistry,
} = React;

var pandesal = require('./js/blocks/RootController.js');

AppRegistry.registerComponent('pandesal', () => pandesal);
