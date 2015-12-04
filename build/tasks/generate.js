module.exports = function (grunt) {

  var makeFile = require('../helpers/make_file.js')(grunt);
  var normalize = require('../helpers/normalize.js');

  grunt.registerMultiTask('gen', 'create an angular controller', function () {
    var target = this.target;
    var targetFldr = this.data;
    var targetName = grunt.option('name');
    var normTargetName = normalize(targetName);
    var config = grunt.file.readJSON('./config.json');

    var data = {
      base: config.base,
      targetFldr: targetFldr,
      targetName: targetName
    };
    var fileData = {
      app: config.normAppName,
      name: normTargetName, 
      parent: './index.js',
      type: 'controller'
    };

    var filePath = grunt.template.process('<%= base %>/<%= targetFldr %>/<%= targetName %>.js', {data: data});
    
    grunt.file.write(filePath, makeFile(fileData));
    if (target === 'controller'){
      grunt.file.mkdir(config.root + '/views/' + targetName);
    } else if (target === 'directive') {
      grunt.file.write(config.root + '/views/' + targetName + '.html')
    }

  });
};