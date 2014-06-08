'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.memoryServices'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/current-city.html', controller: 'CurrCityCtrl'});
    $routeProvider.when('/:cityId', {templateUrl: 'partials/selected-city.html', controller: 'SelCityCtrl'});
    $routeProvider.when('/:cityId/detailed', {templateUrl: 'partials/city-detailed.html', controller: 'CityDetiledCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);
