'use strict';
(function(){


    var app = angular.module('paymentsApp', ['ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            
            .when('/list', {
                templateUrl: 'views/ListPayments.html',
                controller: 'ListPaymentsCtrl',
                controllerAs: 'vm'
            })
            
            .when('/new', {
                templateUrl: 'views/newPayment.html',
                controller: 'NewPaymentCtrl',
                controllerAs: 'vm'
            })
            
            .when('/edit/:id', {
                templateUrl: 'views/editPayment.html',
                controller: 'EditPaymentCtrl',
                controllerAs: 'vm'
            })
            
            .otherwise({
                redirectTo: '/'
            });
    });
    
    app.constant('CONST', {
        
        HOST: 'http://localhost:3000/'
        
    });

}.call(this));
