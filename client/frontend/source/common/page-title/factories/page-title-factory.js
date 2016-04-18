angular.module( 'common.pageTitle')

.factory( 'common.pageTitle.pageTitleFactory', [
  '$rootScope',
  function pageTitleFactory ( $rootScope ) {
    var title, prefix, prefixSpacer, suffix, suffixSpacer;
    title = prefix = prefixSpacer = suffix = suffixSpacer = "";

    return {
      setPrefix: function ( p, o ) {
        prefix = p;

        if (typeof o !== 'undefined' && o !== "") {
          prefixSpacer = o;
        }

        return this;
      },
      getPrefix: function () {
        return prefix;
      },
      setSuffix: function ( s, o ) {
        suffix = s;

        if (typeof o !== 'undefined' && o !== "") {
          suffixSpacer = o;
        }

        return this;
      },
      getSuffix: function () {
        return suffix;
      },
      setTitle: function ( t ) {
        if (t === false) {
          title = "";
        }
        else if (typeof t !== 'undefined' && t !== "") {
          title = t;
        }

        var pageTitle = "";

        if (prefix !== "") {
          pageTitle = prefix + (title !== "" ? prefixSpacer : "") + title;
        }
        if (suffix !== "") {
          pageTitle = title + (title !== "" ? suffixSpacer : "") + suffix;
        }

        $rootScope.pageTitle = pageTitle;
        return this;
      },

      getTitle: function () {
        return title;
      },

      getFullTitle: function () {
        return $rootScope.pageTitle;
      }
    };

  }
]);
