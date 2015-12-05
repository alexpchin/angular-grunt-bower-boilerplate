module.exports = function(appName) {
  return appName.split("_").map(function(word){
    capitalize(word)
  }).join(" "); 
}