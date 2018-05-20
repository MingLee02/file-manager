
(function (angular) {
    'use strict';
    var module = angular.module('app', [
        'ngRoute',
        'registerUserDirective',
        'loginUserDirective',
        'fileUploadDirective',
    ]);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: '../templates/home.html',
                    name: 'home'
                })
                .when("/register", {
                    templateUrl: '../templates/register.html',
                    name: 'register'
                })
                .when("/signed-in", {
                    templateUrl: '../templates/logged-in-home.html',
                    name: 'logged-in-home'
                });
        }
    ]);
}(window.angular));