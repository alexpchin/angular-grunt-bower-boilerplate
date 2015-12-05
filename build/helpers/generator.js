module.exports = function(grunt) {
  var config   = grunt.file.readJSON('./config.json');
  var template = require("../templates/generic");

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return function(data) {
    data.parent      = data.parent || config.main;
    data.type        = data.type   || '';
    data.name        = data.name   || '';
    data.constructor = capitalize(data.name) || 'MyFunc';
    
    return grunt.template.process(template, { data: data });
  };
};