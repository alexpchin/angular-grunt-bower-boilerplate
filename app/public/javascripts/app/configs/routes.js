(function(){
  'use strict';

  Config.$inject = ['$stateProvider', '$urlRouterProvider']
  function Config($stateProvider, $urlRouterProvider){

    function helper(pair) {
      var splitPair  = pair.split("#");
      var resource   = splitPair[0];
      var action     = splitPair[1];

      return {
        url: "/" + action,
        templateUrl: "app/public/views/" + resource + "/" + action + ".html",
        controller: resource + "Controller as " + resource
      }
    }

    $stateProvider
      .state('home',  helper("statics#home"))
      .state('about', helper("statics#about"))
      .state('users', helper("users#users"))

      $urlRouterProvider.otherwise("/");
  }

  this.config(Config);

}).call(require('../app.js'));