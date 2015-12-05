(function(){
  'use strict';

  httpInterceptor.$inject = ["$httpProvider"];
  function httpInterceptor($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  }

  this.config(httpInterceptor);
}).call(require('../app.js'))