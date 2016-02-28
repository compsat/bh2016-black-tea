'use strict';

var React = require('react-native');

var {
  Animated,
  Platform,
  StatusBarIOS,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollResponder,
  StyleSheet,
} = React;

var AppStore = require('../stores/AppStore.js');
var NoteStore = require('../stores/NoteStore.js');

var Icon = require('react-native-vector-icons/MaterialIcons');
var Bar = require('../components/Bar.js');
var FloatingActionButton = require('../components/FloatingActionButton.js');
var TouchableIcon = require('../components/TouchableIcon.js');
var List = require('../components/List.js');
var KeyboardPage = require('../components/KeyboardPage.js');
var DataList = require('../components/DataList.js');

var Colors = require('../constants/colors.js');

var NoteStore = require('../stores/NoteStore.js');

var APIActions = require('../actions/APIActions.js');

Animated.Text = Animated.createAnimatedComponent(Text);
Animated.TextInput = Animated.createAnimatedComponent(TextInput);

var Home = React.createClass({
  getInitialState() {
    return {
      notes: false,
      search: false,
      add: false,
      notesAnim: new Animated.Value(0),
      searchAnim: new Animated.Value(0),
      addAnim: new Animated.Value(0),
      keyboard: 0,
    };
  },
  componentWillMount() {},
  componentDidMount() {
  },
  componentWillUnmount() {},
  render() {
    var width = this.props.pageWidth;
    var height = this.props.pageHeight;
    var styles = this._getStyles(width, height);

    var content = null;
    var contentProps = {
      root: this,
      navigator: this.props.navigator,
      pageWidth: width,
      pageHeight: height,
    };

    if (this.state.notes) content = <Notes {...contentProps}/>;
    if (this.state.search) content = <Search {...contentProps}/>;
    if (this.state.add) content = <Add {...contentProps}/>;

    return (
      <View style={styles.container}>
        <View style={styles.bg}>
          <Image
            style={styles.bgImage}
            source={require('../../assets/img/bg.jpg')}
            resizeMode='cover'
          />
        </View>
        <Animated.View 
          style={[styles.overlay, {
            backgroundColor: this.state.searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.96)'],
            }),
          }]}
        />
        <View
          style={[{
            width: width,
            height: height,
          }]}
          pointerEvents='box-none'
        >
          {content}
        </View>
        <Animated.View 
          style={[styles.box, {
            left: this.state.searchAnim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [16, 16, 56],
            }),
            width: this.state.searchAnim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [width - 32, width - 32, width - 32 - 32],
            }),
            backgroundColor: this.state.searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Colors.THEME_BLACK_1, 'rgba(255,255,255,0)'],
            }),
            transform: [{
              translateY: this.state.searchAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-height, 0, -height/2 + 24],
              }),
            }],
          }]}
        >
          <Animated.TextInput
            ref='search'
            style={[styles.input, {
              color: this.state.searchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [Colors.TEXT_WHITE_BASE, Colors.TEXT_BLACK_BASE],
              }),
            }]}
            autoCorrect={false}
            placeholderTextColor={this.state.searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Colors.TEXT_WHITE_BASE, Colors.TEXT_BLACK_BASE],
            })}
            underlineColorAndroid='transparent'
            placeholder='Search for dem sweet notes'
            onFocus={this._searchOn}
            onChangeText={this._onChangeQuery}
          />
          <Animated.View
            style={[styles.underline, {
              backgroundColor: this.state.searchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['white', 'rgba(0,0,0,0.87)'],
              })
            }]}
          />
        </Animated.View>
        <Animated.View
          style={[{
            position: 'absolute',
            top: height - 40,
            left: 16,
            height: height - 32 - 20,
            width: width - 32,
            padding: 8,
            borderRadius: 4,
          }, {
            transform: [{
              translateY: this.state.addAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [height, 0, -height + 40 + 8],
              }),
            }],
            backgroundColor: this.state.addAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Colors.THEME_BLACK_1, 'transparent'],
            }),
          }]}
          onStartShouldSetResponder={() => !this.state.add}
          pointerEvents={this.state.add ? 'none' : 'auto'}
          onResponderRelease={this._addOn}
        >
          <Animated.Text
            style={[{
              fontFamily: 'PlayfairDisplay-Bold',
              fontSize: 16,
              fontWeight: '900',
              textAlign: 'center',
            }, {
              color: this.state.addAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [Colors.TEXT_WHITE_BASE, Colors.TEXT_BLACK_BASE],
              }),
            }]}
          >
            ADD A NOTE
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[{
            position: 'absolute',
            top: -height + 32 + 40 + 20,
            left: 16,
            height: height - 32 - 20,
            width: width - 32,
            padding: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.56)',
          }, {
            transform: [{
              translateY: this.state.notesAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-height, 0, height - 40 - 32],
              }),
            }],
            backgroundColor: this.state.notesAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Colors.THEME_BLACK_1, 'transparent'],
            }),
          }]}
          onStartShouldSetResponder={() => !this.state.notes}
          pointerEvents={this.state.notes ? 'none' : 'auto'}
          onResponderRelease={this._notesOn}
        >
          <View
            style={{flex: 1}}
          />
          <Text
            style={{
              fontFamily: 'PlayfairDisplay-Bold',
              fontSize: 16,
              color: Colors.TEXT_WHITE_BASE,
              textAlign: 'center',
            }}
          >
            MY NOTES
          </Text>
        </Animated.View>
      </View>
    );
  },
  _notesOn() {
    if(!AppStore.isLogin) {
      this.props.navigator.alert({
        mode: 'dialog',
        string: 'Please login or register to view your notes.',
        buttons: 'continue',
      }, (c) => {
        console.log(c);
        if(c == 1) {
          this.props.navigator.push({page: 'login-dialog'});
        }
      });
      return;  
    }
    
    this.setState({
      notes: true,
      search: false,
      add: false,
    });
    Animated.parallel([
      Animated.timing(
        this.state.notesAnim,
        {toValue: 1, duration: 250,},
      ),
      Animated.timing(
        this.state.searchAnim,
        {toValue: -1, duration: 250,},
      ),
      Animated.timing(
        this.state.addAnim,
        {toValue: -1, duration: 250,},
      ),
    ]).start();
  },
  _searchOn() {
    this.setState({
      notes: false,
      search: true,
      add: false,
    });
    Animated.parallel([
      Animated.timing(
        this.state.notesAnim,
        {toValue: -1, duration: 250,},
      ),
      Animated.timing(
        this.state.searchAnim,
        {toValue: 1, duration: 250,},
      ),
      Animated.timing(
        this.state.addAnim,
        {toValue: -1, duration: 250,},
      ),
    ]).start();
  },
  _addOn() {
    // @G
    // check kung nakalogin
    if(!AppStore.isLogin) {
      this.props.navigator.alert({
        mode: 'dialog',
        string: 'Please login or register to add a note.',
        buttons: 'continue',
      });
      return;
    }

    this.setState({
      notes: false,
      search: false,
      add: true,
    });
    Animated.parallel([
      Animated.timing(
        this.state.notesAnim,
        {toValue: -1, duration: 250,},
      ),
      Animated.timing(
        this.state.searchAnim,
        {toValue: -1, duration: 250,},
      ),
      Animated.timing(
        this.state.addAnim,
        {toValue: 1, duration: 250,},
      ),
    ]).start();
  },
  _reset() {
    this.refs.search.refs.node.blur();
    Animated.parallel([
      Animated.timing(
        this.state.notesAnim,
        {toValue: 0, duration: 250,},
      ),
      Animated.timing(
        this.state.searchAnim,
        {toValue: 0, duration: 250,},
      ),
      Animated.timing(
        this.state.addAnim,
        {toValue: 0, duration: 250,},
      ),
    ]).start(() => {
      this.setState({
        notes: false,
        search: false,
        add: false,
      });
    });
  },
  _getStyles(width, height) {
    return StyleSheet.create({
      container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
      },
      bgImage: {
        height: height,
        width: width,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(255,255,255,0.12)',
      },
      box: {
        position: 'absolute',
        top: height/2 - 24,
        left: 16,
        width: width - 32,
        height: 56,
        padding: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.37)',
        overflow: 'hidden',
      },
      input: {
        flex: 1,
        height: 56,
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: 16,
        color: Colors.TEXT_WHITE_BASE,
      },
      underline: {
        height: 0.5,
      },
    })
  },
  _onChangeQuery(query) {
    console.log(query);
    APIActions.searchNotes(query);
  }
});

var Notes = React.createClass({
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
  render() {
    return (
      <Animated.View
        style={[{
          width: this.props.pageWidth,
          height: this.props.pageHeight,
        }, {
          opacity: this.state.opacity,
        }]}
      >
        <View
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            height: this.props.pageHeight - 32,
            width: this.props.pageWidth - 32,
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: Colors.THEME_BLACK_1,
          }}
        >
          <View
            style={{
              height: 56,
              flexDirection: 'row',
              backgroundColor: 'rgba(0,0,0,0.33)',
            }}
          >
            <TouchableIcon
              iconName='arrow-back'
              onPress={this._onBack}
              iconColor={Colors.TEXT_WHITE_BASE}
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
                marginTop: 15,
                fontFamily: 'PlayfairDisplay-Bold',
                fontSize: 16,
                color: Colors.TEXT_WHITE_BASE,
                textAlign: 'center',
              }}
            >
              {'USER'}
            </Text>
            <TouchableIcon
              iconName='exit-to-app'
              onPress={this._onBack}
              iconColor={Colors.TEXT_WHITE_BASE}
              underlayColor={Colors.TRANSLUCENT_BLACK_3}
              style={{
                margin: 4,
                width: 48,
                height: 48,
                borderRadius: 24,
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 16 + 48,
              width: this.props.pageWidth - 32,
              height: this.props.pageHeight - 32 - 48 - 72,
            }}
          >
            <DataList
              style={{
                height: this.props.pageHeight - 32 - 48 - 72,
              }}
              data={{'My data': [{name: 'dummy'}, {name: 'dummy'}, {name: 'dummy'}, {name: 'dummy'}, {name: 'dummy'}, {name: 'dummy'}, {name: 'dummy'}]}}
              fontColor={Colors.TEXT_WHITE_BASE}
              onPress={this._onPressNote}
              // onRefresh={this._retrieveEvents}
              // isRefreshing={this.state.refresh}
            />
          </View>
        </View>
      </Animated.View>
    );
  },
  _onBack() {
    Animated.timing(
      this.state.opacity,
      {toValue: 0, duration: 250},
    ).start();
    this.props.root._reset();
  },
  _onPressNote(v) {
    console.log(v);
  },
})

var Search = React.createClass({
  getInitialState() {
    return {
      opacity: new Animated.Value(0),
      otherNotes: NoteStore.getNotes(),
    };
  },
  componentDidMount(){
    NoteStore.bind('update-notes', () => {
      console.log('huh');
      this.setState({
        otherNotes: NoteStore.getNotes(),
      });
    });
  },
  componentWillMount(){
    APIStore.unbind('update-notes');
  },
  componentWillMount() {
    Animated.timing(
      this.state.opacity,
      {toValue: 1, duration: 250},
    ).start();
  },
  render() {
    console.log(NoteStore.getNotes());
    return (
      <Animated.View
        style={[{
          width: this.props.pageWidth,
          height: this.props.pageHeight,
        }, {
          opacity: this.state.opacity,
        }]}
      >
        <Animated.View
          style={{
            height: 56,
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
        </Animated.View>
        <KeyboardPage
          style={{
            position: 'absolute',
            top: 56,
            left: 0,
            width: this.props.pageWidth,
            height: this.props.pageHeight - 56,
          }}
          pageHeight={this.props.pageHeight - 56}
        >
          <DataList
            section={true}
            data={{'Other Notes': this.state.otherNotes}}
            onPress={this._onPressNote}
            // onRefresh={this._retrieveEvents}
            // isRefreshing={this.state.refresh}
          />
        </KeyboardPage>
      </Animated.View>
    );
  },
  _onBack() {
    Animated.timing(
      this.state.opacity,
      {toValue: 0, duration: 250},
    ).start();
    this.props.root._reset();
  },
  _onPressNote(index) {
    NoteStore.viewedNoteIndex = index;
    this.props.navigator.push({page: 'note'});
  }
})

var Add = React.createClass({
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
  render() {
    var list = [
      {
        type: 'editable',
        text: 'Title',
        placeholder: 'Note #1',
        onChangeText: v => {
          this._data.title = v;
        }
      },
      {
        type: 'editable',
        text: 'Class',
        placeholder: 'Philosophy (optional)',
        onChangeText: v => {
          this._data.class = v;
        }
      },
      {
        type: 'editable',
        text: 'Professor',
        placeholder: 'Ice Pasco (optional)',
        onChangeText: v => {
          this._data.prof = v;
        }
      },
      {
        type: 'editable-multiline',
        text: 'Content',
        placeholder: 'Today, the sun rose from the east.',
        height: this.props.pageHeight - 56 - 72*3,
        onChangeText: v => {
          this._data.content = v;
        }
      },
    ];
    return (
      <Animated.View
        style={[{
          width: this.props.pageWidth,
          height: this.props.pageHeight,
        }, {
          opacity: this.state.opacity,
          backgroundColor: this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', 'rgba(255,255,255,0.95)']
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
          <TouchableIcon
            iconName='send'
            onPress={this._onBack}
            iconColor={Colors.TEXT_BLACK_BASE}
            underlayColor={Colors.TRANSLUCENT_BLACK_3}
            style={{
              margin: 4,
              width: 48,
              height: 48,
              borderRadius: 24,
            }}
            onPress={this._onSubmit}
          />
        </Animated.View>
        <KeyboardPage
          style={{
            position: 'absolute',
            top: 56,
            left: 0,
            width: this.props.pageWidth,
            height: this.props.pageHeight - 56 + (Platform.OS == 'android' ? 72: 0),
          }}
          pageHeight={this.props.pageHeight - 56 + (Platform.OS == 'android' ? 72: 0)}
        >
          <List
            style={{
              width: this.props.pageWidth - 16,
            }}
            data={list}
          />
        </KeyboardPage>
      </Animated.View>
    );
  },
  _data: {},
  _onBack() {
    Animated.timing(
      this.state.opacity,
      {toValue: 0, duration: 250},
    ).start();
    this.props.root._reset();
  },
  _onSubmit() {
    APIActions.addNote(this._data);
  }
})


module.exports = Home;