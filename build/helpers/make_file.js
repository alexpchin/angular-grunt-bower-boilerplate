module.exports = function (grunt) {
  return function (data) {
    data.parent = data.parent || '../app.js';
    data.type   = data.type   || '';
    data.name   = data.name   || '';
    return grunt.template.process(
                                  '(function () {\n' +
                                  '  \'use strict\';\n' +
                                    (data.index ? 
                                      '  this.<%= type %> = angular.module(\'<%= app %>.<%= type %>\', []);\n' + 
                                      '  module.exports = this.<%= type %>;\n' : 
                                      '  this.<%= type %>(<% if(name !== \'\'){ %>\'<%= name %>\', <% }%>[])\n') + 
                                  '}).call(require(\'<%= parent %>\'));',
                                  { data: data }
                                );
  };
};