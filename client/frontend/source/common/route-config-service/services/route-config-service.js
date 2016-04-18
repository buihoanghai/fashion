angular.module('common.routeConfig')

.provider('common.routeConfig.routeConfigService', [
  function () {

    function viewConfig(baseName, controllerName, tplName, options) {
      var cnf = {
        controller: 'app.' + baseName + '.' + controllerName + 'Controller',
      };

      cnf.controller += ' as ' + 'vm';

      if (tplName) {
        var _t = 'app/' + baseName + '/_tpl/' + tplName + '.tpl.html';
        cnf.templateUrl = tplName ? _t : false;
      }

      return cnf;
    }

    this.$get = function () {
      return this;
    };

    this.config = function (url, name, options) {
      //- State name
      var baseName = name.split(".")[0];

      //- Controller name
      var controllerName = options && options.controller ?
                           options.controller :
                           _.camelCase(name.replace(/[.]+/g, ' '));

      //- Template name
      var tplName = options && options.tpl ?
                    options.tpl :
                    (options && options.tpl === false ?
                     false :
                     _.kebabCase(name));

      //- Set view
      var view = options && options.view ? options.view : "main";
      var p = { views: {} };
      p.views[view] = viewConfig(baseName, controllerName, tplName, options);

      //- Reload on search
      if (options && !_.isUndefined(options.reloadOnSearch)) {
        p.reloadOnSearch = options.reloadOnSearch;
      }

      //- Set state parameters
      stateParams = ['query'];

      if (options && options.stateParams) {
        stateParams = stateParams.concat(options.stateParams);
      }

      //- Set stateparams in URL or as hidden params
      if (url) {
        p.url = url + "?" + stateParams.join('&');
      }
      else {
        //p.params = stateParams;
      }
      //- Return state parameters
      // console.log(p);
      return p;
    };

  }
]);
