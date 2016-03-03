/* global angular */
(function() {
	'use strict';

	angular.module('ihmtApp').directive('sbxProductDetail', sbxProductDetail);

	function sbxProductDetail() {
		console.debug('enter sbxProductDetail directive');
		return {
			restrict: 'A',
			replace: true,
			scope: {
				product: '=',
				actions: '=',
				toggleAction: '&',
				execAction: '&'
			},
			templateUrl: 'components/inventory/directives/product-detail.html',
			link: function(scope, element, attrs) {
				console.info('inside sbxProductDetail directive link function');
				console.info(scope);
				console.info(element);
				console.info(attrs);

				scope.barTrim = function (product) {
					return (product.alert_color === 'YELLOW' ? 'sbux-color-yellow' : product.alert_color === 'RED' ? 'sbux-color-red' : 'sbux-color-green');
				};
				scope.textTrim = function (product) {
					return (product.alert_color === 'YELLOW' ? 'sbux-text-black' : 'sbux-text-white');
				};

				var propertyExclusions = ['record_id', 'org', 'item', 'item_name', 'lot_num', 'expiry_dt', 'subinv', 'lot_qty'];
				var filteredProductProperties = null;

				scope.filteredProduct = function(product) {
					console.info('filter properties for: ' + scope.product.item_name);

					if (filteredProductProperties == null) {
						var filtered = {};
						for (var k in product) {
							console.info(k);
							if (propertyExclusions.indexOf(k) < 0) {
								filtered[k] = product[k];
							}
							else {
								console.warn(k);
							}
						}
						filteredProductProperties = filtered;
					}

					return filteredProductProperties;
				};

				scope.returnToCards = function() {
						console.info('dismiss details for: ' + scope.product.item_name);
						// alert('dismiss details for: ' + scope.product.item_name);
						scope.toggleAction(scope.product);
				}

				scope.executeAction = function(isValid) {
					if (isValid) {
						console.info('directive: execute action [' + scope.actions.selectedOption + '] for: ' + scope.product.item_name);
						// alert('execute action [' + scope.actions.selectedOption + '] for: ' + scope.product.item_name);
						scope.toggleAction(scope.product);
						scope.execAction();
					}
					else {
						console.error("Ooops! Action form fields contain errors!");
					}
				}
			}
		};
	}
})();
