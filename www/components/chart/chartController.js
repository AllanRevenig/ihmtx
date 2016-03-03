(function() { 
	'use strict';

	angular.module('ihmtApp.chart')
		.controller('ChartController',['$state', '$ionicViewSwitcher',ChartController]);

	function ChartController($state, $ionicViewSwitcher) {

		  console.log('chartController');

      var cc  = this;

      cc.ttlButtonClick = function ttlButtonClick(){
          $state.go('inventory');

      };

      cc.goForward = function goForward(){
        $state.go('inventory');
      };
		
          var chart = new Highcharts.Chart({
           chart: {
              renderTo: 'container',
              type: 'pie',
              options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0
              }

          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
           colors: ['#D50000','#FFD600','#1B5E20'],
          title: {
              text: 'Inventory Risk Level'
          },
          tooltip: {
              pointFormat: '<b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  depth: 35,
                  dataLabels: {
                      enabled: true,
                      format: '{point.name} <br> {point.percentage:.1f}%'
                  },
                 point: {
                    events: {
                        click: function () {                          
                          $ionicViewSwitcher.nextDirection('forward');

                           if (this.name==='High Risk'){
                                $state.go('inventory',{'risk':'high'});
                            }
                            else if (this.name==='Medium Risk'){
                                $state.go('inventory',{'risk':'medium'});
                            }
                            else if (this.name === 'Low Risk'){
                               $state.go('inventory',{'risk':'low'});
                            }
                                                    
                            //$state.go('inventory',{'risk':'high'});
                        }
                    }
                  }
                  
              }
          },
          series: [{
              type: 'pie',              
              data: [
                  ['High Risk', 22],
                  ['Medium Risk', 38],
                  ['Low Risk', 40]
              ]
          }]
    });

	}

})();