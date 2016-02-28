'use strict';

var React = require('react-native');
var {
  ScrollView,
} = React;

var KeyboardPage = React.createClass({
  getInitialState() {
    return {
      keyboard: 0,
    };
  },
  render() {
    return (
      <ScrollView
        ref='container'
        onKeyboardWillShow={this._onKeyboardShow}
        onKeyboardDidShow={this._onKeyboardShow}
        onKeyboardWillHide={this._onKeyboardHide}
        onKeyboardDidHide={this._onKeyboardHide}
        keyboardShouldPersistTaps={true}
        {...this.props}
      />
    );
  },
  setNativeProps(props) {
    this.refs.container.setNativeProps(props);
  },
  scrollTo(y) {
    this.refs.container.scrollTo(y);
  },
  _onKeyboardShow(e) {
    this.refs.container.setNativeProps({
      style: {
        height: this.props.pageHeight - e.endCoordinates.height,
      }
    });
    this.props.onKeyboardShow && this.props.onKeyboardShow(e);
  },
  _onKeyboardHide(e) {
    this.refs.container.scrollTo(0);
    this.refs.container.setNativeProps({
      style: {
        height: this.props.pageHeight,
      }
    });
    this.props.onKeyboardHide && this.props.onKeyboardHide(e);
  },
});

module.exports = KeyboardPage;