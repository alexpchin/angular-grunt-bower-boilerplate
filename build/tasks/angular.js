module.exports = function(grunt) {

  // In Gruntfile, the structure of the tasks are:
  //
  // g: {
  //   taskName: directoryLocation,
  // }

  // Example Usage:
  // grunt g:controller --name=mainController

  var makeFile  = require('../helpers/generator.js')(grunt);
  var normalize = require('../helpers/camelCase.js');

  grunt.registerMultiTask('g', 'angular generators', function() {
    if (!grunt.option('name')) {
      var command = 'grunt ' + this.name + ':' + this.target;
      return grunt.warn('Please add a name like this "'+command+' --name=insertNameHere".');
    }

    var target        = this.target;
    var targetFolder  = this.data;
    var targetName    = grunt.option('name');
    var camelCaseName = normalize(targetName);
    var config        = grunt.file.readJSON('./config.json');

    var data = {
      base: config.base,
      targetFolder: targetFolder,
      targetName: targetName
    };

    // Process a Lo-Dash template string.
    // https://lodash.com/docs#template
    var template = '<%= base %>/<%= targetFolder %>/<%= targetName %>.js';
    var filePath = grunt.template.process(template, {data: data});
    
    var fileData = {
      app: config.normAppName,
      name: camelCaseName,
      type: target,
      parent: config.main
    };

    // Use the makeFile helper to create the file
    grunt.file.write(filePath, makeFile(fileData));

    // Some generators need to make another file
    if (target === 'controller'){
      grunt.file.mkdir(config.root + '/views/' + targetName);
    } else if (target === 'directive') {
      grunt.file.write(config.root + '/views/' + targetFolder + '/' + targetName + '.html')
    }

  });
};