'use strict';

// Application Modules and Routing
angular
    .module('fvs', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/listUsers', {
              templateUrl : 'views/listUsers.html',
              controller  : 'ListUserCtrl'
            })
            .when('/listCompanies', {
                templateUrl : 'views/listCompanies.html',
                controller  : 'ListComCtrl'
              })
            // .when('/about', {
            //   templateUrl : 'views/about.html',
            //   controller  : 'AboutCtrl'
            // });
    });