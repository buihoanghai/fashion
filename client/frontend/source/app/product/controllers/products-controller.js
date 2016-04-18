(function () {
  'use strict';
  productsController.$inject = [
    'app.product.productService'
  ];
  angular.module('app.product').controller('app.product.productsController', productsController);
  function productsController(productService) {
    var vm = this;
    //asign function
    vm.setActiveImage = setActiveImage;

    activate();

    function activate() {
      getListProducts();
    }
    function getListProducts() {
      productService.getListProducts().then(function (res) {
        vm.products = res;
      });
    }
    function setActiveImage(product, image) {
      productService.setActiveImage(product, image);
    }
  }
})();
