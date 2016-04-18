(function() {
'use strict';

  angular
    .module('app',[])
    .controller('addProductController',addProductController)
    .controller('editProductController',editProductController)
    .controller('listProductController',listProductController);

  /** @ngInject */
    function addProductController ($scope, $http, $location, $rootScope,productService) {
    var vm = this;
        vm.product = {};
        vm.addPerson = true;
        vm.editPerson = false;
            vm.addProduct = function (flowFiles) {
                productService.save(vm.product, function (data) {
                  var productid = data.id;
                  flowFiles.opts.target = 'http://localhost:8080/productImage/add';
                  flowFiles.opts.testChunks = false;
                  flowFiles.opts.query = {productid: productid};
                  flowFiles.upload();
                });
                $rootScope.addSuccess = true;
                $location.path("listProduct");
              };
        }


    /** @ngInject */
    function editProductController($scope, $http, $routeParams, $location, $rootScope, productService) {
      var vm = this;
      vm.addPerson = false;
      vm.editPerson = true;
      var id = $routeParams.id;
      $http.get("/product/" + id).success(function (data) {
        vm.product = data;
      });

      vm.editProduct = function () {
        //$http.put("/product", $scope.product).then(function () {
        productService.update({id: vm.product.id}, vm.product, function () {
          $rootScope.editSuccess = true;
          $location.path("listProduct");
        });
      }
    }

    /** @ngInject */
    function listProductController ($scope,$rootScope,productService,$route,queryProductService) {

      var vm = this;
      //$http.get("/product/").success(function (data) {
      vm.queryPromise = productService.query(function (data) {
        // $scope.totalNetPrice= totalCalService.getTotalNetPrice(data);
        vm.products = data;
      }).$promise;


      $scope.$on('$locationChangeStart', function () {
        $rootScope.addSuccess = false;
        $rootScope.editSuccess = false;
        $rootScope.deleteSuccess = false;
      });

      vm.deleteProduct = function (id) {
        var answer = confirm("Do you want to delete the product?");
        if (answer) {
          productService.delete({id: id}, function () {
            $rootScope.deleteSuccess = true;
            $route.reload();
          })
        }
      }

      vm.searchProduct = function (name) {
        queryProductService.query({name: name}, function (data) {
          vm.products = data;
        });
      }



        /*$scope.addPerson = false;
        $scope.editPerson = true;

        var id = $routeParams.id;
        $http.get("/product/" + id).success(function (data) {
            $scope.product = data;
        });

        $scope.editProduct = function () {
            //$http.put("/product", $scope.product).then(function () {
            productService.update({id:$scope.product.id},$scope.product,function(){
                $rootScope.editSuccess = true;
                $location.path("listProduct");
            });
        }*/
    }
})();
