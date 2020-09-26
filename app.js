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
              controller  : 'ListUsersCtrl'
            })
            .when('/listCompanies', {
                templateUrl : 'views/listCompanies.html',
                controller  : 'ListCompaniesCtrl'
              })
            // .when('/about', {
            //   templateUrl : 'views/about.html',
            //   controller  : 'AboutCtrl'
            // });
    });