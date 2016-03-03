/* global angular */
/* global cordova */
(function() {
'use strict';

	angular.module('ihmtApp', ['ionic','ngMessages','ngMockE2E','ui.router','angularRipple','ihmtApp.chart','ihmtApp.inventory'])
		.controller('ApplicationController', ['$scope','inventoryService', ApplicationController])
		.run(function($ionicPlatform) {
			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if(window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

					// Don't remove this line unless you know what you are doing. It stops the viewport
					// from snapping when text inputs are focused. Ionic handles this internally for
					// a much nicer keyboard experience.
					//!fix Anna removed this: cordova.plugins.Keyboard.disableScroll(true);
				}
				if(window.StatusBar) {
					window.StatusBar.styleDefault();
				}
			});
		});

	function ApplicationController($scope, inventoryService) {
		/*var ac = this;

		ac.inventory = [];

		inventoryService.initialize()
		.then (function (data){
			ac.inventory = data;
			console.log(ac);
			inventoryService.getInventory();
		});

		//
		$scope.cardTrim= function (){
		ac.cardTrim = function cardTrim(inv){
			var cardTrimClass = 'sbux-green-trim';
			if (inv.alert_color === 'YELLOW'){
				cardTrimClass = 'sbux-yellow-trim';
			}
			else if (inv.alert_color === 'RED'){
				cardTrimClass = 'sbux-red-trim';
			}
			else if(inv.alert_color === 'GREEN'){
				cardTrimClass = 'sbux-green-trim';
			}
			return cardTrimClass;
		};*/
	}

})();
