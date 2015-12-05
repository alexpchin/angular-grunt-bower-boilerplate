(function(){
  'use strict';

  Config.$inject = ['$stateProvider', '$urlRouterProvider']
  function Config($stateProvider, $urlRouterProvider){

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function helper(pair) {
      var splitPair  = pair.split("#");
      var resource   = splitPair[0];
      var action     = splitPair[1];
      var controller = capitalize(resource);
      return {
        url: "/" + action,
        templateUrl: "app/public/views/" + resource + "/" + action + ".html",
        controller: controller + "Controller as " + resource
      }
    }

    $stateProvider
      .state('home',  helper("statics#home"))
      .state('about', helper("statics#about"))
      .state('users', helper("users#users"))

      $urlRouterProvider.otherwise("/");
  }

  this.config(Config);

}).call(require('../app.js'))