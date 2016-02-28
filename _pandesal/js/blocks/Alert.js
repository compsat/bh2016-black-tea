'use strict';

var React = require('react-native');

var {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  DatePickerIOS,
  TouchableHighlight,
  StyleSheet,
} = React;

var {
  owidth,
  oheight,
  width,
  height,
} = require('../modules/Dimensions.js');

var DateTimePicker = require('../components/DateTimePicker.js');
// var LocationPicker = require('../components/LocationPicker.js');

var Colors = require('../modules/AppColors.js');

var colors = require('../constants/colors.js');

var Alert = React.createClass({
  getInitialState() {
    return {
      keyboard: 0
    };
  },
  render() {
    var styles = this._getStyles();
    var content = null;
    var buttons = null;

    switch(this.props.mode) {
      case 'datetime':
        content = (
          <DateTimePicker
            style={{
              width: width - 16,
            }}
            selectedDate={this.props.date}
            onDateTimeChange={d => this.setState({date: d})}
          />
        );
        break;
      case 'dialog':
        content = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {this.props.string}
            </Text>
          </View>
        );
        break;
      case 'dropdown':
        var items = this.props.items.length;
        if (items > 3) items = 3;
        content = (
          <ScrollView
            style={{
              paddingVertical: 8,
              height: 48 * items + 16,
            }}
            contentContainerStyle={{
              height: 48 * this.props.items.length + 16,
            }}
            automaticallyAdjustContentInsets={false}
          >
            {this.props.items.map(v => {
              return (
                <TouchableHighlight
                  underlayColor='rgba(0,0,0,0.12)'
                  onPress={() => this.props.end(v)}
                >
                  <View style={styles.itemContainer}>
                    <Text style={styles.text}>
                      {v}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        );
        break;
      case 'input':
        content = (
          <View style={styles.inputContainer}>
            <Text style={styles.text}>
              {this.props.string}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={this.props.placeholder}
              onChangeText={c => this.setState({input: c})}
            />
          </View>
        );
        break;
      // case 'location':
      //   content = (
      //     <LocationPicker
      //       zoomLevel={this.props.location ? 15 : null}
      //       location={this.props.location}
      //       onSelect={place => this.setState({place: place})}
      //     />
      //   );
      //   break;
    };
    
    switch(this.props.buttons) {
      case 'ok':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(1)}
            >
              <Text style={styles.buttonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>);
        break;
      case 'ok-cancel':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonBig}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(0)}
            >
              <Text style={styles.buttonText}>
                CANCEL
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(1)}
            >
              <Text style={styles.buttonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>);
        break;
      case 'datetime':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonBig}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(0)}
            >
              <Text style={styles.buttonText}>
                CANCEL
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end((this.state && this.state.date) || this.props.date || new Date)}
            >
              <Text style={styles.buttonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>);
        break;
      case 'yes-no':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(0)}
            >
              <Text style={styles.buttonText}>
                NO
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(1)}
            >
              <Text style={styles.buttonText}>
                YES
              </Text>
            </TouchableHighlight>
          </View>);
        break;
      case 'input-ok':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(this.state && this.state.input)}
            >
              <Text style={styles.buttonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>);
        break;
      case 'location':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonBig}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(0)}
            >
              <Text style={styles.buttonText}>
                CANCEL
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonSmall}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(this.state && this.state.place)}
            >
              <Text style={styles.buttonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>);
        break;
      case 'continue':
        buttons = (
          <View style={styles.buttonBar}>
            <TouchableHighlight
              style={styles.buttonBig}
              underlayColor='rgba(0,0,0,0.12)'
              onPress={() => this.props.end(1)}
            >
              <Text style={styles.buttonText}>
                CONTINUE
              </Text>
            </TouchableHighlight>
          </View>);
        break;
    };

    return (
      <ScrollView 
        ref={ref => this._scrollViewRef = ref}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        keyboardShouldPersistTaps={true}
        onKeyboardWillShow={this._onKeyboardShow}
        onKeyboardDidShow={this._onKeyboardShow}
        onKeyboardWillHide={this._onKeyboardHide}
        onKeyboardDidHide={this._onKeyboardHide}
      >
        <View
          style={styles.overlay}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => this.props.end(0)}
        />
        <View style={styles.content}>
          {content}
          {buttons}
        </View>
      </ScrollView>
    );
  },
  _scrollViewRef: null,
  _onKeyboardShow(e) {
    // console.log(e.nativeEvent);
    this.setState({
      keyboard: e.endCoordinates.height
    });
  },
  _onKeyboardHide() {
    this.setState({
      keyboard: 0
    });
  },
  _setPos() {

  },
  _getStyles() {
    return StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: owidth,
        height: oheight - (this.state.keyboard ? this.state.keyboard : 0),
        backgroundColor: 'transparent',
      },
      contentContainer: {
        width: owidth,
        height: oheight - (this.state.keyboard ? this.state.keyboard : 0),
        alignItems: this.props.x != null ? 'flex-start' : 'center',
        justifyContent: this.props.x != null ? 'flex-start' : 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: owidth,
        height: oheight,
        backgroundColor: Colors.black.b2,
      },
      content: {
        marginLeft: this.props.x,
        marginTop: this.props.y,
        width: this.props.width || (width - 16),
        backgroundColor: 'rgba(255,255,255,0.87)',
      },
      textContainer: {
        padding: 16,
        flex: 1,
      },
      text: {
        fontFamily: 'PlayfairDisplay-Regular',
        fontSize: 16,
        color: Colors.black.b1,
      },
      itemContainer: {
        paddingTop: 7.5,
        paddingLeft: 16,
        height: 48,
      },
      buttonBar: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: colors.THEME_BLACK_1,
      },
      buttonBig: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonSmall: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: 14,
        margin: 8,
        color: colors.TEXT_WHITE_BASE,
      },
      input: {
        fontFamily: 'PlayfairDisplay-Regular',
        fontSize: 14,
        marginTop: 16,
        width: width - 48,
        height: 24,
      },
      inputContainer: {
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
        flex: 1,
      },
      locationInput: {
        margin: 16,
        fontFamily: 'PlayfairDisplay-Regular',
        fontSize: 14,
        width: width - 48,
        height: 24,
      }
    });
  },
});

module.exports = Alert;