'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var ActionTypes = require('../constants/actions.js').AppActionTypes;

var AppActions = {
  initialize(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.INIT,
      data: data,
    });
  },
};

module.exports = AppActions;