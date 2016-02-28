'use strict';

var React = require('react-native');

var {
  Animated,
  Platform,
  StatusBarIOS,
  View,
  ScrollView,
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
var TouchableIcon = require('../components/TouchableIcon.js');
var List = require('../components/List.js');
var KeyboardPage = require('../components/KeyboardPage.js');

var Colors = require('../constants/colors.js');

var Note = React.createClass({
  getInitialState() {
    return {
      opacity: new Animated.Value(0),
    };
  },
  componentWillMount() {
    Animated.timing(
      this.state.opacity,
      {toValue: 1, duration: 250},
    ).start();
  },
  componentDidMount() {},
  componentWillUnmount() {},
  render() {
    return (
      <Animated.View
        style={[{
          width: this.props.pageWidth,
          height: this.props.pageHeight,
        }, {
          opacity: this.state.opacity,
          backgroundColor: this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#FAFAFA']
          }),
        }]}
      >
        <Animated.View
          style={{
            height: 56,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableIcon
            iconName='arrow-back'
            onPress={this._onBack}
            iconColor={Colors.TEXT_BLACK_BASE}
            underlayColor={Colors.TRANSLUCENT_BLACK_3}
            style={{
              margin: 4,
              width: 48,
              height: 48,
              borderRadius: 24,
            }}
          />
          <Text
            style={{
              flex: 1,
              marginTop: 18,
              fontFamily: 'PlayfairDisplay-Bold',
              fontSize: 16,
              color: Colors.TEXT_BLACK_BASE,
            }}
          >
            {NoteStore.getNoteFromIndex(NoteStore.viewedNoteIndex).title}
          </Text>
        </Animated.View>
        <ScrollView
          style={{
            position: 'absolute',
            top: 56,
            left: 0,
            width: this.props.pageWidth,
            height: this.props.pageHeight - 56,
          }}
        >
          <Text
            style={{
              flex: 1,
              marginHorizontal: 16,
              fontFamily: 'PlayfairDisplay-Regular',
              fontSize: 16,
              lineHeight: 24,
              color: Colors.TEXT_BLACK_BASE,
            }}
          >
            {NoteStore.getNoteFromIndex(NoteStore.viewedNoteIndex).content}
          </Text>
        </ScrollView>
      </Animated.View>
    );
  },
  _onBack() {
    this.props.navigator.pop();
  },
});

module.exports = Note;