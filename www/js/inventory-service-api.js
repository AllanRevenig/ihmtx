(function(){
	'use strict';

	angular.module('ihmtApp')
		.factory('inventoryServiceAPI',['$http',inventoryServiceAPI]);

		function inventoryServiceAPI($http){
			
			var getInventory = function (){
				return $http({
					method: 'GET',
					url: '/data/inventory'
				});
			};

			var getInventoryTotal = function(){
				return $http({
					method: 'GET',
					url: '/data/inventory/total'
				});
			};

			var executeAction = function(item, action, comments) {
				console.warn(action + ' ' + item + ' - reason: ' + comments + ' [inventory updated]');
				alert(action + ' ' + item + ' - reason: ' + (comments === null || comments === '' ? 'n/a' : comments) + ' [inventory updated]');
			};

			return {  //public: private
				getInventory: getInventory,
				getInventoryTotal: getInventoryTotal,
				executeAction: executeAction
			};
		}
})();
