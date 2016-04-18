(function() {
'use strict'
  angular
    .module('app',[])
    .factory('shoppingCartController',shoppingCartController);

  /** @ngInject */
  function shoppingCartController($resource) {
    return $resource('http://localhost:8080/shoppingcart/:id', {id: '@_id'}, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });

  }
})();
