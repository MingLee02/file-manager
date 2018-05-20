(function (angular) {
    'use strict';

    const module = angular.module('loginUserDirective', ['loginService']);

    module.directive('loginForm', [
        'loginFactory',
        '$location',
        function(loginFactory, $location) {
            return {
                restrict: 'A',
                templateUrl: '../../templates/login-form.html',
                link: function (scope) {
                    scope.data = {};
                
                    scope.login = function () {
                        loginFactory
                            .login.post(scope.data)
                            .then(function (response) {
                                scope.signedIn = true;
                             
                                scope.$root.user = {
                                    'usename': response.data.username,
                                    'active': response.data.active
                                }
                                
                                $location.path("signed-in");
                            });
                        
                    };
                }
            }
        }
    ])

}(window.angular));
