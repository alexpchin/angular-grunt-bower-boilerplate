(function () {

  'use strict';

  MainController.$inject = [];
  function MainController() {
    this.test = "Hello World";
  }
  
  angular
    .module("app")
    .controller('MainController', MainController);

})();