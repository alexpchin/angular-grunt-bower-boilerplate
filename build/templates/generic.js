var tpl = '(function() {\n' +
          '  \'use strict\';\n\n' +
          '  <%= constructor %>.$inject = [];\n' +
          '  function <%= constructor %>() {\n' +
          '  }\n\n' + 
          '  this.<%= type %>(\'<%= name %>\', <%= constructor %>);\n' +
          '}).call(require(\'<%= parent %>\'));'

module.exports = tpl;