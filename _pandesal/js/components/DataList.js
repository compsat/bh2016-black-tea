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

var DataList = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1.title !== r2.title;
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
      tintColor: '#FFFFFF',
      colors: ['#FFFFFF', '#000000', '#FFFFFF'],
    });
    return (
      <ListView
        ref='list'
        style={this.props.style}
        contentContainerStyle={{
          paddingVertical: 8,
          alignItems: 'center',
        }}
        initialListSize={10}
        refreshControl={refresh}
        dataSource={this.state.data}
        renderRow={this._renderRow}
        renderSectionHeader={this.props.section ? this._renderSectionHeader : null}
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
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      >
        <Text
          style={{
            fontFamily: 'PlayfairDisplay-Bold',
            fontSize: 14,
            color: this.props.fontColor ? this.props.fontColor : 'rgba(0,0,0,0.54)',
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
              flex: 1,
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontFamily: 'PlayfairDisplay-Regular',
                fontSize: 16,
                color: this.props.fontColor ? this.props.fontColor : Colors.text.black.base,
              }}
            >
              {data.title}
            </Text>
            <Text
              style={{
                fontFamily: 'PlayfairDisplay-Regular',
                fontSize: 12,
                color: this.props.fontColor ? this.props.fontColor : Colors.text.black.secondary,
              }}
            >
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

module.exports = DataList;