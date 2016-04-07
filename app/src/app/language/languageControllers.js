(function() {
'use strict';
  angular
    .module('app')
    .controller('languageController',languageController);

  /** @ngInject */
    function languageController($scope,$translate,$location,$locale){
    var currentLocal = $locale.id.substring(0,2);

    $scope.currentLocale = currentLocal;
    $location.search('lang',locale);
    $scope.currentLocale=locale;

  };


})();
