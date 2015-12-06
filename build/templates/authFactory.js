var tpl = "(function(){\n" +
          "  'use strict';\n\n" +
          "  AuthFactory.$inject = ['API', 'tokenService'];\n" +
          "  function AuthFactory(API, tokenService) {\n\n" +
          "    return {\n" +
          "      request: function(config){\n" +
          "        var token = tokenService.getToken();\n\n" +
          "        if (config.url.indexOf(API) === 0 && token) {\n" +
          "          config.headers.Authorization = 'Bearer ' + token;\n" +
          "        }\n" +
          "        return config;\n" +
          "      },\n\n" +
          "      response: function(res){\n" +
          "        if (res.config.url.indexOf(API) === 0 && res.data.token) {\n" +
          "          tokenService.saveToken(res.data.token);\n" +
          "        }\n" +
          "        return res;\n" +
          "      }\n" +
          "    }\n" +
          "  };\n\n" +
          "  this.factory('authFactory', AuthFactory);\n" +
          "}).call(require('<%= parent %>'));"

module.exports = tpl;