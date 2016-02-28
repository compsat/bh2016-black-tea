'use strict';

var React = require('react-native');

var {
  StatusBarIOS,
  View,
  Platform,
  StyleSheet,
} = React;

var AppActions = require('../actions/AppActions.js');

var AppStore = require('../stores/AppStore.js');

var Navigator = require('../blocks/Navigator.js');

var Drawer = require('../pages/Drawer.js');
var Login = require('../pages/Login.js');
var Register = require('../pages/Register.js');
// var Verify = require('./Verify.js');

var Home = require('../pages/Home.js');
var Note = require('../pages/Note.js');
// var Profile = require('./Profile.js');
// var MyProfile = require('./MyProfile.js');

var LoginDialog = require('../pages/LoginDialog.js');

var AppActionTypes = require('../constants/actions.js').AppActionTypes;
var Colors = require('../constants/colors.js');

console.disableYellowBox = true;

var RootController = React.createClass({
  componentDidMount() {
  this._navigator.push({page: 'home'});
    // setTimeout(() => this._navigator.push({page: 'login-dialog'}), 500);
  },
  render() {
    return (
      <Navigator
        ref={ref => {
          this._navigator = ref;
          this._drawer = ref.refs.drawer;
          AppActions.initialize({navigator: ref, drawer: ref.refs.drawer});
        }}
        style={{flex: 1}}
        hideStatusBar={true}
        initialRouteStack={[]}
        renderScene={this._renderScene}
      />
    );
  },
  _navigator: null,
  _drawer: null,
  _renderScene(route, size) {
    var pageProps = {
      navigator: this._navigator,
      drawer: this._drawer,
      pageWidth: size.width,
      pageHeight: size.height,
    };
    switch(route.page) {
      case 'login':
        return (
          <Login {...pageProps} />
        );
      case 'register':
        return (
          <Register {...pageProps}/>
        );
      // case 'verify':
      //   return (
      //     <Verify {...pageProps}/>
      //   );
      case 'home':
        return (
          <Home {...pageProps}/>
        );
      case 'note':
        return (
          <Note {...pageProps}/>
        );
      // case 'profile':
      //   return (
      //     <Profile {...pageProps}/>
      //   );
      // case 'my-profile':
      //   return (
      //     <MyProfile {...pageProps}/>
      //   );
      case 'login-dialog':
        return (
          <LoginDialog {...pageProps}/>
        );
      case '':
      default:
        return false;
    }
  },
});

module.exports = RootController;