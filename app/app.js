'use strict';

angular.module('HalVisualizator', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'd3Service',
    'hyperagent',
    'ui.bootstrap'
]).config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'components/halVisualizator/hal-visualizator-partial.html',
            controller: 'HalVisualizatorController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
