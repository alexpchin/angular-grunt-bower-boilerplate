module.exports = function(grunt) {

  // This task is going to load all of the bower components
  // And all of the javascripts/app files
  // And return an array of all of the filenames
  // So thay grunt-browserify can 
  // Using this so that we can do /**/*.js from our 

  return function(target, dependencies) {
    if (grunt.file.exists('./config.json')) {
      var config      = grunt.file.readJSON('./config.json');
      var bowerConfig = grunt.file.readJSON('./.bowerrc');
      var files       = {};
      var targetPath  = (config.jsFolder + '/' + target);
      
      files[targetPath] = dependencies.map(function(dependency) {
        var prePath = (dependency.component ? bowerConfig.directory : config.jsFolder);
        if (dependency.path.match(/^\!/)) {
          return dependency.path.replace(/^\!/, '!' + prePath + '/');
        } else {
          return prePath + '/' + dependency.path;
        }
      });

      return files;
    }
  };
};