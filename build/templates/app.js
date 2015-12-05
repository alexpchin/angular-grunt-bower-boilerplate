var tpl = "(function() {\n" +
          "  'use strict';\n\n" +
          "  var dependencies = [\n" +
          "   '<%= router %>'\n" +
          "  ];\n\n" +
          "  module.exports = angular.module('<%= app %>', []);\n" +
          "})();";

module.exports = tpl;