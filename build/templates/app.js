var tpl = "(function() {\n" +
          "  'use strict';\n\n" +
          "  var dependencies = [\n" +
          "    '<%= router %>',\n" +
          "    '<%= jwt %>'\n" +
          "  ];\n\n" +
          "  module.exports = angular.module('<%= app %>', dependencies);\n" +
          "})();";

module.exports = tpl;