'use strict';

var React = require('react-native');

var {
  ListView,
  TouchableHighlight,
  View,
  Text,
  RefreshControl,
} = React;

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var Colors = require('../modules/Colors.js');
var TouchableIcon = require('../components/TouchableIcon.js');

var UserList = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1.firstName !== r2.firstName || r1.lastName !== r2.lastName;
      },
      sectionHeaderHasChanged: (s1, s2) => {
        return false;
      }
    });

    return {
      data: ds.cloneWithRowsAndSections(this.props.data),
    };
  },
  componentWillReceiveProps(next) {
    this.setState({
      data: this.state.data.cloneWithRowsAndSections(next.data),
    });
  },
  render() {
    var refresh = React.createElement(RefreshControl, {
      refreshing: this.props.isRefreshing,
      onRefresh: this.props.onRefresh,
      tintColor: '#FF3D00',
      colors: ['#ff0000', '#00ff00', '#0000ff'],
    });
    return (
      <ListView
        ref='list' 
        style={[
          {
            position: 'absolute',
            top: 56,
            left: 0,
            width: width,
            height: height - 56,
            backgroundColor: Colors.theme.black.dp2,
          }, 
          this.props.style
        ]}
        contentContainerStyle={{
          paddingVertical: 8,
          alignItems: 'center',
        }}
        initialListSize={10}
        refreshControl={refresh}
        dataSource={this.state.data}
        renderRow={this._renderRow}
        renderSectionHeader={this.props.section ? this._renderSectionHeader : null}
        keyboardShouldPersistTaps={true}
      />
    );
  },
  setNativeProps(props) {
    this.refs.list.setNativeProps(props);
  },
  _renderSectionHeader(data, id) {
    return (
      <View
        style={{
          width: width,
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#FAFAFA',
        }}
      >
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
            color: 'rgba(0,0,0,0.54)',
          }}
        >
          {id}
        </Text>
      </View>
    );
  },
  _renderRow(data, section, id) {
    return (
      <TouchableHighlight
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        underlayColor={Colors.text.black.divider}
        onPress={() => (this.props.onPress && this.props.onPress(id, data))}
      >
        <View
          style={{
            width: width - 32,
            borderRadius: 2,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: Colors.palette.deeporange.a100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {this.props.icon && this.props.icon(data)}
          </View>
          <View 
            style={{
              height: 40,
              paddingLeft: 16,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                color: Colors.text.black.base,
              }}
            >
              {data.firstName + ' ' + data.lastName}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = UserList;