'use strict';
(function(){


    var app = angular.module('paymentsApp', ['ngRoute', 'ngStorage']);
    app.config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/ListPayments.html',
                controller: 'ListPaymentsCtrl',
                controllerAs: 'vm'
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
            
            
        $httpProvider.interceptors.push(function($q, $location, $localStorage) {
            return {
                
                'request': function(config) {
                    
                    config.headers = config.headers || {};
                    if($localStorage.token) {
                        config.headers.Authorization = 'Piensaenweb ' + $localStorage.token;
                    }
                    
                    return config;
                    
                },
                
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        //$location.path('/login');
                        window.location.href = '/login';
                    }
                    return $q.reject(response);
                }
                
            }
        });
        
        
    });
    

}.call(this));
