'use strict';

var AppStore = require('../stores/AppStore.js');

var validator = (obj, arr) => {
  var total = true;
  for (var i = 0; i < arr.length; i++) {
    var check;
    var text;
    if (typeof arr[i] == 'object') {
      check = arr[i].check;
      text = arr[i].name;
    } else {
      check = arr[i];
      text = arr[i];
    }

    if (!obj[check]) {
      // var article = text.startsWith('a')
      //               || text.startsWith('e')
      //               || text.startsWith('i')
      //               || text.startsWith('o')
      //               || text.startsWith('u')
      //               ? 'an' : 'a';
      AppStore.getNavigator().alert({
        mode: 'dialog',
        string: 'Please input a valid ' + text + '.',
        buttons: 'ok',
      });
      return false;
    }
  };
  return true;
};

module.exports = validator;