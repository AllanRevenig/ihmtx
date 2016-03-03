( function() {
	'use strict';

	angular.module('ihmtApp')
		.config(['$stateProvider','$urlRouterProvider', routerConfig]);

		function routerConfig($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');

			$stateProvider
			.state('chart', {
					url: '/',
					templateUrl: 'components/chart/chart.html',
					controller: 'ChartController as cc'
			})

			.state('inventory',{
				url:'/inventory',
				templateUrl: 'components/inventory/inventory.html',
				params: {'risk': 'all'},
				controller:  'InventoryController as ic'
			});
		}

})();