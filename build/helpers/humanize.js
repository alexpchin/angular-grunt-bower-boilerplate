module.exports = function(appName) {
  var capitalize = require("./capitalize");
  return appName.split("_").map(function(word){
    capitalize(word)
  }).join(" "); 
}