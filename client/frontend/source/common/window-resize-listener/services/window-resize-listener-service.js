angular.module('common.window-resize-listener')

.service('common.window-resize-listener.windowResizeListenerService', [
  '$timeout',
  '$log',
  function ( $timeout, $log ) {
    var windowResizeTimer = false;
    var bp = 0;
    var scope = false;

    function setBP (window) {
      var w = window.innerWidth;
      newBp = w >= 1341 ? 3 : (
              w >= 980 ? 2 : (
              w >= 760 ? 1 : 0));

      if (newBp != bp) {
        var old = bp;
        bp = newBp;
        scope.$broadcast("window-breakpoint-changed", { bp: newBp, old: old });
      }
    }

    this.getBP = function () {
      return bp;
    };

    this.setListener = function (_scope, window) {
      scope = _scope;
      setBP(window);

      angular.element(window).bind('resize', function (event) {
        if (windowResizeTimer) {
          $timeout.cancel(windowResizeTimer);
        }

        windowResizeTimer = $timeout(function () {
          setBP(window);
          scope.$broadcast("window-resized", { bp: bp });
        }, 200);
      });
    };

  }
])
;
