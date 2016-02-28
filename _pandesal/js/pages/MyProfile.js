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

var MyProfile = React.createClass({
  getInitialState() {
    return {
      overlay: width * 3 / 4,
      user: null,
    };
  },
  componentDidMount() {
    appStore.bind('update-me', this._updateUser);
    appActions.setState('retrieve-me');
  },
  componentWillUnmount() {
    appStore.unbind('update-me', this._updateUser);
  },
  render() {
    var icons = [{
      iconName: 'menu',
      onPress: this._onPressPushDrawer,
    }];

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
  _onPressProfileEdit() {
    // navActions.pushProfileEdit();
  },
  _updateUser() {
    this.setState({
      user: appStore.userData,
    });
  }
});

module.exports = MyProfile;