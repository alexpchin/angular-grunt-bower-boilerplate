module.exports = function (grunt) {

  // Usage: 
  //
  // grunt start --name=minimal_app --root=otherThanDefault

  grunt.registerTask('config.json', 'create config.json file', function(){
    var camelCase   = require('../helpers/camelCase.js');
    var humanize    = require('../helpers/humanize.js');
    var root        = grunt.option("root")   || 'app/public';
    var appName     = grunt.option("name")   || 'app';
    var name        = humanize(appName)      || 'App';
    var parent      = grunt.option("main")   || "../app.js";
    var router      = grunt.option("router") || 'ui.router';
    var normAppName = camelCase(appName);
    var jsFolder    = root + '/javascripts';
    var base        = jsFolder + '/' + appName;
    var config      = {
                        root: root,
                        base: base,
                        parent: parent,
                        router: router,
                        name: name,
                        appName: normAppName,
                        jsFolder: jsFolder
                      };

    grunt.file.write('./config.json', JSON.stringify(config));
  });

  grunt.registerTask('publicFolders', 'create public folders', function() {
    var root = grunt.option('root') || 'app/public';
    
    grunt.file.mkdir(root + '/components');
    grunt.file.mkdir(root + '/stylesheets');
    grunt.file.mkdir(root + '/stylesheets/scss');
    grunt.file.mkdir(root + '/javascripts');
    grunt.file.mkdir(root + '/images');
    grunt.file.mkdir(root + '/views');
    grunt.file.mkdir(root + '/views/shared');
    grunt.file.mkdir(root + '/views/directives');
  });

  grunt.registerTask('appFolders', 'create angular folders', function() {
    var config = grunt.file.readJSON('./config.json');
    var base = config.base;
    var folders = [
                    "config",
                    "controllers",
                    "models",
                    "services",
                  ]

    folders.forEach(function (folder) {
      grunt.file.mkdir(base + '/' + folder);

      // ! Deprecated
      // Used to use an index.js as a seperate angular.module -> app.controllers
      // var filePath = base + '/' + folder + '/index.js';
      // ! Requires ..helper/generator.js
      // grunt.file.write(filePath, generator({app: normAppName, type: folder, index: true}));
    });
  });

  grunt.registerTask('mainFile', 'create main angular file', function(){
    var config = grunt.file.readJSON('./config.json');
    var tpl    = require('../templates/app.js');
    var data   = { 
                    data: {
                      app: config.appName,
                      router: config.router,
                      jwt: 'angular-jwt'
                    } 
                 }
    var appTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/app.js', appTpl);
  });

  grunt.registerTask('routerFile', 'create router file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require('../templates/router.js');
    var data      = { 
                      data: {
                        root: config.root,
                        router: config.router,
                        parent: config.parent
                      }
                    }
    var routerTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/config/router.js', routerTpl);
  });

  grunt.registerTask('indexFile', 'create a root index.html file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require("../templates/index.html.js");
    var data      = {
                      data: {
                        root: config.root,
                        appName: config.appName,
                        name: config.name
                      }
                    }
    var indexTpl = grunt.template.process(tpl, data);
    grunt.file.write('./index.html', indexTpl);
  });

  grunt.registerTask('headerFile', 'create a header partial', function(){
    var tpl = require('../templates/header.html.js');
    var headerTpl = grunt.template.process(tpl);
    grunt.file.write('app/public/views/shared/header.html', headerTpl);
  });

  grunt.registerTask('footerFile', 'create a footer partial', function(){
    var tpl = require('../templates/footer.html.js');
    var footerTpl = grunt.template.process(tpl);
    grunt.file.write('app/public/views/shared/footer.html', footerTpl);
  });

  grunt.registerTask('style.scss', 'create a style.scss file', function(){
    grunt.file.write('app/public/stylesheets/scss/style.scss');
  });

  grunt.registerTask('staticsController', 'create a Statics Controller', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('grunt g:controller --name=statics', function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
    grunt.file.write('app/public/views/statics/home.html');
  });

  grunt.registerTask('bowerInstall', 'install the frontend dependencies', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('bower install', function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });

  var tasks = [
                'config.json', 
                'publicFolders', 
                'appFolders', 
                'mainFile', 
                'routerFile', 
                'indexFile',
                'headerFile',
                'footerFile',
                'style.scss',
                'staticsController',
                'bowerInstall'
              ]

  grunt.registerTask('start', 'create app and angular folders', tasks);
}
