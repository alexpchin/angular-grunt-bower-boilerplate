module.exports = function(grunt) {

  var browserifyFiles = require('./build/helpers/browserify.js')(grunt);
  var config = grunt.file.exists('./config.json') ? grunt.file.readJSON('./config.json') : {};

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/public/stylesheets/style.css' : 'app/public/stylesheets/**/*.scss'
        }
      }
    },
    browserify: {
      dist: {
        files: browserifyFiles('index.js', [
          { path: 'angular/angular.js', component: true},
          { path: 'angular-route/angular-route.js', component: true},
          { path: 'jquery/dist/jquery.js', component: true},
          { path: '**/*.js' },
          { path: '!index.js' }
        ])
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/public/stylesheets/app.min.css': [
          'app/public/stylesheets/**/*.css'
          ]
        }
      }
    },
    watch: {
      files: [
      'app/public/javascripts/**/*.js',
      '!app/public/javascripts/index.js',
      'app/public/stylesheets/**/*.css'
      ],
      css: {
        files: 'app/public/stylesheets/**/*.scss',
        tasks: ['sass']
      },
      tasks: ['default']
    }
  });

  require('load-grunt-tasks')(grunt, {
    pattern: 'grunt-*',
    scope: 'devDependencies'
  });

  grunt.registerTask('clean', 'remove compiled files', function () {
    grunt.file.delete('app/public/javascripts/index.js');
    grunt.file.delete('app/public/stylesheets/app.min.css');
  });

  grunt.loadTasks('build/tasks');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['clean', 'browserify', 'cssmin', 'watch']);

}
