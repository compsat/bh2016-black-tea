'use strict';

var actions = {
  AppActionTypes: {
    INIT: 'APP_INIT',
  },
  NoteActionTypes: {

  },
  APIActionTypes: {
    FETCH_NOTE: 'API_FETCH_NOTE',
    FETCH_NOTES: 'API_FETCH_NOTES',
    SEARCH_NOTES: 'API_SEARCH_NOTES',
    ADD_NOTE: 'API_ADD_NOTE',
    LIKE_NOTE: 'API_LIKE_NOTE',
    SPAM_NOTE: 'API_SPAM_NOTE',
    REGISTER_USER: 'API_REGISTER_USER',
    LOGIN: 'API_LOGIN',
    FETCH_USER: 'API_FECH_USER',
  },
}

module.exports = actions;