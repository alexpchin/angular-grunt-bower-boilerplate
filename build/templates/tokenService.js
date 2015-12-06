var tpl = "(function(){\n" +
          "  'use strict';\n\n" +
          "  <%= constructor %>.$inject = ['$window', 'jwtHelper'];\n" +
          "  function <%= constructor %>($window, jwtHelper){\n\n" +
          "    var self = this;\n\n" +
          "    self.saveToken = function(token) {\n" +
          "      return $window.localStorage.setItem('token', token);\n" +
          "    }\n\n" +
          "    self.getToken = function(){\n" +
          "      return $window.localStorage.getItem('token');\n" +
          "    }\n\n" +
          "    self.removeToken = function(){\n" +
          "      return $window.localStorage.removeItem('token');\n" +
          "    }\n\n" +
          "    self.decodeToken = function(){\n" +
          "      var token = self.getToken();\n" +
          "      return token ? jwtHelper.decodeToken(token) : {};\n" +
          "    }\n\n" +
          "  }\n\n" +
          "  this.service('<%= nameType %>', <%= constructor %>);\n" +
          "}).call(require('<%= parent %>'));"

module.exports = tpl;