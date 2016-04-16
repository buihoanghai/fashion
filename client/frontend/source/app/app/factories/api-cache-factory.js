angular.module('app')

.factory('app.apiCache', [
  '$cacheFactory',
  function ($cacheFactory) {
    return $cacheFactory('apiCache');
  }
])
;
