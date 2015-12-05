module.exports = function (grunt) {
  grunt.registerTask('default', ['clean', 'browserify', 'cssmin', 'watch']);
}