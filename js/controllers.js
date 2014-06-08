"use strict";
angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        
        $scope.slide = '';
        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
    }])
    .controller('CurrCityCtrl', ['$scope','$location','Weather', function ($scope,$location,Weather) {
        $scope.loading=true;
        $scope.date=dateFormat(new Date(), "dddd, mmmm dS, yyyy");
         var promise=Weather.getCurrCity();
         promise.then(function(location){
             $scope.city=location[0].trim();
             $scope.state=location[1].split(" ")[1];
             Weather.getCurrData($scope.city).success(function(response){
                    $scope.weather = response;
                    $scope.weather.main.temp=$scope.weather.main.temp.toFixed(1);
                    $scope.loading=false;
                    console.log( $scope.loading);
             });
         },
         function(error){
             return error;
         });
         $scope.getCity=function(){
             $location.path("/"+$scope.selCity);
         }
    }])
    .controller('SelCityCtrl', ['$scope', '$routeParams','$location', 'Weather', function ($scope, $routeParams,$location,Weather) {
        $scope.loading=true;
        $scope.date=dateFormat(new Date(), "dddd, mmmm dS, yyyy");
        Weather.getSelData({cityId: $routeParams.cityId}).success(function(response){
            $scope.weather = response;
            $scope.weather.main.temp=$scope.weather.main.temp.toFixed(1);
            $scope.city=$routeParams.cityId;
            $scope.loading=false;
            console.log( $scope.loading);
        });
        $scope.getCity=function(){
           $location.path("/"+$scope.selCity);
        }
    }])
    .controller('CityDetiledCtrl', ['$scope', '$routeParams', 'Weather', function ($scope, $routeParams, Weather) {
         $scope.loading=true;
         $scope.date=dateFormat(new Date(), "dddd, mmmm dS, yyyy");
         $scope.days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
         $scope.city=$routeParams.cityId;
        Weather.getMoreData({cityId: $routeParams.cityId}).success(function(response){
            console.log(response);
             $scope.loading=false;
            $scope.weatherDetailed = response;
            for(var i=0;i<7;i++){
                var currentDate = new Date(new Date().getTime() + (i+1)*24 * 60 * 60 * 1000);
                $scope.weatherDetailed.list[i].d_ate=currentDate.getDate();
                $scope.weatherDetailed.list[i].d_ay=$scope.days[currentDate.getDay()];
                }
        });
    }]);
