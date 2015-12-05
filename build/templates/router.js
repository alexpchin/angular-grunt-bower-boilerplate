var tpl = "(function(){\n" +
          "  'use strict';\n\n" +
          "  Router.$inject = ['$stateProvider', '$urlRouterProvider']\n" +
          "  function Router($stateProvider, $urlRouterProvider){\n\n" +
          "    function helper(pair) {\n"+
          "      var splitPair  = pair.split('#');\n"+
          "      var resource   = splitPair[0];\n" +
          "      var action     = splitPair[1];\n\n" +
          "      return {\n" +
          "        url: '/' + action,\n" +
          "        templateUrl: '<%= root %>views/' + resource + '/' + action + '.html',\n"+
          "        controller: resource + 'Controller as ' + resource\n" +
          "      }\n" +
          "    }\n\n" +
          "    $stateProvider\n" +
          "      .state('home',  helper('examples#action'))\n\n" +
          "      $urlRouterProvider.otherwise('/'');\n" +
          "  }\n\n"+
          "  this.config(Router);\n" +
          "}).call(require(<%= parent %>));"

module.exports = tpl;