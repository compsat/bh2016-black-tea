'use strict';

var React = require('react-native');

var {
  ScrollView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} = React;

var {
  owidth,
  oheight,
} = require('../modules/Dimensions.js');

var Colors = require('../modules/Colors.js');

var Dialog = React.createClass({
  render() {
    return (
      <ScrollView
        ref='container'
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onKeyboardWillShow={this._onKeyboardShow}
        onKeyboardDidShow={this._onKeyboardShow}
        onKeyboardWillHide={this._onKeyboardHide}
        onKeyboardDidHide={this._onKeyboardHide}
        bounces={false}
        keyboardShouldPersistTaps={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View
          style={styles.overlay}
          onStartShouldSetResponder={() => true}
          onResponderRelease={this.props.onPressOverlay}
        />
        <View
          ref='dialog'
          style={[styles.dialog, this.props.style]}
          onLayout={this._capHeight}
        >
          {this.props.children}
        </View>
      </ScrollView>
    );
  },
  _onKeyboardShow(e) {
    this.refs.container.scrollTo(e.endCoordinates.height/2);
    this.refs.container.setNativeProps({
      style: {
        height: oheight - e.endCoordinates.height,
      }
    });
  },
  _onKeyboardHide() {
    this.refs.container.scrollTo(0);
    this.refs.container.setNativeProps({
      style: {
        height: oheight,
      }
    });
  },
  _capHeight(e) {
    if(e.nativeEvent.layout.height > oheight*1/2) {
      this.refs.dialog.setNativeProps({style:{height: oheight*1/2}});
    };
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: owidth,
    height: oheight,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    width: owidth,
    height: oheight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: owidth,
    height: oheight,
    backgroundColor: 'rgba(0,0,0,0.54)',
  },
  dialog: {
    borderRadius: 2,
    width: owidth - 16,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
});

module.exports = Dialog;