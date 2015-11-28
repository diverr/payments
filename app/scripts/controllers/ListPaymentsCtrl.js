'use strict';

angular.module('paymentsApp')
  .controller('ListPaymentsCtrl', function (Payments, $location, CONST) {
    
    var vm = this;
    
    vm.messageInfo = '';
    vm.messageError = '';
    vm.messageSuccess = '';
    vm.pagos = [];
    vm.remove = remove;
    
    Payments.getAll()
      .then(function(result) {
        
        var pagos = result;
        
        angular.forEach(pagos, function(value, key) {
          value.fecha = moment(value.fecha).format("LLL");
          value.url = CONST.HOST + 'gotopayment/' + value.uid
        });
        
        vm.pagos = pagos;
        
      }, function(result) {
        // Error
      });
      
      function remove(item) {
        
        var respuesta = confirm("¿Seguro que quiere eliminar el pago?");
        if(!respuesta) return;
        
        
        Payments.remove(item);
        // quitamos el elemento del array
        var index = vm.pagos.indexOf(item);
        vm.pagos.splice(index, 1);
        vm.messageSuccess = 'Elemento eliminado';
      }
    
  });