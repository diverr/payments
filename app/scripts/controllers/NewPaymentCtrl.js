'use strict';

angular.module('paymentsApp')
  .controller('NewPaymentCtrl', function (Payments, CONST, $timeout, $location) {
    
    var vm = this;
    
    vm.messageInfo = '';
    vm.messageError = '';
    vm.messageSuccess = '';
    vm.url = '';
    vm.pago = {};
    vm.save = save;
    
    
    
    
    function save() {
      vm.messageInfo = 'Guardando........';
      
      Payments.add(vm.pago)
        .then(function(result) {
          
          vm.messageInfo = '';
          vm.messageSuccess = 'Pago generado correctamente';
          
          $timeout(function() {
            $location.path('/list');
          }, 1000);
          
        }, function(result) {
          // error
          console.log(data);
          vm.messageInfo = '';
          vm.messageError = 'Error al almacenar el pago';
        });
    };
    
  });