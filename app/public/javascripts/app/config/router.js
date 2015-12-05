(function(){
  'use strict';

  Router.$inject = ['$stateProvider', '$urlRouterProvider']
  function Router($stateProvider, $urlRouterProvider){

    function helper(pair) {
      var splitPair  = pair.split('#');
      var resource   = splitPair[0];
      var action     = splitPair[1];

      return {
        url: '/' + action,
        templateUrl: 'app/public/views/' + resource + '/' + action + '.html',
        controller: resource + 'Controller as ' + resource
      }
    }

    $stateProvider
      .state('home',  helper('examples#action'))

      $urlRouterProvider.otherwise('/');
  }

  this.config(Router);
}).call(require('./app.js'));