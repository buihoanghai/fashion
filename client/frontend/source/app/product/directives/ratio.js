(function () {
  'use strict';

  angular
      .module('app.product')
      .directive('ratio', ratio);

  ratio.$inject = [];

  function ratio() {
    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      var ratio = parseFloat(attrs.ratio);
      scope.$on("window-resized", calculateHeight);
      calculateHeight();
      function calculateHeight() {
        var width = element[0].offsetWidth;
        element[0].style.height = width / ratio + 'px';
      }

    }
  }

})();