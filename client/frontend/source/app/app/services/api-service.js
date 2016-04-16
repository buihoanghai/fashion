(function () {
  'use strict';
  apiService.$inject = ['$q', '$http', 'app.apiCache'];
  angular.module('app').service('app.apiService', apiService);
  function apiService($q, $http, apiCache) {
    var revealed = {
      get: get,
      patch: patch,
      post: post,
      put: put,
      remove: remove,
      request: request
    };
    var tokenNames = {
      token: 'FFT-TOKEN',
      auth: 'FFT-AUTHENTICATED',
      verifySession: 'FFT-VERIFY-SESSION'
    };
    var token = null;
    var tokenInitialized = false;
    function get(url, parameters, config, extendedResolve) {
      return this.request("GET", url, parameters, config, extendedResolve);
    }
    function patch(url, parameters, config, extendedResolve) {
      return this.request("PATCH", url, parameters, config, extendedResolve);
    }
    function post(url, parameters, config, extendedResolve) {
      return this.request("POST", url, parameters, config, extendedResolve);
    }
    function put(url, parameters, config, extendedResolve) {
      return this.request("PUT", url, parameters, config, extendedResolve);
    }
    function remove(url, parameters, config, extendedResolve) {
      return this.request("DELETE", url, parameters, config, extendedResolve);
    }

    function request(method, url, data, config, extendedResolve) {
      if (!url) {
        throw "Unknown url";
      }
      //- Set config
      config = _.extend({
        cache: true,
        headers: {},
        tokenEvent: tokenInitialized,
        verifySession: tokenInitialized
      }, config);

      //- Token in request headers
      var headers = config.headers;
      if (token) {
        headers[tokenNames['token']] = token;
      }

      if (config.verifySession) {
        headers[tokenNames['verifySession']] = 1;
      }

      var deferred = $q.defer();
      var canceler = $q.defer();
      var cache = config.cache ? apiCache : false;
      url = "api/" + url;

      // $log.debug("API", url, cache);

      var http;
      if (method == "GET") {
        http = $http.get(url, {
          cache: cache, params: data,
          headers: headers, timeout: canceler.promise,
          config: config
        });
      }
      else if (method == "DELETE") {
        http = $http.delete(url, {
          cache: cache, params: data,
          headers: headers, timeout: canceler.promise,
          config: config
        });
      }
      else if (method == "POST") {

        http = $http.post(url, data, {
          cache: cache, headers: headers,
          timeout: canceler.promise,
          config: config
        });
      }
      else if (method == "PUT") {

        http = $http.put(url, data, {
          cache: cache, headers: headers,
          timeout: canceler.promise,
          config: config
        });
      }
      else if (method == "PATCH") {
        http = $http({
          method: 'PATCH', url: url, data: data, cache: cache, headers: headers,
          timeout: canceler.promise,
          config: config
        });
      }

      http
        .success(function (data, status, headers, config) {

          if (config.config.tokenEvent) {
            tkn = headers(tokenNames['token']);
            auth = headers(tokenNames['auth']);
            if (tkn) {
              $rootScope.$broadcast("api-token-set", {
                'token': tkn,
                'authenticated': auth
              });
            }
          }

          if (extendedResolve) {
            deferred.resolve({
              data: data,
              status: status,
              headers: headers,
              config: config
            });
          }
          else {
            deferred.resolve(data);
          }
        })
        .error(function (data, status, headers, config) {
          if (extendedResolve) {
            deferred.reject({
              data: data,
              status: status,
              headers: headers,
              config: config
            });
          }
          else {
            deferred.reject(data);
          }
        });

      return { promise: deferred.promise, canceler: canceler };
    }
    return revealed;
  }
})();
