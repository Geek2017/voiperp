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
            // .when('/contacts', {
            //   templateUrl : 'views/contacts.html',
            //   controller  : 'ContactCtrl'
            // })
            // .when('/about', {
            //   templateUrl : 'views/about.html',
            //   controller  : 'AboutCtrl'
            // });
    });