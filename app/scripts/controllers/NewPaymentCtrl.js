'use strict';

angular.module('paymentsApp')
  .controller('NewPaymentCtrl', function ($http, CONST, $timeout, $location) {
    
    var vm = this;
    
    vm.messageInfo = '';
    vm.messageError = '';
    vm.messageSuccess = '';
    vm.url = '';
    vm.pago = {};
    vm.save = save;
    
    
    
    
    function save() {
      vm.messageInfo = 'Guardando........';
      
      $http.post('/new', vm.pago)
        .then(function(result) {
          vm.url = CONST.HOST + '#payment/' + result.data;
          
          vm.messageInfo = '';
          vm.messageSuccess = 'Pago generado correctamente';
          
          $timeout(function() {
            $location.path('/list');
          }, 4000);
          
        }, function(result) {
          // error
          console.log(data);
          vm.messageInfo = '';
          vm.messageError = 'Error al almacenar el pago';
        });
    };
    
  });