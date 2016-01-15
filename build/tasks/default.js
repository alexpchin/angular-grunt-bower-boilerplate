module.exports = function (grunt) {
  grunt.registerTask('default', ['clean', 'bower_concat', 'browserify', 'cssmin', 'watch']);
}