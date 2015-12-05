var tpl = "(function(){\n" +
          "  'use strict';\n\n" +
          "  var <%= type %>s = {\n" +
          "  };\n\n" +
          "  for (var key in <%= type %>s) {\n" +
          "    if (<%= type %>s.hasOwnProperty(key)) {\n" +
          "      this.<%= type %>(key, <%= type %>s[key]);\n" +
          "    }\n" +
          "  }\n" +
          "}).call(require('<%= parent %>'));"

module.exports = tpl;