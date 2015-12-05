module.exports = function (grunt) {

  var makeFile = require('../helpers/make_file.js')(grunt);

  var makeApp = function(normAppName) {
    return grunt.template.process(
      '(function () {\n' +
      '  \'use strict\';\n\n' +
      '  var dependencies = [' +
      ' \'ui.router\',' +
      ' \'ngResource\',' +
      ' \'angular-jwt\',' +
      '  ];\n\n' +
      '  module.exports = angular.module(\'<%= app %>\', []);\n\n' +
      '})();',
    { data: {app: normAppName} }
    );
  };

  grunt.registerTask('publicFolders', 'create project public folders', function() {
    var root     = grunt.option('root') || 'app/public';
    var jsFolder = root + '/javascripts';
    var config   = {
                     root: root,
                     jsFolder: jsFolder
                   };
    grunt.file.write('./config.json', JSON.stringify(config));
    grunt.file.mkdir(root + '/components');
    grunt.file.mkdir(root + '/stylesheets');
    grunt.file.mkdir(root + '/javascripts');
    grunt.file.mkdir(root + '/images');
    grunt.file.mkdir(root + '/views');
    grunt.file.mkdir(root + '/views/shared');
    grunt.file.mkdir(root + '/views/directives');
    grunt.file.mkdir(root + '/views/main');
  });

  grunt.registerTask('appFolders', 'create angular folders', function() {
    var normalize   = require('../helpers/normalize.js');
    var appName     = grunt.option("name") || 'app';
    var normAppName = normalize(appName);
    var config      = grunt.file.readJSON('./config.json');
    var base        = config.jsFolder + '/' + appName;

    config.appName     = appName;
    config.normAppName = normAppName;
    config.base        = base;

    grunt.file.write('./config.json', JSON.stringify(config));
    grunt.file.write(base + '/app.js', makeApp(normAppName));
    grunt.file.write(base + '/router.js', makeFile({app: normAppName, parent: './app.js', type: 'config'}));

    var folders = [
                    "config",
                    "constants",
                    "controllers",
                    "directives",
                    "factories",
                    "models",
                    "services",
                    "values"
                  ]

    folders.forEach(function (folder) {
      grunt.file.mkdir(base + '/' + folder);
      var filePath = base + '/' + folder + '/index.js';

      grunt.file.write(filePath, makeFile({app: normAppName, type: folder, index: true}));
    });

    grunt.file.write(base + '/controllers/main.js', makeFile({app: normAppName, parent: './index.js', name: 'main', type: 'controller'}));
  });

  grunt.registerTask('setupApp', 'create app and angular folders', ['publicFolders', 'appFolders']);
}
