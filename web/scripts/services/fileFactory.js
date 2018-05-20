
(function (angular) {
    'use strict';

    var module = angular.module('fileService', []);

    module.factory('fileFactory', [
        '$http',
        function ($http) {

            var file = {
                post: function (data) {
                    console.log(data)
                    return $http({
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json' 
                        },
                        url: 'http://localhost:8000/file/upload/',
                        data: data
                    });
                }
            };

            return {
                file: file
            };
        }
    ]);

}(window.angular));