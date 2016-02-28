'use strict';

var _ = require('underscore');

var React = require('react-native');

var {
  Platform,
  View,
  ScrollView,
  Text,
} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var Icon = require('react-native-vector-icons/MaterialIcons');

var appActions = require('../actions/appActions.js');
var navActions = require('../actions/navActions.js');

var appStore = require('../stores/appStore.js');

var Bar = require('../components/Bar.js');
var FloatingActionButton = require('../components/FloatingActionButton.js');

var Colors = require('../modules/Colors.js');

var Profile = React.createClass({
  getInitialState() {
    return {
      keyboard: 0,
      overlay: width * 3 / 4,
      user: null,
      friendStatus: '',
    };
  },
  componentDidMount() {
    appStore.bind('update-me', this._onUpdateMe);
    appStore.bind('update-user', this._onUpdateProfile);
    this.setState({
      user: appStore.profile,
    });
    appActions.setState('retrieve-me');
    appActions.setState('retrieve-user', {userId: appStore.profile._id});
    // this._onUpdateProfile();
    console.log(this.state.friendStatus);
  },
  componentWillUnmount() {
    appStore.unbind('update-me', this._onUpdateMe);
    appStore.unbind('update-user', this._onUpdateProfile);
  },
  render() {
    var icons = [{
      iconName: 'arrow-back',
      onPress: this._onPressBack,
    }];

    var fab = null;
    var prefab = null;
    if(this.state.user && this.state.user.friendStatus) {
      if (this.state.user.friendStatus == 'friends') {
        fab = {
          iconName: 'delete',
          onPress: this._onPressRemoveFriend,
        };
      } else if (this.state.user.friendStatus == 'requesting') {
        fab = {
          iconName: 'close',
          onPress: this._onPressCancelFriendRequest,
        };
      } else if (this.state.user.friendStatus == 'accepting') {
        prefab = {
          iconName: 'close',
          onPress: this._onPressDenyFriendRequest,
        };
        fab = {
          iconName: 'check',
          onPress: this._onPressAcceptFriendRequest,
        };
      } else if (this.state.user.friendStatus == 'none') {
        fab = {
          iconName: 'person-add',
          onPress: this._onPressAddFriend,
        };
      }
    }
  
    return (
      <View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: height,
        }}
      >
        <ScrollView
          style={{
            height: height,
            backgroundColor: Colors.palette.teal.b500,
          }}
          onScroll={this._onScroll}
          scrollEventThrottle={16}
        >
          <View
            style={{
              height: width * 3 / 4,
            }}
          >
            <Icon
              name='person'
              color={Colors.palette.deeporange.b400}
              size={width}
              style={{width: width, height: width,}}
            />
          </View>
          <View
            style={{
              marginBottom: -height + 8,
              paddingBottom: height,
              backgroundColor: Colors.theme.black.dp2,
            }}
          >
            <Text
              style={{
                paddingLeft: 16,
                paddingVertical: 16,
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                color: Colors.text.black.secondary,
              }}
            >
            </Text>
          </View>
          {prefab && <FloatingActionButton
            style={{
              top: width * 3 / 4 - 56/2,
              left: width - 16 - 56 - 56 - 16,
            }}
            iconName={prefab.iconName}
            iconColor='white'
            color={Colors.palette.deeporange.a400}
            onPress={prefab.onPress}
          />}
          {fab && <FloatingActionButton
            style={{
              top: width * 3 / 4 - 56/2,
            }}
            iconName={fab.iconName}
            iconColor='white'
            color={Colors.palette.deeporange.a400}
            onPress={fab.onPress}
          />}
        </ScrollView>
        <Bar
          ref='bar'
          icons={icons}
          underlayColor={Colors.palette.teal.b700}
          iconColor='white'
          style={{
            backgroundColor: 'rgba(0, 150, 136, 0)',
          }}
          iconStyle={{
            margin: 4,
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
        >
          <Text
            ref='title'
            numberOfLines={1}
            style={{
              marginTop: 15,
              marginLeft: 16,
              fontFamily: 'Roboto-Medium',
              fontSize: 20,
              color: 'white',
              opacity: 0,
            }}
          >
            {this.state.user ? (this.state.user.firstName + ' ' + this.state.user.lastName) : 'Profile'}
          </Text>
        </Bar>
      </View>
    );
  },
  _onScroll(e) {
    var temp = ((width * 3 / 4 - 56) - e.nativeEvent.contentOffset.y)/(width * 3 / 4 - 56);
    
    var barProps = {
      style: {
        backgroundColor: 'rgba(0, 150, 136, ' + (1 - temp) + ')',
      }
    };
    if (temp < 0.01) {
      barProps.iconStyle = {
        margin: 4,
        width: 48,
        height: 48,
        borderRadius: 24,
      };
    } else {
      barProps.iconStyle = {
        margin: 0,
        width: 56,
        height: 56,
        borderRadius: 0,
      };
    }
    this.refs.bar.setNativeProps(barProps);
    this.refs.title.setNativeProps({
      style: {
        opacity: 1 - temp,
      }
    });
  },
  _onPressPushDrawer() {
    navActions.pushDrawer();
  },
  _onPressBack() {
    navActions.pop();
  },
  _onPressAddFriend() {
    appActions.setState('add-friend', {userId: this.state.user._id});
  },
  _onPressAcceptFriendRequest() {
    appActions.setState('accept-friend', {userId: this.state.user._id});
  },
  _onPressDenyFriendRequest() {
    appActions.setState('deny-friend', {userId: this.state.user._id});
  },
  _onPressRemoveFriend() {
    appActions.setState('remove-friend', {userId: this.state.user._id});
  },
  _onPressProfileEdit() {
    // navActions.pushProfileEdit();
  },
  _onUpdateMe() {
    
  },
  _onUpdateProfile() {
    console.log('call');
    this.setState({
      user: appStore.profile,
    });
    console.log(this.state.user);
  },
  _onPressCancelFriendRequest() {
    appActions.setState('deny-friend', {userId: this.state.user._id});
  },
});

module.exports = Profile;