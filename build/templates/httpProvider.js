var tpl = "(function(){\n" +
          "  'use strict';\n\n" +
          "  httpProvider.$inject = ['$httpProvider'];\n" +
          "  function httpProvider($httpProvider) {\n" +
          "    $httpProvider.interceptors.push('authFactory')\n" +
          "  }\n\n" +
          "  this.config(httpProvider);\n" +
          "}).call(require('<%= parent %>'))";

module.exports = tpl;