(function(){
	'use strict';

	angular.module('ihmtApp')
		.factory ('inventoryService', ['inventoryServiceAPI', inventoryService]);

		function inventoryService(inventoryServiceAPI){
			//API
			var inventory = [];
			var inventoryTotal = [];

			var getInventory = function getInventory(){
				return inventory;
			};

			var initialize = function initialize(){
				return inventoryServiceAPI.getInventory()
				.then (function (resolved){
					//success
					inventory = resolved.data;
					return inventory;
				}, function(){
					//failure
				});
			};

			var getInventoryTotal = function getInventoryTotal(){
				return inventoryTotal;
			};

			var initializeTotal = function initializeTotal(){
				return inventoryServiceAPI.getInventoryTotal()
				.then (function (resolved){
					//success
					inventoryTotal = resolved.data;
					return inventoryTotal;
				}, function(){
					//failure
				});
			};

			var executeAction = function(item, action, comments) {

				console.warn('inventoryServiceAPI.executeAction('+item+', '+action+', '+comments+');');
				inventoryServiceAPI.executeAction(item, action, comments);

				// inventoryServiceAPI.executeAction(item, action, comments)
				// .then (function (resolved) {
				//    console.info(action + ' ' + item + ' succeeded');
				//    alert(action + ' ' + item + ' succeeded');
				// }, function() {
				//     console.error('bummer, ' + action + ' action failed');
				//     alert('bummer, ' + action + ' action failed');
				// });
			};

			return {
				initialize: initialize,
				getInventory: getInventory,
				initializeTotal: initializeTotal,
				getInventoryTotal: getInventoryTotal,
				executeAction: executeAction
			};
		}
})();
