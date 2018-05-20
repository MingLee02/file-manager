(function (angular) {
    'use strict';

    const module = angular.module('registerUserDirective', ['registrationService']);

    module.directive('registerForm', [
        'registrationFactory',
        function(registrationFactory) {
            return {
                restrict: 'A',
                templateUrl: '../../templates/register-form.html',
                link: function (scope) {
                    scope.data = {};
                
                    scope.register = function () {
                        registrationFactory
                            .register.post(scope.data)
                            .then(function () {
                                scope.registered = true;
                                scope.data = {};
                            });
                    };
                }
            }
        }
    ])

}(window.angular));
