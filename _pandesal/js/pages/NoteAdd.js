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

var Colors = require('../constants/colors.js');

var NoteAdd = React.createClass({
  componentWillMount() {},
  componentDidMount() {
    this._data = {};
  },
  componentWillUnmount() {},
  render() {
    return (
      <View
        style={{
          height: height,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: width - 32,
            height: 320,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <TextInput
            style={{
              paddingHorizontal: 8,
              flex: 1,
              backgroundColor: Colors.TRANSLUCENT_BLACK_3,
            }}
            autoCorrect={false}
            placeholder='Title'
            onChangeText={v => {
              this._data.title = v;
            }}
          />
          <TextInput
            style={{
              paddingHorizontal: 8,
              flex: 1,
              backgroundColor: Colors.TRANSLUCENT_BLACK_3,
            }}
            autoCorrect={false}
            placeholder='Class'
            onChangeText={v => {
              this._data.class = v;
            }}
          />
          <TextInput
            style={{
              paddingHorizontal: 8,
              flex: 1,
              backgroundColor: Colors.TRANSLUCENT_BLACK_3,
            }}
            autoCorrect={false}
            placeholder='Professor'
            onChangeText={v => {
              this._data.prof = v;
            }}
          />
          <TextInput
            style={{
              paddingHorizontal: 8,
              flex: 1,
              backgroundColor: Colors.TRANSLUCENT_BLACK_3,
            }}
            autoCorrect={false}
            placeholder='Author'
            onChangeText={v => {
              this._data.author = v;
            }}
          />
          <TextInput
            style={{
              paddingHorizontal: 8,
              flex: 1,
              backgroundColor: Colors.TRANSLUCENT_BLACK_3,
            }}
            autoCorrect={false}
            placeholder='Content'
            onChangeText={v => {
              this._data.content = v;
            }}
          />
          <TouchableHighlight
            style={{
              height: 50,
              justifyContent: 'center',
              backgroundColor: Colors.PALETTE_ACCENT_A400,
            }}
            underlayColor={Colors.PALETTE_ACCENT_A200}
            onPress={this.onPressSubmit}
          >
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 16,
                fontSpacing: 8,
                textAlign: 'center',
                color: 'white',
              }}
            >
              {'ADD'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  onPressSubmit() {
    console.log(this._data);
    APIActions.addNote(this._data);
  },
  _data: {},
});

module.exports = NoteAdd;