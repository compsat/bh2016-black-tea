'use strict';

var React = require('react-native');

var Mapbox = require('react-native-mapbox-gl');

var {
  MAPBOX_KEY,
} = require('../constants/app.js');

var Map = React.createClass({
  mixins: [Mapbox.Mixin],
  render() {
    return (
      <Mapbox
        ref='map'
        accessToken={MAPBOX_KEY}
        centerCoordinate={{latitude: 13, longitude: 122}}
        styleURL={this.mapStyles.emerald}
        {...this.props}
      />
    );
  }
});

module.exports = Map;