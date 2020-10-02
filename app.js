'use strict';

// Application Modules and Routing
angular
  .module('fvs', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/leads', {
        templateUrl: 'views/Leads.html',
        controller: 'LeadsCtrl'
      })
      .when('/calls', {
        templateUrl: 'views/Call.html',
        controller: 'CallCtrl'
      })
      .when('/listUsers', {
        templateUrl: 'views/listUsers.html',
        controller: 'ListUserCtrl'
      })
      .when('/newUser', {
        templateUrl: 'views/NewUsers.html',
        controller: 'NewUsersCtrl'
      })
      .when('/listCompanies', {
        templateUrl: 'views/listCompanies.html',
        controller: 'ListComCtrl'
      })
      .when('/logs', {
        templateUrl: 'views/Logs.html',
        controller: 'LogsCtrl'
      })
    // .when('/about', {
    //   templateUrl : 'views/about.html',
    //   controller  : 'AboutCtrl'
    // });
  });