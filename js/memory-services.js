"use strict";
(function () {
angular.module('myApp.memoryServices', [])
        .factory('Weather', ['$http','$q',
            function ($http,$q) {
               
                return {
                    getCurrCity:function(){
                                var deferred = $q.defer();
                                var location=[];
                                if(!navigator.geolocation) return false;
                                navigator.geolocation.getCurrentPosition(function(pos) {
                                var geocoder;
                                geocoder = new google.maps.Geocoder();
                                var lat=pos.coords.latitude;
                                var lon=pos.coords.longitude;
                                //var lat=29.392971000000000000;
                                //var lon=79.454050999999930000;
                                var latlng = new google.maps.LatLng(lat,lon);
                                geocoder.geocode({'latLng': latlng}, function(results, status) {
                                 if (status == google.maps.GeocoderStatus.OK) {
                                var result = results[0];
                                var array = result.formatted_address.split(',');
                                for (var i=array.length-1, j=2;i>array.length-4;i--,j--){
                                location[j]=array[i];
                                }
                                console.log(location);
                                deferred.resolve(location);
                                }
                                else{
                                deferred.reject(status) 
                                }
                                });
                                });
                                return deferred.promise;
                                
                    },
                    getCurrData: function (city) {
                           
                           return $http({
                                        method: 'GET', 
                                        url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+',IN&units=metric&APPID=3d479801c672d3ff4a0579bd2cab3cbb'
                            });
                    },
                    getSelData: function (city) {
                                return $http({
                                        method: 'GET', 
                                        url: 'http://api.openweathermap.org/data/2.5/weather?q='+city.cityId+',IN&units=metric&APPID=3d479801c672d3ff4a0579bd2cab3cbb'
                                });
                    },
                    getMoreData: function (city) {
                                return $http({
                                        method: 'GET', 
                                        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city.cityId+',in&cnt=7&mode=json&units=metric&APPID=3d479801c672d3ff4a0579bd2cab3cbb'
                                });
                    }

                }

            }]);
}());
