'use strict';

var React = require('react-native');

var {
  View,
  TextInput,
  TouchableHighlight,
  Text,
} = React;

var Mapbox = require('react-native-mapbox-gl');

var {
  width,
  height,
} = require('../modules/Dimensions.js');

var {
  GOOGLE_KEY,
  MAPBOX_KEY,
} = require('../constants/app.js');

var TouchableIcon = require('../components/TouchableIcon.js');

var LocationPicker = React.createClass({
  mixins: [Mapbox.Mixin],
  getInitialState() {
    return {
      typing: false,
      current: null,
      suggestions: [{
        name: 'Current Location',
        place_id: 'current',
      }],
    };
  },
  componentWillUnmount() {
    this._fetchGoogleSuggestionsPromise.cancel();
    this._fetchGoogleLocationPromise.cancel();
    this._fetchGoogleSuggestionsPromise = null;
    this._fetchGoogleLocationPromise = null;
  },
  render() {
    return (
      <View>
        <View
          style={{
            width: width - 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInput
            ref='input'
            style={{
              flex: 1,
              height: 40,
              margin: 16,
              fontFamily: 'Roboto-Regular',
              fontSize: 14,
            }}
            placeholder='Enter location here'
            defaultValue={this.state.current && this.state.current.name}
            onFocus={() => this.setState({typing: true})}
            onChangeText={c => this._autocomplete(c)}
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
          />
          <TouchableIcon
            iconName='close'
            iconColor='rgba(0,0,0,0.87)'
            style={{
              width: 40,
              height: 40,
              marginRight: 8,
            }}
            onPress={this._onClear}
          />
        </View>
        <View
          style={{
            width: width - 16,
            height: width - 100 - 48,
          }}
        >
          <Mapbox
            ref='map'
            style={{
              flex: 1
            }}
            accessToken={MAPBOX_KEY}
            zoomLevel={this.props.zoomLevel}
            centerCoordinate={this.props.centerCoordinate ? this.props.centerCoordinate : {latitude: 13, longitude: 122}}
            styleURL={this.mapStyles.emerald}
            annotations={this.state.current && this.state.current.location ? [{
              coordinates: [this.state.current.location.lat, this.state.current.location.lng],
              type: 'point',
              id: 'pointer',
            }] : null}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 72 + (this.state.typing ? 0 : height),
            left: 0,
            width: width - 16,
            opacity: this.state.typing ? 1 : 0,
          }}
        >
          {this.state && this.state.suggestions.map(v => {
            return (
              <TouchableHighlight
                underlayColor='rgba(0,0,0,0.12)'
                onPress={() => this._select(v)}
              >
                <View style={{
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                  height: 48,
                  backgroundColor: '#FAFAFA',
                }}>
                  <Text style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.87)',
                  }}>
                    {v.name}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
    );
  },
  _fetchGoogleSuggestionsPromise: null,
  _fetchGoogleLocationPromise: null,
  _onClear() {
    this.refs.input.clear();
    if (this.state.typing) {
      this.setState({
        typing: true,
        suggestions: [{
          name: 'Current Location',
          place_id: 'current',
        }],
      });
    }
  },
  _autocomplete(query) {
    if(query == '') {
      this.setState({
        typing: true,
        suggestions: [{
          name: 'Current Location',
          place_id: 'current',
        }],
      });
      return;
    }
    if(!this.state.typing) this.setState({typing: true});
    if(query.length <= 2) return;

    var fetchPromise = new Promise((resolve, reject) => {
      fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=' + GOOGLE_KEY + '&components=country:ph&input='
        + query, {method: 'GET'}).then(res => {
        var ans = JSON.parse(res._bodyText);
        resolve(ans);
      });
    });

    this._fetchGoogleSuggestionsPromise = makeCancelable(fetchPromise);

    this._fetchGoogleSuggestionsPromise
      .promise
      .then(res => {
        if (__DEV__) console.log(res);
        var first = [];
        res.predictions.map((v, i) => {
          if(i > 2) return;
          else first.push({
            name: v.description,
            place_id: v.place_id,
          });
        });
        if (__DEV__) console.log(first);
        first.length > 0 && this.setState({
          suggestions: first,
        });
      })
      .catch();

  },
  _select(location) {
    this.state.typing = false;
    this.setState({
      current: location,
    }, () => {
      var fetchPromise = new Promise((resolve, reject) => {
        var ans = {name: location.name};
        if(location.place_id == 'current') {
          navigator.geolocation.getCurrentPosition(
            position => {
              ans.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
             
              var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.current.location.lat + ',' + this.state.current.location.lng + '&key=' + GOOGLE_KEY;
              fetch(url).then((res) => {
                var locName = JSON.parse(res._bodyText).results[0].formatted_address;
                if (__DEV__) console.log(locName);
                ans.name = locName;
                resolve(ans);
              });

            },
            error => {
              ans.error = true;
              resolve(ans);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
        } else {
          fetch('https://maps.googleapis.com/maps/api/place/details/json?key=' + GOOGLE_KEY + '&placeid='
            + location.place_id, {method: 'GET'}).then(res => {
            if (__DEV__) console.log(res);
            var body = JSON.parse(res._bodyText);
            ans.location = body.result.geometry.location;
            resolve(ans);
          });
        }
      });

      this._fetchGoogleLocationPromise = makeCancelable(fetchPromise);

      this._fetchGoogleLocationPromise
        .promise
        .then(res => {
          if (__DEV__) console.log(res);
          
          if (res.error) {
            this.refs.input && this.refs.input.setNativeProps({text: 'Location not found'});
            return;
          }

          this.setCenterCoordinateZoomLevelAnimated('map', res.location.lat, res.location.lng, 15.0);
          this.setState({
            current: res,
          }, () => {
            this.props.onSelect && this.props.onSelect(res);
          });
        })
        .catch();
    });
  },
});

const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  return {
    promise: new Promise(
      (resolve, reject) => promise
        .then(r => hasCanceled_
          ? reject({isCanceled: true})
          : resolve(r)
        )
    ),
    cancel() {
      hasCanceled_ = true;
    },
  };
};

module.exports = LocationPicker;

