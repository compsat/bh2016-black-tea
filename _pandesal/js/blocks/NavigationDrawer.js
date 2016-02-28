'use strict';

var React = require('react-native');

var {
  Platform,
  Animated,
  InteractionManager,
  View,
  StyleSheet,
} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var MAX_WIDTH = width > 600 ? 320 : width - 56;

var NavigationDrawer = React.createClass({
  getInitialState() {
    return {
      open: false,
      offset: new Animated.Value(-MAX_WIDTH),
      overlay: new Animated.Value(0),
    };
  },
  render() {
    var styles = this._getStyles();
    var content = React.cloneElement(this.props.drawerContent, {
      drawer: this,
      navigator: this.props.navigator,
    });
    return (
      <View style={styles.container}>
        {this.props.children}
        {this.state.open && 
          [
            <Animated.View
              key={'overlay'}
              style={[
                styles.drawerContainer, 
                {opacity: this.state.overlay}
              ]}
              onStartShouldSetResponder={() => true}
              onResponderRelease={this.close}
            />
            ,
            <Animated.View 
              key={'drawer'}
              style={[
                styles.drawer, 
                {left: this.state.offset}
              ]}
            >
              {content}
            </Animated.View>
          ]
        }
      </View>
    );
  },
  isOpen() {
    return this.state.open;
  },
  open() {
    !this.state.open && this.setState({
      open: true,
    }, Animated.parallel([
      Animated.timing(
        this.state.offset,
        {
          duration: 300,
          toValue: 0,
        },
      ),
      Animated.timing(
        this.state.overlay,
        {
          duration: 300,
          toValue: 1,
        },
      ),
    ]).start());
  },
  close() {
    Animated.parallel([
      Animated.timing(
        this.state.offset,
        {
          duration: 300,
          toValue: -MAX_WIDTH,
        },
      ),
      Animated.timing(
        this.state.overlay,
        {
          duration: 300,
          toValue: 0,
        },
      ),
    ]).start(() => {
      this.state.open && this.setState({
        open: false,
      });
    });
  },
  _getStyles() {
    return StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      drawerContainer: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? 20 : 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.54)',
      },
      drawer: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? 20 : 0,
        left: 0,
        width: MAX_WIDTH,
        height: height,
        backgroundColor: '#FAFAFA',
      },
    });
  },
});

module.exports = NavigationDrawer;