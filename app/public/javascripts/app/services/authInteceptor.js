(function(){
  'use strict';

  AuthInterceptor.$inject = ["API", "tokenService"];
  function AuthInterceptor(API, tokenService) {

    return {
      request: function(config){
        var token = tokenService.getToken();

        if (config.url.indexOf(API) === 0 && token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },

      response: function(res){
        if (res.config.url.indexOf(API) === 0 && res.data.token) {
          tokenService.saveToken(res.data.token);
        }
        return res;
      }
    }
  };

  this.factory('authInterceptor', AuthInterceptor);

}).call(require('../app.js'));