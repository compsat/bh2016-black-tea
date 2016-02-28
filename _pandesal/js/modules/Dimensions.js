'use strict';

var Platform = require('react-native').Platform;
var origDimensions = require('react-native').Dimensions.get('window');

var Dimensions = {
  owidth: origDimensions.width,
  oheight: origDimensions.height,
  width: origDimensions.width,
  height: origDimensions.height - (Platform.OS == 'ios' ? 20 : 0),
};

module.exports = Dimensions;