$( document ).ready(function() {

    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    } ();

    console.log(QueryString.user_id);
    console.log(QueryString.temp_key);

    // Connect to the socket.io interface
    var socket = io.connect('https://api.autodevbot.com');

    //socket.emit('subscribe-event-stream', {user_id:'b9e45b2320a544b8b017fbf60fb04247', authToken:'5502ebcd7ba71584964731f1a34197c5'});
    socket.emit('subscribe-event-stream', {user_id: QueryString.user_id, authToken: QueryString.temp_key});

    socket.on('subscribe-event-stream', function (data) {
        //console.log(data);
        var event = JSON.parse(data);

        console.log('user_id: '+event.user_id);

        if(event.eventType.toLowerCase() == 'monitoring_frisbyjs'){

            if(event.testStatus.toLowerCase() == 'success'){
                // Success row
                $('#tableEvents').prepend('<tr><td>'+event.queue_event_id.substring(0,10)+'</td><td>'+event.eventType+'</td><td>'+event.createdOn+'</td><td><span class="label label-success">'+event.testStatus+'</span></td><td>'+event.testResultJSON.testsuites.testsuite[0].$.name+'</td><td>-</td></tr>');
            }
            if(event.testStatus.toLowerCase() == 'failure'){
                // Failure row
                $('#tableEvents').prepend('<tr><td>'+event.queue_event_id.substring(0,10)+'</td><td>'+event.eventType+'</td><td>'+event.createdOn+'</td><td><span class="label label-danger">'+event.testStatus+'</span></td><td>'+event.testResultJSON.testsuites.testsuite[0].$.name+'</td><td>'+event.testResultJSON.testsuites.testsuite[0].testcase[0].failure+'</td></tr>');
            }
        }else if(event.eventType.toLowerCase() == 'system_provisioning'){
            $('#tableEvents').prepend('<tr><td>-</td><td>'+event.eventType+'</td><td>'+event.createdOn+'</td><td><span class="label label-default">'+event.status+'</span></td><td>'+event.item+'</td><td>'+event.description+'</td></tr>');
        }

        // Prune table
        var rowCount = $('#tableEvents tr').length;
        console.log('rowCount: '+rowCount);
        $("#tableEvents tr:eq(20)").remove();
    });
});