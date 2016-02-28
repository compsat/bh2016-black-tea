'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var MicroEvent = require('./microevent.js');
var {
  API_URL,
  WS_URL,
} = require('../constants/app.js');

var {
  AppActionTypes,
  APIActionTypes,
  NoteActionTypes,
} = require('../constants/actions.js');

var APIStore = require('./APIStore.js');
var NoteStore = require('./NoteStore.js');

var AppStore = {
  navigator: null,
  drawer: null,
  session: null,
  ws: null,
  isLogin: false,
  getNavigator() {
    return this.navigator || {};
  },
  getDrawer() {
    return this.drawer || {};
  },
};

AppStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case AppActionTypes.INIT:
      AppStore.navigator = payload.data.navigator;
      AppStore.drawer = payload.data.drawer;
    case APIActionTypes.LOGIN:
      APIStore.login(payload.data).then(res => {
        if(res.code == 0) {
          AppStore.isLogin = true;
          AppStore.navigator.pop();
        }
      });
      break;
    default:
      break;
  }
});

MicroEvent.mixin(AppStore);
module.exports = AppStore;