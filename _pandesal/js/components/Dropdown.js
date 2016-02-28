'use strict';

var React = require('react-native');

var {
  TouchableHighlight,
  View,
  ScrollView,
  Text,
} = React;

var AppStore = require('../stores/AppStore.js');

var Dropdown = React.createClass({
  getInitialState() {
    return {
      selected: null,
      top: false,
      left: true,
      width: 0,
    };
  },
  render() {
    return (
      <TouchableHighlight
        ref='button'
        activeOpacity={1}
        underlayColor={this.props.underlayColor}
        onPress={this._onPress}
      >
        <View>  
          {this.props.children}
        </View>
      </TouchableHighlight>
    );
  },
  _onPress() {
    this.refs['button'].measure((ox, oy, w, h, px, py) => {
      AppStore.getNavigator().alert({
        x: px + 16,
        y: py + 16,
        width: this.props.width || 112,
        mode: 'dropdown', 
        items: this.props.items,
      }, this.props.onSelect);
    });
  },
  _setLayout(e) {
    // this.refs['button'].measure(((ox, oy, nw, nh, px, py)) => {
    //   console.log();
    // })
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }
});

module.exports = Dropdown;