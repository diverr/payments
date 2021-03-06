'use strict';

angular.module('paymentsApp')
  .controller('EditPaymentCtrl', function (Payments, CONST, $timeout, $location, $routeParams) {
    
    var vm = this;
    
    vm.messageInfo = '';
    vm.messageError = '';
    vm.messageSuccess = '';
    vm.url = '';
    vm.pago = {};
    vm.save = save;
    
    
    Payments.get($routeParams.id)
      .then(function(result){
        console.log(result);
        vm.pago = result;
        vm.url = CONST.HOST + 'gotopayment/' + result.uid;
        if(vm.pago.pagado == 1 && vm.pago.fechapago) {
          vm.pago.fechapago = moment(vm.pago.fechapago).format("LLL");
        }
      });
    
    
    function save() {
      vm.messageInfo = 'Guardando........';
      
      Payments.update(vm.pago)
        .then(function(result) {
          vm.url = CONST.HOST + 'gotopayment/' + result.url;
          
          vm.messageInfo = '';
          vm.messageSuccess = 'Datos almacenados correctamente';
          
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