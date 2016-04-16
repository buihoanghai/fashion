angular.module('app').config([
    '$locationProvider', 
    '$urlRouterProvider',
    '$stateProvider',
    'common.routeConfig.routeConfigServiceProvider',
    '$compileProvider',
    function routeConfig($locationProvider, $urlRouterProvider, $stateProvider, routeConfigServiceProvider, $compileProvider) {
      var route = routeConfigServiceProvider;
      $compileProvider.aHrefSanitizationWhitelist(
         /^\s*(https?|ftp|mailto|primus):/);
      $stateProvider
         .state(
           'products',
           route.config('/', 'product',{
			   controller: 'products',
               tpl: 'products'
			   }))
      .state(
           'product',
           route.config('/:productID', 'product'));
      //- If the URL does not match any state
      $urlRouterProvider.otherwise('/');
      //- Set html5mode and use '!' as url-prefix for legacy browsers
   //   $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode(false);
    }
]);
