module.exports = function(grunt) {
  var config     = grunt.file.readJSON('./config.json');
  var template   = require("../templates/generic");
  var capitalize = require("./capitalize");

  return function(data) {
    data.parent      = data.parent || config.main;
    data.type        = data.type   || '';
    data.name        = data.name   || '';
    data.constructor = capitalize(data.name) || 'MyFunc';
    
    // Process a Lo-Dash template string.
    // https://lodash.com/docs#template
    return grunt.template.process(template, { data: data });
  };
};