
var app = angular.module('app',[]);

app.controller('ctrl', function($scope, $timeout){

  $scope.di = false;
  
  $scope.ratio = '';
  
  $scope.diStatus = 'A Debt 2 Income ratio of 20% or less is regarded as a great proportion of spare income to outgoing expenses!';
  
  $scope.credit = '0';
  $scope.car = '0';
  $scope.other = '0';

   $scope.revealGraph = function(){
			 
 			 $scope.di = true;
			 
			 var debts = (Number($scope.credit) + Number($scope.car) + Number($scope.other))*12;
			 
			 $scope.realDI = debts/Number($scope.salary);

			 $scope.ratio = 'Your Debt to Income Ratio is: ';	

			 $scope.remainderIncome = 	(Number($scope.salary)/12) - (Number($scope.credit) + Number($scope.car) + Number($scope.other));
			 
			 var svg = dimple.newSvg("#chartContainer", 590, 400);
			 
				var data2 = [
					  { "Criteria":"Rest of Income", "Cost": $scope.remainderIncome},
					  { "Criteria":"Credit Cards", "Cost": $scope.credit},
					  { "Criteria":"Car Loans", "Cost": $scope.car},
					  { "Criteria":"Other", "Cost":  $scope.other}
					];
				   
					  var myChart = new dimple.chart(svg, data2);
					  myChart.setBounds(20, 20, 460, 360);
					  myChart.addMeasureAxis("p", "Cost");
					  myChart.addSeries("Criteria", dimple.plot.pie);
					  myChart.addLegend(500, 20, 90, 300, "left");
					  myChart.draw(); 
					  
			 if($scope.realDI < .25){
				 
				 $scope.diStatus = 'You have a great Debt 2 Income Ratio! Way to stay on top of debt obligations!';
				 
			 }else{
				 
				 $scope.diStatus = 'Your Debt 2 Income needs improvement. Decrease credit utilization, pay off car loan principal and other debtors for more control of your financial future!';
				 
			 }
					  
     };
			
	//$scope.dti = $timeout( function(){ $scope.revealGraph(); }, 60000);
	 
   
   /* $scope.clear = function(){
		 
		   $scope.salary = '';
		   $scope.credit = '';
		   $scope.car = '';
		   $scope.other = '';
		   
		   $scope.remainderIncome = 0;
		   
		   $scope.di = false;
		 
   };	*/ 
   
 });
 
app.filter('percento', ['$filter', function($filter){
	
	return function(input, decimals){
		
		return $filter('number')(input * 100, decimals) + '%';
		
	};	
	
}]);



