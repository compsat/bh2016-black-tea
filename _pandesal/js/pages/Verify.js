'use strict';

var React = require('react-native');

var {
  Platform,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} = React;

var {
  width,
  height,
} = require('Dimensions').get('window');

var Colors = require('../modules/Colors.js');

var navActions = require('../actions/navActions.js');
var appActions = require('../actions/appActions.js');

var List = require('../components/List.js');

var Verify = React.createClass({
  getInitialState() {
    return {
      keyboard: 0
    };
  },
  render() {
    var styles = this._getStyles();
    return (
      <View>
        <ScrollView
          ref={r => this._scrollViewRef = r}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          onKeyboardWillShow={this._onKeyboardShow}
          onKeyboardWillHide={this._onKeyboardHide}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View style={styles.titleView}>
            <Text style={[styles.title, {fontSize: 50}]}>
              Confirmation Code
            </Text>
          </View>
          <View style={styles.inputSection}>
            <List
              ref='list'
              style={{
                width: width,
              }}
              data={[{
                type: 'editable-icon',
                iconName: 'lock',
                iconColor: Colors.text.black.secondary,
                placeholder: 'Code',
                onChangeText: v => {
                  this.code = v;
                }
              }]}
            />
          </View>
          <View style={[styles.inputView, {justifyContent: 'space-between'}]}>
            <TouchableHighlight 
              style={styles.buttonView}
              underlayColor='rgba(0,0,0,0.27)'
              onPress={this._onPressLogin}
            >
              <Text style={styles.button}>
                BACK
              </Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.buttonView}
              underlayColor='rgba(0,0,0,0.27)'
              onPress={this._onPressVerify}
            >
              <Text style={styles.button}>
                RESEND
              </Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.buttonView}
              underlayColor='rgba(0,0,0,0.27)'
              onPress={this._onPressDone}
            >
              <Text style={styles.button}>
                DONE
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
        </View>
    );
  },
  code: '',
  _scrollViewRef: null,
  _onKeyboardShow(e) {
    this.setState({
      keyboard: e.endCoordinates.height
    }, () => {
      if(this._scrollViewRef) this._scrollViewRef.scrollTo(e.endCoordinates.height);
    })
  },
  _onKeyboardHide() {
    this.setState({
      keyboard: 0
    }, () => {
      if(this._scrollViewRef) this._scrollViewRef.scrollTo(0);
    })
  },
  _onPressLogin() {
    navActions.pop();
  },
  _onPressVerify() {

  },
  _onPressDone() {

    appActions.submitVerificationCode({verificationKey: this.code});
  },
  _onChangeCode(data) {
    this.code = data;
  },
  _getStyles() {
    return StyleSheet.create({
      status: {
        width: width,
        height: 20,
        backgroundColor: Colors.theme.black.dp3,
      },
      container: {
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        position: 'absolute',
        backgroundColor: Colors.theme.black.dp2,
        top: 0,
        left: 0,
        width: width,
        height: height - (Platform.OS == 'android' ? 20 : 0) - (this.state.keyboard ? this.state.keyboard : 0),
      },
      contentContainer: {
        width: width,
        height: height - 20,
        paddingHorizontal: 16,
        paddingVertical: 16,
      },
      titleView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginVertical: 8,
      },
      title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 56,
        color: 'rgba(0,0,0,0.87)',
      },
      inputSection: {
        flex: 1
      },
      inputView: {
        flexDirection: 'row',
      },
      input: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        width: width - 32 - 56,
        height: 56,
      },
      buttonView: {
        width: 80, 
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: 'rgba(0,0,0,0.87)',
      }
    });
  },
});

module.exports = Verify;