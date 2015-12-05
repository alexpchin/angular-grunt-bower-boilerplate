module.exports = function (grunt) {
  grunt.registerTask('clean', 'remove compiled files', function() {
    grunt.file.delete('app/public/javascripts/index.js');
    grunt.file.delete('app/public/stylesheets/app.min.css');
  });
}