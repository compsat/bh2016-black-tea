'use strict';

var React = require('react-native');

var {
  Platform,
  StatusBarIOS,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

var {
  width,
  height
} = require('../modules/Dimensions.js');

var AppStore = require('../stores/AppStore.js');
var NoteStore = require('../stores/NoteStore.js');

var APIActions = require('../actions/APIActions.js');

var Icon = require('react-native-vector-icons/MaterialIcons');
var Bar = require('../components/Bar.js');
var FloatingActionButton = require('../components/FloatingActionButton.js');
var Dialog = require('../components/Dialog.js');

var Colors = require('../constants/colors.js');

var LoginDialog = React.createClass({
  componentWillMount() {},
  componentDidMount() {
  },
  componentWillUnmount() {},
  render() {
    return (
      <Dialog
        style={{
          overflow: 'hidden',
          borderRadius: 4,
        }}
      >
        <TextInput
          style={{
            padding: 8,
            height: 56,
            fontSize: 16,
            fontFamily: 'PlayfairDisplay-Regular',
          }}
          placeholder={'Username'}
          underlineColorAndroid='transparent'
          autoCorrect='false'
          autoCapitalize='none'
          onChangeText={(v) => {
            this._data.username = v;
          }}
        />
        <TextInput
          style={{
            padding: 8,
            height: 56,
            fontSize: 16,
            fontFamily: 'PlayfairDisplay-Regular',
          }}
          placeholder={'Password'}
          underlineColorAndroid='transparent'
          autoCorrect='false'
          secureTextEntry={true}
          autoCapitalize='none'
          onChangeText={(v) => {
            this._data.password = v;
          }}
        />
        <View 
          style={{
            height: 56,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.THEME_BLACK_1,
            }}
            underlayColor={Colors.THEME_BLACK_2}
            onPress={this.onPressSubmit}
          >
            <Text 
              style={{
                fontFamily: 'PlayfairDisplay-Bold',
                fontSize: 16,
                margin: 8,
                color: 'white'
              }}
            >
              LOGIN
            </Text>
          </TouchableHighlight>
        </View>
        <View 
          style={{
            height: 56,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.THEME_BLACK_1,
            }}
            underlayColor={Colors.THEME_BLACK_2}
            // onPress={}
          >
            <Text 
              style={{
                fontFamily: 'PlayfairDisplay-Bold',
                fontSize: 16,
                margin: 8,
                color: 'white'
              }}
            >
              REGISTER
            </Text>
          </TouchableHighlight>
        </View>
      </Dialog>
    );
  },
  onPressSubmit() {
    console.log('wew');
    APIActions.login(this._data);
  },
  _data: {},
});

module.exports = LoginDialog;