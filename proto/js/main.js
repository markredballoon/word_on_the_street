// =====     =====     =====     =====     =====     =====
// MAP
// =====     =====     =====     =====     =====     =====

var userPos = {lat:900.001, lng:900.001};

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
            $(document).trigger('positionFound');
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

// =====     =====     =====     =====     =====     =====
// Front End
// =====     =====     =====     =====     =====     =====
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


// =====     =====     =====     =====     =====     =====
// Communication
// =====     =====     =====     =====     =====     =====
function logIn(name, password){
    $.ajax({
        url: '../src/public/',
        type: 'GET',
        data: {
            action: 'login',
            username: name,
            password: password
        }
    })
    .done(function(data) {
        // Update cookies. create private that allows user to make posts in future.
        var respObj = JSON.parse(data);
        if (respObj.response === 'valid'){
            $('.user-image img' ,'#user-info').attr('src', respObj.userinfo.profile_picture);
            $('.user-name' ,'#user-info').html(respObj.userinfo.username);
            uiOpen('user-info');
        } else {
            console.log('incorrect');
        };

    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function logOut(){
    $('#ui').addClass('overwrite');
    setTimeout(function(){
        $('#ui').removeClass('overwrite');
        // Clear cookies then refresh page.
        $('.user-image img' ,'#user-info').attr('src', 'images/holding.jpg');
        $('.user-name' ,'#user-info').html('Username');
        $('#ui>div').addClass('hidden');
        $('#no-login').removeClass('hidden');
    }, 500)
}

function uiOpen(target){
    $('#ui').addClass('overwrite');

    setTimeout(function(){
        $('#ui').removeClass('overwrite');
        $('#ui>div').addClass('hidden');
        $('input[type="text"]', '#ui').val('');
        $('#'+target).removeClass('hidden');
    }, 500);
    $('.circle', '#ui').remove();
}

$('#sign-in-sumbit').on('click', function(event) {
    var inputName = $('input[name="username"]','#sign-in').val();
    var inputPassword = $('input[name="password"]','#sign-in').val();
    logIn(inputName, inputPassword);
    console.log(inputName);
});

$('input').keypress(function(e) {
    if(e.which == 13) {
        $(this).next('button').trigger('click');
    }
});
// =====     =====     =====     =====     =====     =====
// Ready
// =====     =====     =====     =====     =====     =====
$(document).ready(function($) {
    getLocation();

});

$(document).on('positionFound', function(event) {
    if (userPos.lat < 180 && userPos.lng < 180) {
        $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBewft-gujSQLIAa0jS_1LG8ceGBzt_EOU&callback=initMap" async defer></script>')
    }

});


$(window).resize(function(event) {
    map.panTo(userPos);
});
