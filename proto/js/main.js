var userPos = {lat:51.001, lng:1.001};

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: userPos,
        zoom: 14,
        MaxZoom:14,
        MinZoom:14,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        panControl: false,
        keyboardShortcuts: false
    });
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
    if (navigator.geolocation) {
        // uses user location from device.
        navigator.geolocation.getCurrentPosition(function(position){
            userPos.lat = position.coords.latitude;
            userPos.lng = position.coords.longitude;
            $(document).trigger('positionFound');
        }, function(){
            var fallbackoutput = locationFallback();
            userPos.lat = fallbackoutput.lat;
            userPos.lng = fallbackoutput.lng;
        });
    } else {
        var fallbackoutput = locationFallback();
        userPos.lat = fallbackoutput.lat;
        userPos.lng = fallbackoutput.lng;
    };
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

$(document).ready(function($) {
    getLocation();
});

$(document).on('positionFound', function(event) {
    $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBewft-gujSQLIAa0jS_1LG8ceGBzt_EOU&callback=initMap" async defer></script>')
});



//
var element, circle, d, x, y;
$("button").click(function(e){

	element = $(this);

	if(element.find(".circle").length == 0)
		element.prepend("<span class='circle'></span>");

	circle = element.find(".circle");
	circle.removeClass("animate");

	if(!circle.height() && !circle.width())
  {
		d = Math.max(element.outerWidth(), element.outerHeight());
		circle.css({height: d, width: d});
	}

	x = e.pageX - element.offset().left - circle.width()/2;
	y = e.pageY - element.offset().top - circle.height()/2;

	circle.css({top: y+'px', left: x+'px'}).addClass("animate");
})
