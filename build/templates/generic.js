module.exports = function(data){
  var tpl;  
  if (data.type === 'constant' || data.type === 'value' ) {
  tpl = "(function() {\n" +
        "  'use strict';\n\n" +
        "  this.<%= type %>('<%= key %>', '<%= value %>');\n" +
        "}).call(require('<%= parent %>'));";
  } else {
  tpl = "(function() {\n" +
        "  'use strict';\n\n" +
        "  <%= constructor %>.$inject = [];\n" +
        "  function <%= constructor %>() {\n" +
        "  }\n\n" +
        "  this.<%= type %>('<%= name %>', <%= constructor %>);\n" +
        "}).call(require('<%= parent %>'));";
  }
  return tpl;
}