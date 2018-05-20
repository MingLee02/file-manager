
(function (angular) {
    'use strict';

    var module = angular.module('registrationService', []);

    module.factory('registrationFactory', [
        '$http',
        function ($http) {

            var register = {
                post: function (data) {
                    console.log(data)
                    return $http({
                        method: 'POST',
                        url: 'http://localhost:8000/users/register',
                        data: data
                    });
                }
            };

            return {
                register: register
            };
        }
    ]);

}(window.angular));