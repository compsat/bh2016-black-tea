'use strict';

var React = require('react-native');

var {
  Platform,
  View,
  StyleSheet,
} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var TouchableIcon = require('../components/TouchableIcon.js');

var Bar = React.createClass({
  render() {
    var styles = this._getStyles();
    return (
      <View ref='bar' style={[styles.container, this.props.style]}>
        {this.props.icons && this.props.icons.length > 0 &&
          <TouchableIcon
            ref='icon'
            key='0'
            iconName={this.props.icons[0].iconName}
            onPress={this.props.icons[0].onPress}
            iconColor={this.props.iconColor}
            underlayColor={this.props.underlayColor}
            style={this.props.iconStyle}
          />
        }
        {this.props.children && <View ref='title' style={styles.titleView}>
          {this.props.children}
        </View>}
        {this.props.icons && this.props.icons.length > 1 && this.props.icons.slice(1).map((v, i) => {
          return (
            <TouchableIcon
              ref={'icon' + i}
              key={i}
              iconName={v.iconName}
              onPress={v.onPress}
              iconColor={this.props.iconColor}
              underlayColor={this.props.underlayColor}
              style={this.props.iconStyle}
            />
          );
        })}
      </View>
    );
  },
  setNativeProps(props) {
    // if (typeof props != 'object') return;
    var keys = Object.keys(props);
    for (var i = 0; i < keys.length; i++) {
      switch (keys[i]) {
        case 'style':
          this.refs.bar.setNativeProps({style: props['style']});
          break;
        case 'iconStyle':
          var refkeys = Object.keys(this.refs);
          for (var j = 0; j < refkeys.length; j++) {
            if (refkeys[j].indexOf('icon') != -1) {
              this.refs[refkeys[j]].setNativeProps({style: props['iconStyle']});
            }
          }
          break;
        default:
          break;
      }
    }
  },
  _getStyles() {
    return StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 56,
        width: width,
        backgroundColor: this.props.color || '#181A27',
        flexDirection: 'row',
      },
      titleView: {
        flex: 1,
        overflow: 'hidden',
      },
      placholder: {
        width: 56, 
        height: 56,
      },
    })
  }
});

module.exports = Bar;