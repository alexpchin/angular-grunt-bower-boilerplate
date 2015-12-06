module.exports = function(grunt) {
  'use strict';

  // Usage:
  // grunt auth --url=http://localhost:3000

  grunt.registerTask('authUrl', 'create httpProvider file', function(){
    var API = grunt.option("url") || 'API';
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('grunt g:constant --name=api --key=API --value=' + API + ' --type=string', function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  })

  grunt.registerTask('tokenService', 'create tokenService file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require('../templates/tokenService.js');
    var data      = { 
                      data: {
                        nameType: "tokenService",
                        constructor: "TokenService",
                        parent: config.parent
                      }
                    };
    var tokenServiceTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/services/tokenService.js', tokenServiceTpl);
  });

  grunt.registerTask('authFactory', 'create authFactory file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require('../templates/authFactory.js');
    var data      = { 
                      data: {
                        nameType: "authFactory",
                        constructor: "AuthFactory",
                        parent: config.parent
                      }
                    };
    var authFactoryTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/factories/authFactory.js', authFactoryTpl);
  });

  grunt.registerTask('authFactory', 'create authFactory file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require('../templates/authFactory.js');
    var data      = { 
                      data: {
                        nameType: "authFactory",
                        constructor: "AuthFactory",
                        parent: config.parent
                      }
                    };
    var authFactoryTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/factories/authFactory.js', authFactoryTpl);
  });

  grunt.registerTask('httpProvider', 'create httpProvider file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require('../templates/httpProvider.js');
    var data      = { 
                      data: {
                        nameType: "httpProvider",
                        constructor: "httpProvider",
                        parent: config.parent
                      }
                    };
    var httpProviderTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/providers/httpProvider.js', httpProviderTpl);
  });

  var tasks = [
                'tokenService',
                'authFactory',
                'httpProvider',
                'authUrl'
              ]

  grunt.registerTask('auth', 'setup default authentication', tasks);

}