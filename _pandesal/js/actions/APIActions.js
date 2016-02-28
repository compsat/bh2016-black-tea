'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var ActionTypes = require('../constants/actions.js').APIActionTypes;

var APIActions = {
  registerUser(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.REGISTER_USER,
      data: data,
    });
  },
  login(data) {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN,
      data: data,
    });
  },
  fetchNotes(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.FETCH_NOTES,
      data: data,
    });
  },
  searchNotes(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SEARCH_NOTES,
      data: data,
    });
  },
  fetchNote(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.FETCH_NOTE,
      data: data,
    });
  },
  fetchUser(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.FETCH_USER,
      data: data,
    });
  },
  addNote(data) {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADD_NOTE,
      data: data
    });
  },
  likeNote(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LIKE_NOTE,
      data: data
    });
  },
  spamNote(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SPAM_NOTE,
      data: data
    });
  },
};

module.exports = APIActions;