'use strict';

angular.module('autoDevBotDashboardApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.incidents = [];
    
    socket.on('msg', function(data) {
        $scope.incidents = JSON.parse(data.msg); // change data.msg to whatever is returned in api JSON
    });

  });
