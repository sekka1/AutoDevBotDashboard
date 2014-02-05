/* Controllers */

app.controller('StockListCtrl', function($scope, socket) { 
  $scope.stocks = [];

	// socket.on('getMonitoringEvents_stat', function(data) {
	// 	$scope.incidents = JSON.pase(data);
	// 	console.log($scope.incidents);
	// });

  socket.on('msg', function(data) {
		$scope.stocks = JSON.parse(data);
		//$scope.notes.push(data);
	});
  
});

app.factory('socket', function($rootScope) {
	var socket = io.connect();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		}
	};
});