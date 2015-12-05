// Converts lower_snakecase to camelCase

module.exports = function(name) {
  return name.replace(/\_([a-zA-Z])/g, function(match, letter) {
    return letter.toUpperCase();
  }); 
};