(function() { 
	'use strict';

	angular.module('ihmtApp.inventory')
	.filter('search', function() {
		return function(data, riskFilter, searchInput) {
			//console.log('Riskfilter: ' + riskFilter);
			//console.log('searchInput: ' +searchInput);
			

			var holder = [];
			
			if (angular.isArray(data)) {
				for(var i=0; i<data.length; i++) {
					
					if(riskFilter && riskFilter.alert_color_id !== ''){
					
						if(data[i].alert_color_id == riskFilter.alert_color_id){
							//console.log('RiskFilter');

							if(searchInput){ //filter on searchInput
								if(data[i].item.indexOf(searchInput) != -1 ||
									data[i].item_name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].subinv.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].lot_num.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].expiry_dt.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].lot_qty.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].org.toLowerCase().indexOf(searchInput.toLowerCase()) != -1){

									holder.push(data[i]);
								}
							}
							else{  //no search input; only filter on riskFilter
								holder.push(data[i]);
							}
						}
					}
					else{//no riskFilter
						if(searchInput){ //filter on searchInput
								if(data[i].item.indexOf(searchInput) != -1 ||
									data[i].item_name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].subinv.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].lot_num.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].expiry_dt.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||
									data[i].lot_qty.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 ||								
									data[i].org.toLowerCase().indexOf(searchInput.toLowerCase()) != -1){
									holder.push(data[i]);
								}
							}
						else{  //no search input;
							holder.push(data[i]);
						}
					}
				}
			}

			return holder;
		};
	});
})();
