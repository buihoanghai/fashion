angular.module('app', [
	//angular plugins
  'ui.router',
  'ngSanitize',
  'pascalprecht.translate',
	//page
  'app.product',
	//templates
  'templates-app',
  'templates-common',
	//common plugins
  'common.pageTitle',
  'common.routeConfig',
  'common.window-resize-listener',
  'common.kitCookies',
  'common.translateHighlight'
]).config([
  'common.translateHighlight.translateHighlightServiceProvider',
  '$provide',
  function appConfig(translateHighlightServiceProvider, $provide) {


   //- Configure translate highlight settings (Debugging)
   translateHighlightServiceProvider.addDomElements();

   //- Decorate $uiViewScroll to enable scroll to top
   $provide.decorator('$uiViewScroll', [
     '$delegate',
     function ($delegate) {
       return function (uiViewElement) {
         window.scrollTo(0, 0);
       };
     }
   ]);
 }]).run();