adb.factory('socket', function() {
   var socket = io.connect();

    return {
        on: function(eventName, callback) { // Return callback to the actual function to manipulate it.
            socket.on(eventName, function() { 
                var args = arguments;   
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        }
    };

});