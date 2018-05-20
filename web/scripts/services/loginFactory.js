
(function (angular) {
    'use strict';

    var module = angular.module('loginService', []);

    module.factory('loginFactory', [
        '$http',
        function ($http) {

            var login = {
                post: function (data) {
                    return $http({
                        method: 'POST',
                        url: 'http://localhost:8000/users/login/',
                        data: data
                    });
                }
            };

            return {
                login: login
            };
        }
    ]);

}(window.angular));