(function () {
  'use strict';

  angular
      .module('app')
      .service('app.product.productService', productService);

  productService.$inject = ['app.apiService'];

  function productService(apiService) {
    var service = {
      getListProducts: getListProducts,
      setActiveImage: setActiveImage
    };

    return service;

    function getListProducts() {
      var url = "products";
      return apiService.get(url).promise.then(function (res) {
        _.each(res, function (product) {
          buildProduct(product);
        });
        return res;
      });
      function buildProduct(product) {
        _.each(product.images, function (image) {
          if (image.type === "primary") {
            product.imageDisplay = image;
            image.active = true; 
          }
        });
        product.displayColor = product.colors.join(' ');
        product.displaySize = product.sizes.join(' ');
      }
    } 

    function setActiveImage(product, image) {
      if (product.imageDisplay === image) {
        return;
      }
      _.each(product.images, function (image) {
        image.active = false;
      });
      product.imageDisplay = image;
      image.active = true;

    }
  }
})();