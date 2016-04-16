angular.module('common.translateHighlight')

.directive('translateHighlightTooltip', [
  '$rootScope',
  '$timeout',
  '$translate',
  '$http',
  '$log',
  function ( $rootScope, $timeout, $translate, $http, $log ) {
    return {
      scope: true,
      restrict: 'AE',
      replace: true,
      templateUrl: 'common/translate-highlight/_tpl/' +
                   'translate-highlight-tooltip.tpl.html',
      link: function (scope, iElm, iAttrs) {

        var mouseIsOverTooltip = false;
        var mouseIsOverTranslation = false;
        var key = "";
        var value = "";
        var type = "";
        var item = "";
        var topic_item_id = "";
        var attrName = "";
        var hideTimeout = false;
        var contenttype = "text";

        var hideTooltipFn = function () {
          $log.debug("hideTooltipFn", hideTimeout.resolve, mouseIsOverTranslation, mouseIsOverTooltip);

          if (hideTimeout.resolve) {
            hideTimeout.resolve();
          }

          hideTimeout = $timeout(function () {
            if (!mouseIsOverTooltip && !mouseIsOverTranslation) {
              iElm.removeClass('translate-highlight-tooltip--active');
            }
          }, 100);
        };

        var mouseEnterFn = function (event) {
          $log.debug("mouseEnterFn");
          mouseIsOverTooltip = true;
        };

        var mouseLeaveFn = function (event) {
          $log.debug("mouseLeaveFn");
          mouseIsOverTooltip = false;
          hideTooltipFn();
        };


        $rootScope.$on('translate-highlight-show-tooltip',
                       function (event, data) {
          $log.debug("translate-highlight-show-tooltip");
          key = data.key;
          value = data.value;
          type = data.type;
          attrName = data.attrName;
          item = data.item;
          topic_item_id = data.topic_item_id;
          contenttype = data.contenttype;
          iElm.css('top', data.top + "px");
          iElm.css('left', data.left + "px");
          iElm.addClass('translate-highlight-tooltip--active');
          mouseIsOverTranslation = true;

          $timeout(function () {
            scope.key = key.replace(/__/g, " > ");
            scope.contenttype = contenttype;
            scope.value = value;
          });
        });

        $rootScope.$on('translate-highlight-hide-tooltip',
                       function (event, data) {
          $log.debug("translate-highlight-hide-tooltip");
          mouseIsOverTranslation = false;
          hideTooltipFn();
        });

        iElm.bind('mouseenter', mouseEnterFn);
        iElm.bind('mouseleave', mouseLeaveFn);

        scope.$translate = $translate;

        scope.updateTranslation = function () {
          $log.debug("Update translations towards server");
          var params;
          if (topic_item_id && type === 'item') {
            params = {
              locale: $translate.use(),
              topic_item_id: key.split('.')[0].split('-')[1]
          };
            if (key.split('.')[key.split('.').length - 1] === 'label') {
              params.label = scope.value;
              if (item.labels[$translate.use()]) {
                item.labels[$translate.use()].label = scope.value;
              } else {
                item.labels[$translate.use()] = { label: scope.value };
              }
            } else {
              params.description = scope.value;
              if (item.labels[$translate.use()]) {
                item.labels[$translate.use()].description = scope.value;
              } else {
                item.labels[$translate.use()] = { description: scope.value };
              }
            }
            $http({
              url: '/api/topics/update_item_label',
              data: params,
              method: "POST"
            })
           .success(function (response) {
             $log.debug("Translation updated on server");
             $translate.refresh();
           })
           .error(function (response) {
             $log.debug("ERROR updating translation on server");
           });
            return;
          }
            params = {
            locale: $translate.use(),
            key: key,
            value: scope.value
          };

          $http({
            url: '/api/translations/update',
            params: params,
            method: "POST"
          })
            .success(function (response) {
              $log.debug("Translation updated on server");
              $translate.refresh();
            })
            .error(function (response) {
              $log.debug("ERROR updating translation on server");
            });
        };
      }
    };
  }
])
;
