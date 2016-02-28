'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var MicroEvent = require('./microevent.js');
var {
  API_URL,
  WS_URL,
} = require('../constants/app.js');

var {
  AppActionTypes,
  NoteActionTypes,
  APIActionTypes,
} = require('../constants/actions.js');

var APIStore = require('./APIStore.js');
var AppStore = require('./AppStore.js');

var NoteStore = {
  notes: [],
  viwedNoteIndex: -1,
  getNotes() {
    return this.notes;
  },
  getNote(data) {
    // filter
    var index = -1;
    this.notes.forEach((v, i) => {
      if(v._id == data)
        index = i;
    });
    return this.notes[index];
  },
  getNoteFromIndex(index) {
    console.log(index);
    return this.notes[index];
  },
  merge(data) {
    console.log(data);
    var mask = data.notes.map(v => v._id);
    var temp = this.notes.filter(v => {
      if (mask.contains(v._id)) return false;
      else return true;
    });
    this.notes = temp.concat(data.notes);
    console.log(this.notes);
  }
};

NoteStore.dispatchToken = AppDispatcher.register(function(payload) {
  // AppDispatcher.waitFor([APIStore.dispatchToken]);
  // console.log('a');
  switch(payload.actionType) {
    case AppActionTypes.INIT:
      APIStore.fetchNotes().then(res => {
        if (res.code == 0) {
          NoteStore.merge(res.data);  
        }
      });
    case APIActionTypes.ADD_NOTE:
      APIStore.addNote(payload.data).then(res => {
      });
      break;
    case APIActionTypes.SEARCH_NOTES:
      APIStore.searchNotes(payload.data).then(res => {
        if(res.code == 0) {
          console.log(res);
          NoteStore.notes = res.data.notes;
          console.log(NoteStore.notes);
          NoteStore.trigger('update-notes')
        }
      });
      break;
    case APIActionTypes.LIKE_NOTE:
      APIStore.likeNote(payload.data).then(res => {
      });
      break;
    case APIActionTypes.SPAM_NOTE:
      AppStore.spamNote(payload.data).then(res => {
      });
      break;
    default:
      break;
  }
});

MicroEvent.mixin(NoteStore);
module.exports = NoteStore;