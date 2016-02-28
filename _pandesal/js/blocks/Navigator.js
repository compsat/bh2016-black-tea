'use strict';

var React = require('react-native');
var {
  Platform,
  Animated,
  View,
  StyleSheet,
  InteractionManager,
  BackAndroid,
  StatusBar,
} = React;

var {
  owidth,
  oheight,
  width,
  height,
} = require('../modules/Dimensions.js');

var _ = require('lodash');

var TextInputState = require('TextInputState');

var NavigationDrawer = require('./NavigationDrawer.js');
// var StatusBar = require('./StatusBar.js');
var Alert = require('./Alert.js');

var Navigator = React.createClass({
  getInitialState() {
    return {
      routeStack: this.props.initialRouteStack,
      currentIndex: this.props.initialRouteStack.length - 1,
      alert: null,
      alerts: [],
    };
  },
  componentDidMount() {
    if(Platform.OS == 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._backHandler);
    }
  },
  componentWillUnmount() {
    this._isAnimating = false;
  },
  render() {
    var background = this.props.background;
    var status = <StatusBar ref='status' hidden={true} backgroundColor='transparent'/>;
    var scenes = this.state.routeStack.map((v, i) => {
      var size = {
        width: width,
        height: height,
      };
      if (this.props.hideStatusBar) {
        size = {
          width: owidth,
          height: oheight,
        };
      }
      return (
        <Animated.View 
          key={i}
          style={[!this.props.hideStatusBar ? styles.page : styles.page_full, {opacity: v.opacity}]}
          pointerEvents={i == this.state.currentIndex ? 'auto' : 'none'}
        >
          {this.props.renderScene(v, size)}
        </Animated.View>
      );
    });
    var drawer = this.props.drawer
      ? <NavigationDrawer 
          ref='drawer'
          drawerContent={this.props.drawerContent}
          navigator={this}
        >
          {scenes}
        </NavigationDrawer>
      : scenes;
    var alert = this.state.alerts.length 
      ? <Alert 
          ref='alert' 
          {...this.state.alerts[0]}
        />
      : null;
    return (
      <View ref='navigator' style={this.props.style}>
        {background}
        {drawer}
        {status}
        {alert}
      </View>
    );
  },
  setStatusColor(color) {
    Platform.OS == 'ios' && this.refs['status'].setColor(color);
  },
  alert(obj, callback) {
    var alertObject = {};
    alertObject = obj;
    alertObject.end = out => {
      this.setState({
        alert: this.state.alerts.shift(),
      }, () => {
        callback && callback(out);
      });
    };
    this.state.alerts.push(alertObject);
    this.setState({
      alerts: this.state.alerts,
    });
  },
  getCurrentRoute() { 
    return this.state.routeStack[this.state.currentIndex];
  },
  getRouteStack() {
    return [...this.state.routeStack];
  },
  push(route) {
    if(this._isAnimating || this.getCurrentRoute() && this.getCurrentRoute().page == route.page) return;

    this._dismissKeyboard();
    this._isAnimating = true;
    this._fadeIn(route, () => {
      this._isAnimating = false;  
    });
    this.setState({
      routeStack: this.state.routeStack.concat([route]),
      currentIndex: this.state.currentIndex + 1,
    });
  },
  replace(route) {
    if (this._isAnimating || this.getCurrentRoute() && this.getCurrentRoute().page == route.page) return;
    
    this.getCurrentRoute()._skip = true;
    this.push(route);
  },
  popToTop() {
    if(this._isAnimating || this.state.routeStack.length == 1) return;

    if (this._clearSkip()) return;

    this._isAnimating = true;
    this.state.routeStack.forEach((v, i) => {
      if(i == 0 || i == this.currentIndex) return;
      v.opacity.setValue(0);
    });

    this._fadeOut(this.getCurrentRoute(), () => {
      this._isAnimating = false;
      this.setState({
        routeStack: this.state.routeStack.slice(0, 1),
        currentIndex: 0,
      });
    });
  },
  // popRoute(route) {
  //   var index = this.state.routeStack.indexOf(route);
  //   if(index != -1){
  //     InteractionManager.runAfterInteractions(() => {
  //       this.state.routeStack.splice(index, 1);
  //       this.state.currentIndex--;
  //     });
  //   }
  // },
  pop() {
    if (this._isAnimating || this.state.routeStack.length == 1) return;
    
    if (this._clearSkip()) return;

    var targetIndex = this.state.currentIndex - 1;

    this._isAnimating = true;
    this._fadeOut(this.getCurrentRoute(), () => {
      this._isAnimating = false;
      this.setState({
        routeStack: this.state.routeStack.slice(0, targetIndex + 1),
        currentIndex: targetIndex,
      });
    });
  },
  _clearSkip() {
    var remove = [];
    this.state.routeStack.forEach(v => {
      if (!v._skip) remove.push(v);
    });

    _.pull(this.state.routeStack, remove);

    this.state.currentIndex = this.state.routeStack.length - 1;

    this.setState({
      routeStack: this.state.routeStack,
      currentIndex: this.state.currentIndex,
    });

    if (this.state.routeStack.length < 2) return true;
    else return false;
  },
  _isAnimating: false,
  _fadeIn(route, cb) {
    !route.opacity
      ? (route.opacity = new Animated.Value(0))
      : route.opacity.setValue(0);
    Animated.timing(
      route.opacity,
      {
        duration: 300,
        toValue: 1,
      },
    ).start(() => {
      cb && cb();
    });
  },
  _fadeOut(route, cb) {
    !route.opacity
      ? (route.opacity = new Animated.Value(1)) 
      : route.opacity.setValue(1);
    Animated.timing(
      route.opacity,
      {
        duration: 150,
        toValue: 0,
      },
    ).start(() => {
      cb && cb();
    });
  },
  _backHandler() {
    if(this.props.drawer && this.refs.drawer.isOpen()) {
      this.refs.drawer.close();
    } else {
      if (this.getCurrentRoute() && this.getCurrentRoute().disableBack) {
        return true;
      } else {
        this.pop();
      }
    }
    if(this.state.currentIndex == 0) return false;
    return true;
  },
  _dismissKeyboard() {
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
  },
});

var styles = StyleSheet.create({
  page: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 : 0,
    left: 0,
    width: width,
    height: height - (Platform.OS == 'ios' ?  -20 : 0),
    backgroundColor: 'transparent',
  },
  page_full: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },
});

module.exports = Navigator;