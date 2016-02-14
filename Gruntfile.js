module.exports = function(grunt) {

  var browserifyHelper = require('./build/helpers/browserify.js')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/public/stylesheets/style.css' : 'app/public/stylesheets/**/*.scss'
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'app/public/javascripts/bower.js',
        // dependencies: {
        //   'bootstrap': 'jquery'
        // }
      }
    },
    browserify: {
      dist: {
        files: browserifyHelper('index.js', [
          { path: 'bower.js' },
          { path: '**/*.js' },
          { path: '!index.js' }
        ])
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/public/stylesheets/app.min.css': [
          'app/public/components/**/bootstrap.min.css',
          'app/public/stylesheets/**/*.scss',
          'app/public/stylesheets/**/*.css'
          ]
        }
      }
    },
    watch: {
      files: [
      'app/public/javascripts/**/*.js',
      '!app/public/javascripts/index.js',
      'app/public/stylesheets/**/*.css',
      'build/**/*.js',
      'package.json'
      ],
      css: {
        files: 'app/public/stylesheets/**/*.scss',
        tasks: ['sass']
      },
      tasks: ['default']
    },
    g: {
      config:     'configs',
      controller: 'controllers',
      directive:  'directives',
      factory:    'factories',
      service:    'services',
      provider:   'providers',
      constant:   'constants',
      value:      'values',
      decorator:  'decorators'
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-bower-concat');

  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('build/tasks');
}
