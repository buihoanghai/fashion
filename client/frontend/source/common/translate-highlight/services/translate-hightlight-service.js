angular.module('common.translateHighlight')

.provider('common.translateHighlight.translateHighlightService', [
  function () {
    var _enabled = false;
    var _tooltipIElm = null;
    var _modalIElm = null;

    this.addDomElements = function () {
      var body = angular.element(document.body);
      var tooltipHTML = "<div translate-highlight-tooltip></div>";
      _tooltipIElm = angular.element(tooltipHTML);
      body.append(_tooltipIElm);
    };

    this.enable = function (status) {
      if (status === true || status === false) {
        _enabled = status;
      }

      return _enabled;
    };

    this.enabled = function () {
      return _enabled;
    };

    this.$get = [
      '$translate',
      '$timeout',
      '$log',
      function ($translate, $timeout, $log) {
        return {
          enabled: this.enabled,
          enable: this.enable,
          toggle: function () {
            $log.debug("toggle");

            this.enable(!this.enabled());

            $timeout(function () {
              $translate.refresh();
            });
          }
        };
      }
    ];

  }
]);
