'use strict';

var React = require('react-native');

var {
  Platform,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

var Icon = require('react-native-vector-icons/MaterialIcons');
// var Map = require('./Map.js');
var Dropdown = require('./Dropdown.js');

var List = React.createClass({
  render() {
    var pass1 = this.props.data.map((v, i) => {
      switch(v.type) {
        case 'subheader':
          return (
            <View
              key={i}
              style={{
                height: 48,
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.text}
              </Text>
            </View>
          );
        case 'divider':
          return (
            <View
              key={i}
              style={{
                height: 1,
                marginTop: 8,
                backgroundColor: 'rgba(0,0,0,0.12)',
              }}
            />
          );
        case 'padding':
          return (
            <View
              key={i}
              style={{
                height: 8,
              }}
            />
          );
        case 'editable':
          return (
            <View
              key={i}
              style={{
                height: 72,
                paddingLeft: Platform.OS == 'android' 
                  ? Platform.Version >= 21 ? 12 : 0 : 16,
                paddingRight: 16,
              }}
            >
              <Text
                style={{
                  marginTop: 16,
                  marginLeft: Platform.OS == 'android' 
                    ? Platform.Version >= 21 ? 4 : 12 : 0,
                  fontFamily: 'PlayfairDisplay-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.text}
              </Text>
              <TextInput
                style={{
                  paddingVertical: 8,
                  height: 36,
                  fontFamily: 'PlayfairDisplay-Regular',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.87)',
                }}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                autoCorrect={false}
                defaultValue={v.defaultValue}
                editable={v.editable}
                keyboardType={v.keyboardType}
                onChangeText={v.onChangeText}
                placeholder={v.placeholder}
                secureTextEntry={v.secureTextEntry}
              />
            </View>
          );
        case 'editable-icon':
          return (
            <View
              key={i}
              style={{
                height: 56,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name={v.iconName}
                  color={v.iconColor}
                  size={v.iconSize || 24}
                />
              </View>
              <TextInput
                style={{
                  marginLeft: Platform.OS == 'android' 
                    ? Platform.Version >= 21 ? 4 : 12 : 0,
                  flex: 1,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.87)',
                }}
                autoCapitalize='none'
                autoCorrect={false}
                defaultValue={v.defaultValue}
                editable={v.editable}
                keyboardType={v.keyboardType}
                onChangeText={v.onChangeText}
                placeholder={v.placeholder}
                secureTextEntry={v.secureTextEntry}
              />
            </View>
          );
        case 'editable-multiline':
          return (
            <View
              key={i}
              style={{
                paddingLeft: Platform.OS == 'android' 
                  ? Platform.Version >= 21 ? 12 : 0 : 16,
                paddingRight: 16,
              }}
            >
              <Text
                style={{
                  marginTop: 16,
                  marginLeft: Platform.OS == 'android' 
                    ? Platform.Version >= 21 ? 4 : 12 : 0,
                  fontFamily: 'PlayfairDisplay-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.text}
              </Text>
              <TextInput
                style={{
                  paddingVertical: 8,
                  height: v.height ? v.height : 76,
                  fontFamily: 'PlayfairDisplay-Regular',
                  fontSize: 16,
                  textAlignVertical: 'top',
                  color: 'rgba(0,0,0,0.87)',
                }}
                underlineColorAndroid='transparent'
                numberOfLines={10}
                autoCapitalize='none'
                autoCorrect={false}
                multiline={true}
                defaultValue={v.defaultValue}
                editable={v.editable}
                keyboardType={v.keyboardType}
                onChangeText={v.onChangeText}
                placeholder={v.placeholder}
                secureTextEntry={v.secureTextEntry}
              />
            </View>
          );
        case 'pair-double':
          return (
            <View
              key={i}
              style={{
                height: 48,
                paddingHorizontal: 16,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 12,
                    color: 'rgba(0,0,0,0.54)',
                  }}
                >
                  {v.text}
                </Text>
                <Text
                  style={{
                    marginBottom: 4,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.87)',
                  }}
                >
                  {v.subtext}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 12,
                    color: 'rgba(0,0,0,0.54)',
                  }}
                >
                  {v.text2}
                </Text>
                <Text
                  style={{
                    marginBottom: 4,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.87)',
                  }}
                >
                  {v.subtext2}
                </Text>
              </View>
            </View>
          );
        // case 'location':
        //   return (
        //     <View
        //       key={i}
        //       shouldRasterizeIOS={true}
        //     >
        //       <Map
        //         style={{
        //           height: this.props.style.width/2,
        //           marginBottom: 8,
        //         }}
        //         scrollEnabled={v.scrollEnabled}
        //         zoomEnabled={v.zoomEnabled}
        //         zoomLevel={v.location ? 15 : 0}
        //         centerCoordinate={v.location ? v.location : null}
        //         annotations={v.location ? [{
        //           coordinates: [v.location.latitude, v.location.longitude],
        //           type: 'point',
        //           id: 'pointer',
        //         }] : null}
        //       />
        //     </View>
        //   );
        // case 'location-label':
        //   return (
        //     <View
        //       key={i}
        //       shouldRasterizeIOS={true}
        //     >
        //       <Text
        //         style={{
        //           marginTop: 16,
        //           marginBottom: 8,
        //           marginHorizontal: 16,
        //           fontFamily: 'Roboto-Regular',
        //           fontSize: 12,
        //           color: 'rgba(0,0,0,0.54)',
        //         }}
        //       >
        //         {v.label}
        //       </Text>
        //       <Map
        //         style={{
        //           height: this.props.style.width/2,
        //           marginBottom: 8,
        //         }}
        //         scrollEnabled={v.scrollEnabled}
        //         zoomEnabled={v.zoomEnabled}
        //         zoomLevel={v.location ? 15 : 0}
        //         centerCoordinate={v.location ? v.location : null}
        //         annotations={v.location ? [{
        //           coordinates: [v.location.latitude, v.location.longitude],
        //           type: 'point',
        //           id: 'pointer',
        //         }] : null}
        //       />
        //       <Text
        //         style={{
        //           marginTop: 8,
        //           marginBottom: 8,
        //           marginHorizontal: 16,
        //           fontFamily: 'Roboto-Regular',
        //           fontSize: 12,
        //           color: 'rgba(0,0,0,0.27)',
        //         }}
        //       >
        //         {v.name && v.name}
        //       </Text>
        //     </View>
        //   );
        case 'normal-double':
          return (
            <View
              key={i}
              style={{
                height: 72,
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  marginBottom: 8,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.text}
              </Text>
              <Text
                style={{
                  marginBottom: 4,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.subtext}
              </Text>
            </View>
          );
        case 'normal-double-big':
          return (
            <View
              key={i}
              style={{
                height: 88,
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  marginBottom: 8,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.label}
              </Text>
              <Text
                style={{
                  marginBottom: 4,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.text}
              </Text>
            </View>
          );
        case 'normal-double-dense':
          return (
            <View
              key={i}
              style={{
                height: 48,
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.text}
              </Text>
              <Text
                style={{
                  marginBottom: 4,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.subtext}
              </Text>
            </View>
          );
        case 'normal-dense':
          return (
            <View
              key={i}
              style={{
                height: 48,
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  marginBottom: 4,
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.text}
              </Text>
            </View>
          );
        case 'normal-dense-icon':
          return (
            <View
              key={i}
              style={{
                height: 48,
                paddingRight: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name={v.iconName}
                  color={v.iconColor || 'rgba(0,0,0,0.54)'}
                  size={v.iconSize || 24}
                />
              </View>
              <Text
                style={{
                  marginLeft: 16,
                  marginBottom: 4,
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.text}
              </Text>
            </View>
          );
        case 'normal-triple':
          return (
            <View
              key={i}
              style={{
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  marginTop: 16,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.text}
              </Text>
              <Text
                style={{
                  marginBottom: 8,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.54)',
                }}
              >
                {v.subtext}
              </Text>
              <Text
                style={{
                  marginBottom: 16,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.subtext2}
              </Text>
            </View>
          );
        case 'normal':
        default:
          return (
            <View
              key={i}
              style={{
                height: 56,
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  marginBottom: 4,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                {v.text}
              </Text>
            </View>
          );
      }
    });

    var list = pass1.map((v, i) => {
      switch(this.props.data[i].subtype) {
        case 'selectable':
          return (
            <TouchableHighlight
              key={'sub' + i}
              onPress={this.props.data[i].onPress}
              underlayColor='rgba(0,0,0,0.12)'
            >
              {v}
            </TouchableHighlight>
          );

        case 'dropdown':
          return (
            <Dropdown
              key={'sub' + i}
              items={this.props.data[i].items}
              underlayColor='rgba(0,0,0,0.12)'
              onSelect={this.props.data[i].onSelect}
              width={this.props.data[i].width}
            >
             {v} 
            </Dropdown>
          );
        default:
          return v;
      }
    });
    return (
      <View
        ref='list'
        style={[{
          flex: 1,
        } ,this.props.style]}
        onLayout={this._onLayout}
      >
        {list}
      </View>
    );
  },
  _onLayout(e) {
    this.refs['list'].setNativeProps({
      style: {
        height: e.nativeEvent.layout.height,
      },
    });
    this.props.onLayout && this.props.onLayout(e);
  },
});

module.exports = List;