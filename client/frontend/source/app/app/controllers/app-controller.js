(function () {
  'use strict';
  appController.$inject = [
	'$rootScope',
    '$window',
    'common.window-resize-listener.windowResizeListenerService'
  ];
  function appController($rootScope, $window, windowResizeListenerService) {
  
    //- Attach FastClick to body
    FastClick.attach(document.body);

    //- On window resize
    windowResizeListenerService.setListener($rootScope, $window);
  }
  
  angular.module('app').controller('app.appController', appController);
})();
