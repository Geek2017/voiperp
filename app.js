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
      .when('/projectlist', {
        templateUrl: 'views/ProjectList.html',
        controller: 'ProjectListCtrl'
      })
      .when('/projectcreate', {
        templateUrl: 'views/ProjectCreate.html',
        controller: 'ProjectCreateCtrl'
      })
      .when('/listClient', {
        templateUrl: 'views/ListClient.html',
        controller: 'ListClientCtrl'
      })
      .when('/newClient', {
        templateUrl: 'views/NewClient.html',
        controller: 'NewClientCtrl'
      })
      .when('/sales', {
        templateUrl: 'views/Sales.html',
        controller: 'SalesCtrl'
      })
      .when('/leads', {
        templateUrl: 'views/Leads.html',
        controller: 'LeadsCtrl'
      })
      .when('/newLeads', {
        templateUrl: 'views/NewLeads.html',
        controller: 'NewLeadsCtrl'
      })
      .when('/calls', {
        templateUrl: 'views/Call.html',
        controller: 'CallCtrl'
      })
      .when('/newCalls', {
        templateUrl: 'views/NewCalls.html',
        controller: 'NewCallsCtrl'
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
      .when('/marketing', {
        templateUrl: 'views/Marketing.html',
        controller: 'MarketingCtrl'
      })
      .when('/sales', {
        templateUrl: 'views/Sales.html',
        controller: 'SalesCtrl'
      })
      .when('/invoice', {
        templateUrl: 'views/Invoice.html',
        controller: 'InvoiceCtrl'
      })
      .when('/task', {
        templateUrl: 'views/Task.html',
        controller: 'TaskCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/Reports.html',
        controller: 'ReportsCtrl'
      })
    // .when('/about', {
    //   templateUrl : 'views/about.html',
    //   controller  : 'AboutCtrl'
    // });
  });