$( document ).ready(function() {

    // Connect to the socket.io interface
    var socket = io.connect('http://localhost:8080');

    socket.emit('subscribe-event-stream', {user_id:'b9e45b2320a544b8b017fbf60fb04247', authToken:'5502ebcd7ba71584964731f1a34197c5'});

    socket.on('subscribe-event-stream', function (data) {
        //console.log(data);
        var event = JSON.parse(data);

        console.log('user_id: '+event.user_id);

        if(event.testStatus.toLowerCase() == 'success'){
            // Success row
            $('#tableEvents').prepend('<tr><td>'+event.queue_event_id.substring(0,10)+'</td><td>'+event.eventType+'</td><td>'+event.createdOn+'</td><td><span class="label label-success">'+event.testStatus+'</span></td><td>'+event.testResultJSON.testsuites.testsuite[0].$.name+'</td><td>-</td></tr>');
        }
        if(event.testStatus.toLowerCase() == 'failure'){
            // Failure row
            $('#tableEvents').prepend('<tr><td>'+event.queue_event_id.substring(0,10)+'</td><td>'+event.eventType+'</td><td>'+event.createdOn+'</td><td><span class="label label-danger">'+event.testStatus+'</span></td><td>'+event.testResultJSON.testsuites.testsuite[0].$.name+'</td><td>'+event.testResultJSON.testsuites.testsuite[0].testcase[0].failure+'</td></tr>');
        }

        // Prune table
        var rowCount = $('#tableEvents tr').length;
        console.log('rowCount: '+rowCount);
        $("#tableEvents tr:eq(20)").remove();
    });

});