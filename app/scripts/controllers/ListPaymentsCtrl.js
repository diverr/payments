'use strict';

angular.module('paymentsApp')
  .controller('ListPaymentsCtrl', function ($http, $location, CONST) {
    
    var vm = this;
    
    vm.messageInfo = '';
    vm.messageError = '';
    vm.messageSuccess = '';
    vm.pagos = [];
    
    $http.get('/paymentsList')
      .then(function(result) {
        console.log(result);
        var pagos = result.data;
        
        angular.forEach(pagos, function(value, key) {
          value.url = CONST.HOST + '#payments/' + value.uid
        });
        
        vm.pagos = pagos;
        
      }, function(result) {
        // Error
      });
    
  });