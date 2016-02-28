'use strict';

var React = require('react-native');

var {
  Platform,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var Icon = require('react-native-vector-icons/MaterialIcons');

var AppActions = require('../actions/AppActions.js');

var AppStore = require('../stores/AppStore.js');

var List = require('../components/List.js');

var Colors = require('../modules/Colors.js');

var Drawer = React.createClass({
  getInitialState() {
    return {
      // user: {
      //   firstName: 'Loading',
      //   lastName: 'User',
      //   email: 'Loading Email'
      // }
    };
  },
  // componentDidMount() {
  //   appStore.bind('update-user', this._updateUser);
  //   this._updateUser();
  // },
  // componentWillUnmount() {
  //   appStore.unbind('update-user', this._updateUser);
  // },
  render() {
    var list = [
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'Home',
        iconName: 'home',
        onPress: this._onPressPopAndReplace.bind(this, 'home'),
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'Explore',
        iconName: 'explore',
        onPress: this._onPressPopAndReplace.bind(this, 'explore'),
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'My Events',
        iconName: 'person',
        onPress: this._onPressPopAndReplace.bind(this, 'my-events'),
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'Joined Events',
        iconName: 'event-note',
        onPress: this._onPressPopAndReplace.bind(this, 'joined-events'),
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'Event Invites',
        iconName: 'event',
        onPress: this._onPressPopAndReplace.bind(this, 'event-invites'),
      },
      {
        type: 'divider',
      },
      {
        type: 'padding',
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'My Friends',
        iconName: 'people',
        onPress: this._onPressPopAndReplace.bind(this, 'my-friends'),
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'Find Friends',
        iconName: 'group-add',
        onPress: this._onPressPopAndReplace.bind(this, 'find-friends'),
      },
      {
        type: 'normal-dense-icon',
        subtype: 'selectable',
        text: 'Friend Requests',
        iconName: 'person-add',
        onPress: this._onPressPopAndReplace.bind(this, 'friend-requests'),
      },
      {
        type: 'divider',
      },
      {
        type: 'padding',
      },
      {
        type: 'normal-dense',
        subtype: 'selectable',
        text: 'Profile',
        onPress: this._onPressPopAndReplace.bind(this, 'my-profile'),
      },
      {
        type: 'normal-dense',
        subtype: 'selectable',
        text: 'Logout',
        onPress: this._onPressPopAndReplace.bind(this, 'login'),
      },
    ];

    return (
      <View>
        <ScrollView
          style={{
            height: height,
            backgroundColor: Platform.OS == 'android' ? '#FAFAFA' : Colors.palette.teal.b500,
          }}
          automaticallyAdjustContentInsets={false}
        >
          <View
            style={{
              backgroundColor: Colors.palette.teal.b500,
            }}
          >
            <View
              style={{
                marginTop: 16,
                marginLeft: 16,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: Colors.palette.deeporange.a400,
              }}
            />
            <View
              style={{
                height: 56,
                marginTop: 16,
                marginLeft: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  color: 'white',
                }}
              >
                {this.state.user.firstName + ' ' + this.state.user.lastName}
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 14,
                  color: 'white',
                }}>
                {this.state.user.email}
              </Text>
            </View>
          </View>
          <View 
            style={{
              paddingTop: 8,
              backgroundColor: '#FAFAFA',
              paddingBottom: height,
              marginBottom: -height + 8,
            }}
          >
            <List
              style={{
                paddingVertical: 8,
              }}
              data={list}
            />
          </View>
        </ScrollView>
      </View>
    );
  },
  _onPressPopAndReplace(page) {
    this.props.drawer.close();
    this.props.navigator.replace({page: page});
  },
  // _updateUser() {
  //   this.setState({
  //     user: appStore.userData,
  //   });
  // },
});

module.exports = Drawer;
