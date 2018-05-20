(function (angular) {
    'use strict';

    const module = angular.module('fileUploadDirective', ['fileService']);

    module.directive('fileUploadForm', [
        'fileFactory',
        function(fileFactory) {
            return {
                restrict: 'A',
                templateUrl: '../../templates/upload-form.html',
                link: function (scope, elem) {
                    scope.data = {};
                
                    scope.upload = function () {
                        
                        var f = document.getElementById('file').files[0];
                        console.log(f)
                        scope.data.file = f;
                        
                        console.log(scope.data)
                        fileFactory
                            .file.post(scope.data)
                            .then(function () {
                                scope.uploaded = true;
                                scope.data = {};
                            });
                    };
                }
            }
        }
    ])

}(window.angular));
