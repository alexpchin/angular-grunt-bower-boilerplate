module.exports = function(grunt) {
  var config = grunt.file.readJSON('./config.json');

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return function(data) {
    data.parent      = data.parent || config.main;
    data.type        = data.type   || '';
    data.name        = data.name   || '';
    data.constructor = capitalize(data.name) || 'MyFunc';

    var template = '(function() {\n' +
                   '  \'use strict\';\n\n' +
                   '  <%= constructor %>.$inject = [];\n' +
                   '  function <%= constructor %>() {\n' +
                   '  }\n\n' + 
                   '  this.<%= type %>(\'<%= name %>\', <%= constructor %>);\n' +
                   '}).call(require(\'<%= parent %>\'));'

    return grunt.template.process(template, { data: data });
  };
};