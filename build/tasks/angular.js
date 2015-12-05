module.exports = function(grunt) {

  // In Gruntfile, the structure of the tasks are:
  //
  // g: {
  //   this.target: this.data,
  // }

  // Example Usage:
  // grunt g:controller --name=mainController

  var camelCase  = require('../helpers/camelCase.js');
  var capitalize = require('../helpers/capitalize.js');

  grunt.registerMultiTask('g', 'angular generators', function() {
    if (!grunt.option('name')) {
      var command = 'grunt ' + this.name + ':' + this.target;
      return grunt.warn('Please add a name like this "'+command+' --name=insertNameHere".');
    }

    var type = this.target;

    if (type === "constant") {
      return grunt.warn('Constant not implemented yet...');
    } else if (type === "value") {
      return grunt.warn('Value not implemented yet...');
    }

    var typeFolder    = this.data;
    var typeCaps      = capitalize(type);
    var name          = grunt.option('name');
    var camelCaseName = camelCase(name);
    var config        = grunt.file.readJSON('./config.json');

    // Setup template data
    var data          = {};
    data.name         = camelCaseName;
    data.type         = type;
    data.constructor  = capitalize(data.name) || 'ConstructorFunc';
    data.app          = config.appName;
    data.parent       = config.parent;

    // Make template
    var tpl           = require("../templates/generic");
    var fileTpl       = grunt.template.process(tpl, { data: data });
    var filePath      = config.base + "/" + typeFolder + "/" + name + typeCaps + ".js";
    grunt.file.write(filePath, fileTpl);

    // Some generators need to make another file
    if (type === 'controller'){
      grunt.file.mkdir(config.root + '/views/' + name);
    } else if (type === 'directive') {
      grunt.file.write(config.root + '/views/' + typeFolder + '/' + name + '.html')
    }

  });
};