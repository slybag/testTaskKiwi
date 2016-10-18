'use strict';

/**
 * @ngdoc function
 * @name testTaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testTaskApp
 */
angular.module('testTaskApp')
  .controller('MainCtrl', function ($scope, ApiService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.departureDateInput = [];
    $scope.departureDateInputCompleteDataFromAutocomplete = [];
    $scope.arrivalDateInput = [];
    $scope.arrivalDateInputCompleteDataFromAutocomplete = [];

    $scope.updateTo = function(typed) {
      ApiService.doHttpRequest('GET', '/places?term=' + typed + '&v=2&locale=en', null, null)
        .then(function(response) {
          $scope.arrivalDateInputCompleteDataFromAutocomplete = response.data;
          $scope.arrivalDateInput = response.data.map(function(a) {return a.value;});
        })
    };

    $scope.updateFrom = function(typed) {
      ApiService.doHttpRequest('GET', '/places?term=' + typed + '&v=2&locale=en', null, null)
        .then(function(response) {
          $scope.departureDateInputCompleteDataFromAutocomplete = response.data;
          $scope.departureDateInput = response.data.map(function(a) {return a.value;});
        })
    };

    $scope.search = function() {
      var from = $scope.departureDateInputCompleteDataFromAutocomplete.filter(function (obj) {
        return (obj.value == $scope.from);
      })[0];

      var to = $scope.arrivalDateInputCompleteDataFromAutocomplete.filter(function (obj) {
        return (obj.value == $scope.to);
      })[0];

      var table = $('#results').empty();

      ApiService.doHttpRequest('GET', '/flights?v=2&locale=en&flyFrom=' + from.id +
        '&to=' + to.id + '&dateFrom=' + $scope.dateFrom + '&dateTo=' +  $scope.dateFrom +
        '&typeFlight=return&returnFrom=' + $scope.dateTo + '&returnTo=' + $scope.dateTo,
        null, null)
        .then(function(response) {
          $.each (response.data.data, function(i, flight) {
            var html = '<tr><td>' + flight.cityFrom + '</td><td>' + flight.cityTo +
              '</td><td>' + new Date(flight.dTime * 1000).toUTCString() +
              '</td><td>' + new Date(flight.aTime * 1000).toUTCString() +
              '</td><td>'+ flight.price + '</td>></tr>';

            table.append(html);
          })

          if (response.data.data.length == 0) {
            table.append('<tr><td>Sorry, no data found</td></tr>');
          }
        })
    }
  });
