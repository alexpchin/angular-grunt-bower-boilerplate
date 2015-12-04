(function(){
  'use strict';

  var values = {};

  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      this.value(key, values[key]);
    }
  }

}).call(require('../app.js'))