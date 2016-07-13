var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
function toggleNav(){
    console.log('toggle nav');
}


function serverComunication( request ){
    //  Uses AJAX to communicate with the server
    $.ajax({
        url: '/path/to/file',
        type: 'default GET (Other values: POST)',
        dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {param1: 'value1'}
    })
    .done(function(data) {
        console.log("success");
        // Decode data?
        return data;
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
};


// Get the users position:
function getLocation(){

    var userPos = {lat:51, lng:1};

    if (navigator.geolocation) {
        // uses user location from device.
        navigator.geolocation.getCurrentPosition(function(position){
            userPos['lat'] = position.coords.latitude;
            userPos['lng'] = position.coords.longitude;
        }, function(){
            var fallbackoutput = locationFallback();
            userPos['lat'] = fallbackoutput.lat;
            userPos['lng'] = fallbackoutput.lng;
        });
    } else {
        var fallbackoutput = locationFallback();
        userPos['lat'] = fallbackoutput.lat;
        userPos['lng'] = fallbackoutput.lng;
    };

    return userPos;

}

function locationFallback(){

    var userPosIP;

    $.getJSON('http://ipinfo.io', function(data){
        var dataArray = data.loc.split(',');
        userPosIP = {
            lat: parseInt(dataArray[0]),
            lng: parseInt(dataArray[1])
        };
        console.log(dataArray);
    });
}
