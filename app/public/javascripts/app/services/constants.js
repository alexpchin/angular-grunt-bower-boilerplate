(function(){
  'use strict';

  var constants = {
  };

  for (var key in constants) {
    if (constants.hasOwnProperty(key)) {
      this.constant(key, constants[key]);
    }
  }
}).call(require('./app.js'));