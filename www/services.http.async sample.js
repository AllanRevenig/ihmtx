
// Karpov, Valeri; Netto, Diego (2015-04-17). Professional AngularJS (Kindle Locations 8100-8120). Wiley. Kindle Edition.

<div ng-controller =" MyController" >
	<h1>Google Stock Price: {{ price.quotes[ 0]. Ask}}</h1>
</div>
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript">
	var chapter7Module = angular.module('chapter7Module', []);
	chapter7Module.factory('$googleStock', function($http) {
		var BASE = 'http://query.yahooapis.com/v1/public/yql'
		var query = encodeURIComponent('select * from yahoo.finance.quotes where symbol in (\'GOOG\')');
		var url = BASE + '?' + 'q =' + query + '&format = json& diagnostics = true& env = http://datatables.org/alltables.env';
		var service = {};
		service.get = function() {
			$http.jsonp(url + '&callback = JSON_CALLBACK').success(function(data) {
				if (data.query.count) {
					var quotes = data.query.count > 1 ? data.query.results.quote : [data.query.results.quote];
					service.quotes = quotes;
				}
			}).error(function(data) {
				console.log(data);
			});
		};
		service.get();
		return service;
	});
	function MyController($scope, $googleStock) {
		$scope.price = $googleStock;
	}
</ script >
