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

var APIStore = {
  notes: {},
  isLogin: false,
  socketConnect() {
    this.ws = new WebSocket(WS_URL);

    this.ws.addEventListener('open', () => {
      if (__DEV__) console.log('Websocket connected');
      this.ws.send(JSON.stringify({
        type: 'connect',
      }));
    });

    this.ws.addEventListener('message', (e) => {
      var data = JSON.parse(e.data);
      if(data.code == 'message') {
        var message = JSON.parse(data.message);
        if (__DEV__) console.log(message);
      }
    });
  },
  registerUser(data) {
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'user/';
      this._fetchWithTimeout('POST', endpoint, data, 5000).then((res) => {
        resolve(res);
      });
    });
  },
  login(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'login/';
      this._fetchWithTimeout('PUT', endpoint, data, 5000).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  },
  fetchNotes(data) {
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'note/';
      console.log(endpoint);
      this._fetchWithTimeout('GET', endpoint).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  },
  searchNotes(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'note/search/' + data;
      this._fetchWithTimeout('GET', endpoint).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  },
  fetchNote(data) {
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'note/' + data.noteId;
      this._fetchWithTimeout('GET', endpoint, data, 5000).then((res) => {
        resolve(res);
      });
    });
  },
  addNote(data) {
    console.log(data);
    data.author = {
      _id: '56d263d8a32148f7e20a0c8d',
      usernmae: 'OligLecnad',
    };
    data.userId = '56d263d8a32148f7e20a0c8d';
    console.log(data);
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'note/';
      console.log(endpoint);
      this._fetchWithTimeout('POST', endpoint, data, 5000).then((res) => {
        console.log(res);
        resolve(res);
      });
      resolve(res);
    });
  },
  likeNote(data) {
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'note/' + data.noteId + '/like';
      this._fetchWithTimeout('PUT', endpoint, data, 5000).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  },
  spamNote(data) {
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'note/' + data.noteId + '/spam';
      this._fetchWithTimeout('PUT', endpoint, data, 5000).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  },
  fetchUser(data) {
    return new Promise((resolve, reject) => {
      var endpoint = API_URL + 'user/' + data.userId;
      this._fetchWithTimeout('GET', endpoint, null, 5000).then((res) => {
        resolve(res);
      });
    });
  },
  _fetch(method, endpoint, data) {
    return new Promise((resolve, reject) => {
      var obj = {
        method: method,
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(data),
      };
      fetch(endpoint, obj).then(r => {
        resolve(JSON.parse(r._bodyText));
      }).catch(c => console.log(c));
    });
  },
  _fetchWithTimeout(method, endpoint, data, time) {
    if (!time) time = 5000;
    return Promise.race([this._fetch(method, endpoint, data), this._delay(time)])
      .then(value => {
        return value;
      }, reason => {
        return {
          code: -1,
          message: 'Couldn\'t connect to server.',
        };
    });
  },
  _delay(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(reject, time);
    });
  },
};

APIStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    // case AppActionTypes.INIT:
    //   console.log('1');
    //   APIStore.fetchNotes().then(res => {
    //     console.log(res);
    //     if (res.code == 0) {
    //       console.log('receive');
    //       APIStore.notes = res.data;
    //     }
    //   });
    //   break;
    // case APIActionTypes.ADD_NOTE:
    //   APIStore.addNote(payload.data).then(res => {
    //   });
    //   break;
    // case APIActionTypes.LIKE_NOTE:
    //   APIStore.likeNote(payload.data).then(res => {
    //   });
    //   break;
    // case APIActionTypes.SPAM_NOTE:
    //   APIStore.spamNote(payload.data).then(res => {
    //   });
    //   break;
    case APIActionTypes.REGISTER_USER:
      APIStore.registerUser(payload.data).then(res => {
      });
      break;
    // case APIActionTypes.LOGIN:
    //   APIStore.login(payload.data).then(res => {
    //     if(res.code == 0) {
    //       APIStore.isLogin = true;
    //     }
    //   });
    //   break;
    // case APIActionTypes.FETCH_USER:
    //   APIStore.fetchUser(payload.data).then(res => {
    //   });
    //   break;
    default:
      break;
  }
});

MicroEvent.mixin(APIStore);
module.exports = APIStore;