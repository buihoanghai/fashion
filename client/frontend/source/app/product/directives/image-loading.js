(function () {
  'use strict';

  angular
      .module('app')
      .directive('imageLoading', imageLoading);

  imageLoading.$inject = ['$parse'];

  function imageLoading($parse) {

    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      var IMAGE_NOT_FOUND = '/assets/img/image-not-found.<%=version%>.jpg';
      scope.$watch(attrs.imageLoading, load);
      function load() {
        element[0].src = '';
        var url = $parse(attrs.imageLoading)(scope);
        var downloadingImage = new Image();
        downloadingImage.onload = function () {
          element[0].src = this.src;
        };
        downloadingImage.onerror = function () {
          element[0].src = IMAGE_NOT_FOUND;
        };
        downloadingImage.src = url;
      }

    }
  }

})();