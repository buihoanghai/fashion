angular.module('common.translateHighlight')

.directive('translate', [
  '$rootScope',
  '$compile',
  '$timeout',
  'common.translateHighlight.translateHighlightService',
  '$log',
  function ($rootScope, $compile, $timeout, translateHighlightService,
             $log) {
    return {
      scope: false,
      restrict: 'AE',
      link: function (scope, iElm, iAttrs) {
        var key = "";
        var value = "";
        var mouseEventBound = false;
        var contenttype = "text";
        var translableFieldsTopic = ['name', 'summary'];
        var translableFieldsTopicItem = ['labels'];
        var classNames = {
          'ok': "i18n-highlight",
          'missing': "i18n-highlight--missing",
          'empty': "i18n-highlight--empty"
        };

        var mouseEnterHandlerFn = function (event) {
          $rootScope.$broadcast('translate-highlight-show-tooltip', {
            key: key,
            value: value,
            contenttype: contenttype,
            left: event.clientX,
            top: event.clientY
          });
        };

        var mouseLeaveHandlerFn = function (event) {
          $rootScope.$broadcast('translate-highlight-hide-tooltip');
        };
        function removeClassTopic() {
          removeEvent('ng-bind');
          removeEvent('ng-bind-html');
          function removeEvent(attrName) {
            var listElems = angular.element(iElm.parent()
           .find('[' + attrName + ']'));
            _.each(listElems, function (elem) {
              elem = angular.element(elem);
              if (elem.hasClass(classNames['empty'])) {
                elem.html("");
              }
              elem.removeClass(classNames['ok'] + " " + classNames['missing'] + " " +
                         classNames['empty']);
              elem.unbind('mouseenter');
              elem.unbind('mouseleave');

            });
          }
        }
        function highLightTopicChildren() {
          addHighlightElem('ng-bind');
          addHighlightElem('ng-bind-html');
          function addHighlightElem(attrName) {
            var listElems = angular.element(iElm.parent()
              .find('[' + attrName + ']'));
            _.each(listElems, function (elem, list) {
              elem = angular.element(elem);

              var attr = elem.attr(attrName);
              var params = {
                elem: elem,
                attr: attr,
                type: iAttrs.type,
                list: translableFieldsTopic
              };
              addClass(params);
              params = {
                elem: elem,
                attr: attr,
                type: iAttrs.item,
                list: translableFieldsTopicItem
              };
              addClass(params);
            });
            function addClass(params) {
              var elem = params.elem;
              var attr = params.attr;
              var type = params.type;
              var list = params.list;
              _.each(list, function (fieldName) {

                var name = type + '.' + fieldName;
                var needAddClass = attr.indexOf(name);
                if (needAddClass > -1) {
                  var value = "";
                  var item = "", key = "";
                  if (type === "item") {
                    item = angular.element(elem.parent()).data('$scope');
                    while (item.item === undefined) {
                      item = item.$parent;
                    }
                    item = item.item;
                    key = item.key;
                  }
                  var mouseEnterTopicHandlerFn = function (event) {
                    $rootScope.$broadcast('translate-highlight-show-tooltip', {
                      key: key + '.' + attr,
                      value: value,
                      type: type,
                      item:item,
                      topic_item_id: scope.topic.id,
                      item_id: key,
                      attrName: attrName,
                      contenttype: attrName.indexOf('html') > -1 ?
                        'html' : 'text',
                      left: event.clientX,
                      top: event.clientY
                    });
                  };
                  elem.addClass("i18n-highlight");
                  $timeout(function () {
                    var _html = elem.html();
                    value = "" + _html;

                    //- Translation missing
                    if (_html == attr) {
                      value = "";
                      elem.addClass("i18n-highlight--missing");
                    }
                      //- Translation empty
                    else if (!_html) {
                      value = "";
                      elem.html("**TRANSLATION EMPTY**");
                      elem.addClass("i18n-highlight--empty");
                    }
                  });
                  elem.bind('mouseenter', mouseEnterTopicHandlerFn);
                  elem.bind('mouseleave', mouseLeaveHandlerFn);
                }

              });
            }
          }

        }
        var highlightFn = function () {
          //- Class names

          //- Remove previously added error highlight classes
          iElm.removeClass(classNames['ok'] + " " + classNames['missing'] + " " +
                           classNames['empty']);
          if (iAttrs.type === 'topic') {
            removeClassTopic();
          }

          if (!translateHighlightService.enabled() && mouseEventBound) {
            iElm.unbind('mouseenter', mouseEnterHandlerFn);
            iElm.unbind('mouseleave', mouseLeaveHandlerFn);
            mouseEventBound = false;
          }
          else if (translateHighlightService.enabled()) {
            if (iAttrs.type === 'topic') {
              highLightTopicChildren();
            }
            // Get key from translate attribute
            if (!key) {
              key = iAttrs.translate;

              // Get key from html
              if (!key) {
                key = iElm.html();
              }
            }



            //- If a key is set
            if (key) {
              if (!mouseEventBound) {
                iElm.bind('mouseenter', mouseEnterHandlerFn);
                iElm.bind('mouseleave', mouseLeaveHandlerFn);
                mouseEventBound = true;
              }

              if (iAttrs.contenttype !== undefined) {
                contenttype = iAttrs.contenttype;
              }

              iElm.addClass("i18n-highlight");

              //- Verify after translation have occured
              $timeout(function () {
                var _html = iElm.html();
                value = "" + _html;

                //- Translation missing
                if (_html == key) {
                  value = "";
                  iElm.addClass("i18n-highlight--missing");
                }
                  //- Translation empty
                else if (!_html) {
                  value = "";
                  iElm.html("**TRANSLATION EMPTY**");
                  iElm.addClass("i18n-highlight--empty");
                }
              });
            }

          }
        };

        var unbind = $rootScope.$on('$translateChangeSuccess', highlightFn);
        highlightFn();
        scope.$on('$destroy', function () {
          unbind();
          if (mouseEventBound) {
            iElm.unbind('mouseenter', mouseEnterHandlerFn);
            iElm.unbind('mouseleave', mouseLeaveHandlerFn);
          }
        });

      }
    };
  }
])
;
