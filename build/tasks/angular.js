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
    var type = this.target;

    if (type === "constant" || type === "value") {
      var key   = grunt.option('key');
      var value = grunt.option('value');
    }

    var typeFolder    = this.data;
    var typeCaps      = capitalize(type);
    var name          = grunt.option('name');
    if (name) {
      var camelCaseName = camelCase(name);
      var constructor   = capitalize(name)
    }
    var config        = grunt.file.readJSON('./config.json');

    // Setup template data
    var data          = {};
    data.name         = camelCaseName;
    data.type         = type;
    data.constructor  = constructor || 'ConstructorFunc';
    data.app          = config.appName;
    data.parent       = config.parent;
    if (key) data.key = key;  
    if (value) data.value = value;

    // Make template
    var tpl           = require("../templates/generic")(data);
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