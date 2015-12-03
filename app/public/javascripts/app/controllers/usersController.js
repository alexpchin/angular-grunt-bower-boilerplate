(function () {

  'use strict';

  UsersController.$inject = [];
  function UsersController() {
    this.test = "Hello World";
  }
  
  angular
    .module("app")
    .controller('UsersController', UsersController);

})();