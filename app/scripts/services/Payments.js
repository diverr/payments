angular.module('paymentsApp')
.service('Payments', function($http) {
	
	return {
		
		getAll: function() {
			
			var promise = $http.get('/paymentsList')
							.then(function(result) {
								return result.data;
							}, function(result) {
								// Error
							});
			return promise;
			
		},
		
		get: function(id) {
			var promise = $http.get('/payment/' + id)
							.then(function(result) {
								return result.data;
							}, function(result) {
								// Error
							});
							
			return promise;
		},
		
		add: function(item) {
			var promise = $http.post('/payment', item)
							.then(function(result) {
								return result.data;
							}, function(result) {
								// Error
							});
							
			return promise;
		},
		
		update: function(item) {
			var promise = $http({
				url: '/payment',
				method: 'put',
				data: item
			}).then(function(result) {
				return result.data;
			}, function(result) {
				// Error
			});
							
			return promise;
		},
		
		remove: function(item) {
			var promise = $http({
				url: '/payment/' + item._id,
				method: 'delete'
			}).then(function(result) {
				return result.data;
			}, function(result) {
				// Error
			});
							
			return promise;
		}
		
	}
	
});