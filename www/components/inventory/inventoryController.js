(function() { 
	'use strict';

	angular.module('ihmtApp.inventory')
	.controller('InventoryController', ['$state','$stateParams','inventoryService','$ionicSideMenuDelegate',
													'$scope','$ionicScrollDelegate','$filter',InventoryController]);

	function InventoryController($state,$stateParams,inventoryService,$ionicSideMenuDelegate,
										  $scope,$ionicScrollDelegate,$filter) {
		console.debug('enter InventoryController');

		var x = $stateParams; 

		var ic = this;

		ic.activeButtonID = '';

		ic.inventory = [];

		inventoryService.initialize()
		.then (function (data) {
			ic.inventory = data;
			inventoryService.getInventory();
			ic.totalCount = ic.inventory.length;
			
		});

		ic.inventoryTotal = [];

		inventoryService.initializeTotal()
		.then (function (data) {
			ic.inventoryTotal = data;
			inventoryService.getInventoryTotal();

			ic.redCount = ic.inventoryTotal[0].alert_color_total;
			ic.yellowCount = ic.inventoryTotal[1].alert_color_total;
			ic.greenCount = ic.inventoryTotal[2].alert_color_total;
		});

		$scope.$watch(
			'ic.searchInput', function () {

			var data;
			console.log('watching...');

			data = $filter('search')(ic.inventory, null, ic.searchInput);

			var redCount = 0;
			var yellowCount = 0;
			var greenCount = 0;

			for(var i=0; i<data.length; i++) {
				if(data[i].alert_color_id == '1'){
					redCount ++;
				}
				else if(data[i].alert_color_id == '2'){
					yellowCount ++;
				}
				else if(data[i].alert_color_id == '3'){
					greenCount ++;
				}
			}

			console.log('Red: ' + redCount);
			console.log('Yellow: ' + yellowCount);
			console.log('Green: ' + greenCount);

			ic.redCount = redCount;
			ic.greenCount = greenCount;
			ic.yellowCount = yellowCount;
			ic.totalCount = data.length;
		});

		if (x.risk==='high'){
			ic.riskFilter = {alert_color_id: 1};
			ic.activeButtonID = 1; 
		}
		else if (x.risk==='medium'){
			ic.riskFilter = {alert_color_id: 2};
			ic.activeButtonID = 2; 
		}
		else if (x.risk==='low'){
			ic.riskFilter = {alert_color_id: 3};
			ic.activeButtonID = 3;
		}

		ic.toggleRight = function toggleRight() {
			$ionicSideMenuDelegate.toggleRight();
		};

		ic.buttonClick = function buttonClick(color_id) {
			ic.activeButtonID = color_id;
			ic.riskFilter = {alert_color_id: color_id};
		};

		ic.assignClass = function assignClass(color_id) {
			var buttonClass = 'button-shape-default';
			if(ic.activeButtonID === color_id) {
				buttonClass = 'button-shape-pressed';
			}
			return buttonClass;
		};

		ic.cardTrim = function cardTrim(inv) {
			var cardTrimClass = 'sbux-green-trim';
			if (inv.alert_color === 'YELLOW') {
				cardTrimClass = 'sbux-yellow-trim';
			}
			else if (inv.alert_color === 'RED') {
				cardTrimClass = 'sbux-red-trim';
			}
			else if(inv.alert_color === 'GREEN') {
				cardTrimClass = 'sbux-green-trim';
			}
			return cardTrimClass;
		};

		ic.goBack = function goBack() {
			$state.go('chart');
			// if (ic.activeButtonID === ''){
			//     ic.buttonClick(3);
			// }
			// else if (ic.activeButtonID === 1){
			//     ic.activeButtonID = '';
			//     ic.buttonClick('');
			// }
			// else{
			//     var color_id = ic.activeButtonID -1;
			//     ic.buttonClick(color_id);
			// }
		};

		ic.goForward = function goForward(){
			if (ic.activeButtonID === '') {
				//ic.activeButtonID = 1;
				ic.buttonClick(1);
			}
			else if (ic.activeButtonID === 3) {
				//ic.activeButtonID = '';
				ic.buttonClick('');
			}
			else {
				var color_id = ic.activeButtonID + 1;
				ic.buttonClick(color_id);
			}
		};

		ic.clearSearch = function clearSearch(){
			console.log('clearSearch');
			ic.searchInput = '';
		};

		$scope.scrollTop = function() {
			$ionicScrollDelegate.getScrollView().scrollTo(0, 0, false);
			console.log('here scroll');
		};


		/* Detail & Action Selector Panel */

		ic.product = {};
		ic.isVisible = false;

		ic.toggle = function(product) {
			console.info('card controller toggled for ' + product.item_name);
			// console.debug(product);
			ic.product = product;
			ic.isVisible = !ic.isVisible;
			if (ic.isVisible === true) {
				ic.resetActions();
			}
		}

		ic.actions = {
			actionOptions: [
				{id: '', name: '-- not selected --'},
				{id: 'donate', name: 'Donate Expired Items'},
				{id: 'discard', name: 'Discard Expired Items'},
				{id: 'return', name: 'Return to Supplier'},
				{id: 'party', name: 'Throw a Party! (eat-em)'},
				{id: 'other', name: 'Other (?)'},
			],
			selectedOption: '',
			actionComments: null
		};

		ic.resetActions = function() {
				ic.actions.selectedOption = '';
				ic.actions.actionComments = null;
		}

		ic.showDetail = function(product) {
			console.info('show details for: ' + product.item_name);
			// console.debug(product);

			Object.getOwnPropertyNames(product).forEach(function(val, idx, array) {
				console.debug(val + ' : ' + product[val]);
			});

			ic.toggle(product);
		}

		ic.executeAction = function() {

			if (ic.actions.selectedOption !== 'none' && ic.actions.selectedOption !== '') {

				console.info('controller: execute action [' + ic.actions.selectedOption + '] for: ' + ic.product.item_name);
				// console.debug(ic.product);
				console.info(ic.actions.selectedOption + ' : ' + ic.actions.actionComments);

				console.warn('inventoryService.executeAction('+ic.product.item+', '+ic.actions.selectedOption+', '+ic.actions.actionComments+');');

				inventoryService.executeAction(ic.product.item, ic.actions.selectedOption, ic.actions.actionComments);

				// inventoryService.executeAction(ic.product.item, ic.actions.selectedOption, ic.actions.actionComments)
				//     .then (function (result) {
				//         console.info(result);
				//         alert(result);
				//     });
			}
		}

		/* DEVTOOL */
		//http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
		ic.viewportResolution = function vpr() {
			var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			var res = width + 'x' + height;
			// console.debug(res);
			return res;
		}
	}

})();
