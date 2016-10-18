/**
 * Created by michalrais on 8/25/15.
 */
app.service('ApiService', function ($http, $rootScope, $q) {

  this.doHttpRequest = function (type, url, params, idRequest) {
    var deffered = $q.defer();

    $http({
      method: type,
      url: $rootScope.apiBaseUrl + url,
      data: params,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
      }
    }).success(function (data, status, headers, config) {
      var results = [];
      results.data = data;
      results.headers = headers();
      results.status = status;
      results.config = config;
      results.id = idRequest;

      deffered.resolve(results);
    }).error(function () {
      deffered.reject();
    });

    return deffered.promise;
  };

});
