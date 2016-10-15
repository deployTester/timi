var mainView; 
var myApp;
var TIMI_MAP_KEY = "AIzaSyAAqBHCFbs_2Q3o7ZTAxID8Xnd3dUBUSdw"
var MEILIUER_MAP_KEY = "AIzaSyAPS31-ciKWpaymaHqoasAo_PEkBrM63OQ"; 
var GOOGLE_MAP_KEY = MEILIUER_MAP_KEY;
var GOOGLE_MAP_CORDOVA_KEY = "AIzaSyDHhSd9X_5XR4dgqFiYLJ4BSautAoMjomA";
var STATE_ZERO_ZOOM_LEVEL = 17; 
var STATE_ONE_ZOOM_LEVEL = 14;
var currentIndex = 0;
var latlngbounds; 
var genre = [];
var pickupLocation; 
var searchMap;
var PUBLIC_TRANSIT = 3; 
var CAR_POOL = 0; 
var CAR_STANDARD = 1;
var CAR_SUV = 2;
var testLocation1 = new google.maps.LatLng(40.7613964,-74.0007439); 
var testLocation2 = new google.maps.LatLng(40.7987994,-73.9665349);
var userLocation = []
var destinationLocation; 
var markerList = []
var UBER_CLIENT_ID = "ET_pFQfrjDvqnryx4KI1bdilRqEU6y_C"
var UBER_SERVER_TOKEN = "E1l8RUPDdfiEAi7ZXAA8io7XMK3ngPThrEE5VLZg"; 
var map; // for google map native 

function pickupLink (company, elem) {
    if (company == "uber") {
        var url = "uber://m.uber.com/ul?client_id=" + UBER_CLIENT_ID + "&action=setPickup&pickup[latitude]=" + pickupLocation.lat() + "&pickup[longitude]=" + pickupLocation.lng() + "&pickup[nickname]=" + $("#pickup").val() + "&pickup[formatted_address]=" + $("#pickup").val() + "&dropoff[latitude]=" + destinationLocation.lat() + "&dropoff[longitude]=" + destinationLocation.lng() + "&dropoff[nickname]=" + $("#destination").val() + "&dropoff[formatted_address]=" + $("#destination").val() + "&product_id=" + $(elem).attr("data-url") + "&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383"
        console.log(url)
        // var url = "uber://?client_id=" + UBER_CLIENT_ID + "&action=setPickup&pickup=my_location&pickup[formatted_address]=125%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103"
        window.open(url)
    } else if (company == "lyft") {
        var url = "lyft://ridetype?id=" + $(elem).attr("data-url") + "&pickup[latitude]=" + pickupLocation.lat() + "&pickup[longitude]=" + pickupLocation.lng() + "&destination[latitude]=" + destinationLocation.lat() + "&destination[longitude]=" + destinationLocation.lng()
        console.log(url)
        window.open(url)        
    } else if (company == "gett") {
        var url = "gett://ridetype?id=" + $(elem).attr("data-url") + "&pickup[latitude]=" + pickupLocation.lat() + "&pickup[longitude]=" + pickupLocation.lng() + "&destination[latitude]=" + destinationLocation.lat() + "&destination[longitude]=" + destinationLocation.lng()
        console.log(url)
        window.open(url)          
    } else if (company == "via") {
        var url = "via://"
        console.log(url)        
        window.open(url)
    } else if (company == "juno") {
        var url = "juno://"
        console.log(url)        
        window.open(url)
    } else if (company == "walking") {
        var url = "comgooglemaps://?saddr=" + pickupLocation.lat() + "," + pickupLocation.lng() + "&daddr=" + destinationLocation.lat() + "," + destinationLocation.lng() + "&directionsmode=walking"
        console.log(url)          
        window.open(url)        
    } else if (company == "subway") {
        var url = "comgooglemaps://?saddr=" + pickupLocation.lat() + "," + pickupLocation.lng() + "&daddr=" + destinationLocation.lat() + "," + destinationLocation.lng() + "&directionsmode=transit"
        console.log(url)          
        window.open(url)        
    }
}
var buttonState = [
    {
        text: "Set Pickup Location".toUpperCase(), 
        buttonFunction: function () {
            initState(1) 
            pickupLocation = searchMap.getCenter()
            setPickup(pickupLocation)               
        }
    }, 
    {
        text: "Set Drop Off Location".toUpperCase(), 
        buttonFunction: function () {
            initState(2) 
            destinationLocation = searchMap.getCenter()
            setDestination(destinationLocation)
        }
    }, 
    {
        text: "Get Best Rates!".toUpperCase(), 
        buttonFunction: function () {
            myApp.showIndicator()
            loadTimeFromServer(pickupLocation, destinationLocation);
        }
    }    
]

function ondeviceready() {
      // Set AdMobAds options:
    initApp()      
    try {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true);
    } catch(err) {

    }    

    try {
        admob.setOptions({
            publisherId:          "ca-app-pub-9125271183602018/8949621284",  // Required
            interstitialAdId:     "ca-app-pub-9125271183602018/5856554086",  // Optional
            // tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
            // tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
            // tappxShare:           0.5                                        // Optional
        });

        // Start showing banners (atomatic when autoShowBanner is set to true)
        // admob.createBannerView();
        // admob.requestInterstitialAd();        
    }  catch (err) {

    }


    // initApp()
    // var div = document.getElementById("map");
    // myApp.alert(1)
    // // Initialize the map view


    // Wait until the map is ready status.
    // map = plugin.google.maps.Map.getMap(document.getElementById("map"));  
    // map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);    
}
document.addEventListener("deviceready", ondeviceready, false);

function onMapReady() {
    var button = document.getElementById("pickup");
    var GOOGLE = new plugin.google.maps.LatLng(37.422858, -122.085065);
    map.setCenter(GOOGLE);  
    map.setZoom(16);  
    button.addEventListener("click", onBtnClicked);
}

function onBtnClicked() {
    // myApp.alert(3)
    // Move to the position with animation
    map.animateCamera({
        target: {lat: 37.422359, lng: -122.084344},
        zoom: 17,
        tilt: 60,
        bearing: 140,
        duration: 5000
    }, function() {

        // Add a maker
        map.addMarker(
            {
                position: {lat: 37.422359, lng: -122.084344},
                title: "Welecome to \n" +
                     "Cordova GoogleMaps plugin for iOS and Android",
                snippet: "This plugin is awesome!",
                animation: plugin.google.maps.Animation.BOUNCE
            }, function(marker) {

                // Show the info window
                marker.showInfoWindow();

                // Catch the click event
                marker.on(plugin.google.maps.event.INFO_CLICK, function() {

                // To do something...

            });
        });
    });
}

function setPickup (latlng) {
    var markerNow = new google.maps.Marker({
        position: latlng,
        map: searchMap,
        icon: "img/2744green.png", 
    });      

    // Format user input address, can be ignored if user used pin
    getAddressFromLatLng(latlng.lat(), latlng.lng(), function (data) {
        $("#pickup").val(data.results[0].formatted_address.split(",").slice(0,1));
    });

    // Do the marker
    markerList.push(markerNow);
    latlngbounds.extend(latlng);     
    pickupLocation = latlng;    
}
function setDestination (latlng) {
    var markerNow = new google.maps.Marker({
        position: latlng,
        map: searchMap,
        icon: "img/2744crimson.png", 
        // http://maps.gstatic.com/mapfiles/markers2/marker.png
    });       

    // Format user input address, can be ignored if user used pin
    getAddressFromLatLng(latlng.lat(), latlng.lng(), function (data) {
        $("#destination").val(data.results[0].formatted_address.split(",").slice(0,1));
    });

    // Do the marker
    markerList.push(markerNow);     
    destinationLocation = latlng
    latlngbounds.extend(latlng);     
}



function returnToState (index) {
    if (index == 0) {
        if (currentIndex != 0) {   
            console.log("changed!")
            initState(0)     
            markerList.map(function (unit){
                unit.setMap(null)
                return unit
            })           
            latlngbounds = new google.maps.LatLngBounds();
        } else {
            if ($("#pickup").val() != "" ) {
                $("#pickup-searchbox-clear").css("visibility", "visible"); 
            }            
        }        
    } else if (index == 1) {
        if (currentIndex > 1) {
            console.log("changed!")
            initState(1)   
            markerList[markerList.length-1].setMap(null);         
            latlngbounds = new google.maps.LatLngBounds();
            latlngbounds.extend(pickupLocation)              
        } else {
            if ($("#destination").val() != "" ) {
                $("#destination-searchbox-clear").css("visibility", "visible"); 
            }            
        }       

    }
}

function updatePersonalLocation (callback1, callback2) {
    navigator.geolocation.getCurrentPosition(function (position) {
        userLocation = [ position.coords.latitude, position.coords.longitude ]           
        if (callback1 != null) {
            callback1()
        }
    }, function (error) {
        if (callback2 != null) {
            callback2()
        }
    });     
}
function initApp() {

    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationErr); 
    $ = Framework7.$;
    myApp = new Framework7({
        swipeBackPage: true
    });    
    mainView = myApp.addView('.view-main', {
        domCache: true,
        dynamicNavbar: true, 
        onPageBeforeAnimation: function (app, page) {
            console.log(page)
        }
    });  
    initState(0)
    $("#pickup").on("change paste keyup", function() {
        returnToState(0)
    });  
    $("#pickup").on("focus", function () {
        if ($("#pickup").val() != "" ) {
            $("#pickup-searchbox-clear").css("visibility", "visible"); 
            $("#pickup").focus()
        }
        $("#pickup").css("text-align", "left");
    })
    $("#pickup").on("blur", function () {
        $("#pickup").css("text-align", "center");
        $("#pickup-searchbox-clear").css("visibility", "hidden"); 
    })    
    $("#destination").on("focus", function () {
        if ($("#destination").val() != "" ) {
            $("#destination-searchbox-clear").css("visibility", "visible"); 
            $("#destination").focus()
        }
        $("#destination").css("text-align", "left");
    })
    $("#destination").on("blur", function () {
        $("#destination-searchbox-clear").css("visibility", "hidden"); 
        $("#destination").css("text-align", "center");
    })        
    $("#destination").on("change paste keyup", function() {
        returnToState(1)
    });   
    $("#destination-li").click(function () {
        console.log(1)
        if (document.getElementById("pickup").value == "") {
            return; 
        } else {
            searchMap.setCenter(pickupLocation)              
            if (currentIndex == 0) {
                setPickup(pickupLocation)
                document.getElementById("destination").focus()
                initState(1)
            }                              
        }
      
    })   
    $("#destination").on("touchstart", function () {
        console.log(1)
        if (document.getElementById("pickup").value == "") {
            return; 
        } else {
            searchMap.setCenter(pickupLocation)              
            if (currentIndex == 0) {
                setPickup(pickupLocation)
                document.getElementById("destination").focus()
                initState(1)
            }                              
        }        
    });
    $("#current-position-button").click(function () {
        updatePersonalLocation (function () {
            var latlng = new google.maps.LatLng(parseFloat(userLocation[0]), parseFloat(userLocation[1])); 
            searchMap.setCenter(latlng);
            searchMap.setZoom(STATE_ZERO_ZOOM_LEVEL);            
        })        

    });
    $("#clear-button").click(function () {
        if (pickupLocation == null) {return;}
        $("#pickup").val("");
        $("#destination").val("");
        initState(0)
        markerList.map(function (unit){
            unit.setMap(null)
            return unit
        });
        getAddressFromLatLng(pickupLocation.lat(), pickupLocation.lng())        
        searchMap.setCenter(pickupLocation);
    })
}

function initState(index) {
    currentIndex = index
    document.getElementById("ETA-button").innerHTML = buttonState[currentIndex].text
    document.getElementById("ETA-button").onclick = function () {
        buttonState[currentIndex].buttonFunction()
    }    
    if (index == 0) {
        $(".centerMarker-green").css("display", "block")
        $(".centerMarker-red").css("display", "none")        
        if (markerList.length > 0) {
            markerList[markerList.length-1].setMap(null);
        }    
        if (searchMap!= null)     {
            searchMap.setZoom(STATE_ZERO_ZOOM_LEVEL);                
        }
 
        latlngbounds = new google.maps.LatLngBounds();
    } else if (index == 1){
        $(".centerMarker-green").css("display", "none")
        $(".centerMarker-red").css("display", "block")  
        searchMap.setZoom(STATE_ONE_ZOOM_LEVEL);         
    } else {
        setTimeout(function () {
            // searchMap.setZoom(16);             
            searchMap.fitBounds(latlngbounds)
        }, 400)             
        $(".centerMarker-green").css("display", "none")
        $(".centerMarker-red").css("display", "none")          
    }
}
function getResult () {
    mainView.router.loadPage({
        "pageName": "result", 
    }); 
    function badge(item, index) {
        if (item.text.toLowerCase() == "walking" || item.text.toLowerCase() == "subway") {
            return ""
        }
        if (index == 0) {
            return "<span class='recommended'>RECOMMEND</span>"
        } else if (item.text.indexOf("SUV") != -1 || item.text.indexOf("BLACK") != -1) {
            return "<span class='recommended' style='background:black;'>LUXURY</span>"
        }
        else {
            return ""
        }
        
    }
    $("#fare-chart ul").html(genre.map(function (unit) {
        var htmlString = '<li class="list-group-title">' + unit.title + '</li>'; 
        unit.items.sort(pSort)
        htmlString += unit.items.map(function (item, i) {
            return '<li ' + (item.htmlAttr || "") + '>' +
            '  <a class="item-content" onclick="pickupLink(\'' + item.company + '\', this)" data-url="' + item.product_id + '">' +
            '    <div class="item-media"><img class="result-icon" src="' + item.logo + '"></div>'+
            '    <div class="item-inner">' +
            '      <div class="item-title-row">' +
            '        <div class="item-title">' + item.text + badge(item, i) + '</div>' +
            '        <div class="item-after">' + ((item.displayPrice!=-1) ? ('$' + item.displayPrice) : "") + '</div>' +
            '      </div>' +
            '      <div class="item-text">' + ((item.ETA!=-1) ? (item.ETA +' min away') : "") + '</div>' +
            '    </div>' +
            '  </a>' +
            '</li>';
        }).join(""); 
        return htmlString; 
    }).join(""));     
    getDistance(pickupLocation, destinationLocation)
}

function oneCallGetDistance (origin, destination) {
    // var url = "https://maps.googleapis.com/maps/api/directions/json?language=en&key="+GOOGLE_MAP_KEY
    //     $.ajax({
    //       url: url, 
    //       type: "GET", 
    //       dataType: "jsonp", 
    //       data: {
    //         origin: origin.toUrlValue(), 
    //         destination: destination.toUrlValue(), 
    //       }, 
    //       success: function (results, state){
    //         ff = results;
    //         gg = state;
    //         // if (state )
    //         console.log(results, state);
    //       }});
    //     return;    
}
function getDistance(origin, destination) {



    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, function (response, status) {
        console.log(response.rows[0].elements[0].distance.text)
        console.log(response.rows[0].elements[0].duration.text)
        var distance = response.rows[0].elements[0].distance.text
        var duration = response.rows[0].elements[0].duration.text
        $("#walking").find(".item-text").html(distance + " - " + duration)   
      });   
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, 
      function (response, status) {
        console.log(response.rows[0].elements[0].distance.text)
        console.log(response.rows[0].elements[0].duration.text)
        var distance = response.rows[0].elements[0].distance.text
        var duration = response.rows[0].elements[0].duration.text   
        $("#subway").find(".item-text").html(distance + " - " + duration)        
      });   
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, 
      function (response, status) {
        console.log(response.rows[0].elements[0].distance.text)
        console.log(response.rows[0].elements[0].duration.text)
        var distance = response.rows[0].elements[0].distance.text
        var duration = response.rows[0].elements[0].duration.value   // in second      
        var distanceVal = parseFloat(distance);
        // var durationVal = parseFloat(duration); 
        // if (distanceVal < 0.3)
        var taxiFare = nycCabFare(distanceVal, duration)
        if (taxiFare < genre[CAR_STANDARD].items[0].displayPrice) {
            $("#taxi").find(".item-after")[0].innerHTML = "<span class='color-green'>$"+taxiFare + "</span>"
            $("#taxi").find(".item-text")[0].innerHTML = "Take it if you can hail one"
        } else {
            $("#taxi").find(".item-after")[0].innerHTML = "$"+taxiFare;
            $("#taxi").find(".item-text")[0].innerHTML = "-"
        }        
      });               
}
// Gett: $2.55 plus $1.75 per mile plus $0.35 per minute
function nycGettStandardFare(distance, duration) {
    var price = 2.55 + 1.75 * distance + 0.35 * duration / 60
    return price.toFixed(2)
}

function nycCabFare(distance, duration){
// Meter Drop
// $3.00 for First 1/9 Mile

// Travel
// $0.30 for each Additional 1/9 Mile

// Waiting Time
// $0.30 for every 30 Seconds or $36.00 per Hour    
// 0.315???
    var price; 
    if (distance < 0.11) {
        // $3 for first 1/9
       price = duration / 3600 * 36 + 3; 
    } else if (distance > 0.11) {
        price = 3 + (distance - 0.111) * 0.315 + duration / 3600 * 36
    }
    return price.toFixed(2);
}

function placeService (queryText, callback) {
    console.log(queryText)
    if (queryText == "") {
        console.log("empty");
        return;
    }
    var request = {
        query: queryText,         
        location: searchMap.getCenter(),
        radius: '20000', 
        keyword: 'address'
    };    
    function autocompleteFormat (unit) {
        unit.formatted_address = unit.formatted_address || unit.vicinity
        if (unit.name == unit.formatted_address.split(",").slice(0,1)) {
            return  '        <div class="item-title">' + unit.formatted_address.split(",").slice(0,1) + '</div>' +
                    '        <div class="item-after">' + unit.formatted_address.split(",").slice(1,2) + '</div>'
        } else {
            return  '        <div class="item-title">' + unit.name + '</div>' +
                    '        <div class="item-after">' + unit.formatted_address.split(",").slice(0,2) + '</div>'
        }

    }
    var placeService = new google.maps.places.PlacesService(searchMap);
    placeService.textSearch(request, function (results, status) {
        console.log(results)
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            $("#suggest-list").css("display", "block");
            // for (var i = 0; i < results.length; i++) {
            //     var place = results[i];
            //     console.log
            //     // createMarker(results[i]);
            // }
            var list = results
            cc = results
            $("#suggest-list ul").html(list.map(function (unit, index) {
                console.log(unit, index)
                return   ' <li onclick="assignAddress(this, ' + index + ')">'+
                  '     <a class="item-content">'+
                    '    <div class="item-media"><i class="fa fa-map-marker"></i></div>'+                  
                    '    <div class="item-inner">' +
                    '      <div class="item-title-row">' +
                            autocompleteFormat(unit) + 
                    '      </div>' +
                    // '      <div class="item-text">' +  + '</div>' +
                    '    </div>' +
                  '     </a>'+
                  ' </li>'
            }).join(""));        
            if (callback!=null) {        
                callback(list)
            }               
            console.log(results)
        }        
    });    
}
function assignAddress(elem, index) {
    eee = elem;
    var address = $(elem).find(".item-title")[0].innerHTML
    // address = (address == "") ? $(elem).find(".item-title")[0].innerHTML : ""
    console.log(address)
    if (currentIndex == 0) {
        $("#pickup").val(address);         
        enterLocation(new google.maps.LatLng(cc[index].geometry.location.lat(),cc[index].geometry.location.lng())); 
        $("#suggest-list ul").html([].join(""));             
        // give histroy location
    } else if (currentIndex == 1) {
        $("#destination").val(address); 
        enterLocation(new google.maps.LatLng(cc[index].geometry.location.lat(),cc[index].geometry.location.lng()))
        $("#suggest-list").css("display", "none");

    } else {
        console.log("WTF state2")
    }
    console.log(elem)
}

var VIA_TYPE_ITEM = {
    company: "via", 
    logo: "img/via.png",
    text: "Via", 
    avgPrice: 6.95,
    displayPrice: 6.95, 
    ETA: Math.round(Math.random() * 10),     
}; 
var JUNO_TYPE_ITEM = {
    company: "juno", 
    logo: "img/juno-2.png",
    text: "Juno", 
    avgPrice: 6,
    displayPrice: 6, 
    ETA: Math.round(Math.random() * 10), 
}; 
var GETT_STANDARD_TYPE_ITEM = {
    company: "gett", 
    logo: "img/gett.png",
    text: "Gett Standard", 
    avgPrice: 12,
    displayPrice: 12, 
    ETA: Math.round(Math.random() * 10),  
}       
var GETT_DEAL_TYPE_ITEM = {
    company: "gett", 
    logo: "img/gett.png",
    text: "Gett Deal", 
    avgPrice: 12,
    displayPrice: 12, 
    ETA: Math.round(Math.random() * 5) + 4, 
}
var GETT_SUV_TYPE_ITEM = {
    logo: "img/gett.png",
    text: "Gett SUV", 
    avgPrice: Math.round(Math.random() * 20),
    displayPrice: "$6", 
    ETA: Math.round(Math.random() * 700), 
}
function loadCarType (location) {

}

function loadTimeFromServer (origin, destination) {
 genre = [

{
    title: "Car Sharing <span class='title-description'>(price for 1, +$1 for 2)</span>", 
    items: [
    ]
}, 
{
    title: "Standard <span class='title-description'>(4 seats)</span>", 
    items: [

    {
        company: "taxi",         
        logo: "img/taxi.png",
        text: "Taxi", 
        avgPrice: 100,
        displayPrice: 6, 
        ETA: -1, 
        htmlAttr: "id='taxi'", 
    }, 

 

    ]
}, 
{
    title: "SUV <span class='title-description'>(6 seats)</span>", 
    items: [

    ], 
}, 
{
    title: "Walking or subway", 
    items: [
    {
        logo: "img/subway.png", 
        company: "subway", 
        text: "Subway", 
        avgPrice: -1, 
        displayPrice: -1, 
        ETA: -1, 
        htmlAttr: "id='subway'", 
    }, {
        logo: "img/walk.png", 
        text: "Walking", 
        company: "walking", 
        avgPrice: -1, 
        displayPrice: -1, 
        ETA: -1, 
        htmlAttr: "id='walking'", 
    }, 
    ]
}, 
];    
    try {
        $.ajax({
          url: "http://gettimi.com/site/GetUberEstimates", 
          type: "GET", 
          dataType: "jsonp", 
          data: {
            start_latitude: origin.lat(), 
            start_longitude: origin.lng(), 
            end_latitude: destination.lat(), 
            end_longitude: destination.lng(), 
          }, 
          success: function (data) {
            // myApp.hideIndicator()
            uberList = JSON.parse(JSON.parse(data).total); 
            uberList.map(function (unit) {
                if (unit.localized_display_name.toLowerCase().indexOf("pool") != -1) {
                    parseUberUnit(unit, CAR_POOL); 
                } else if (unit.localized_display_name == "uberX") {
                    parseUberUnit(unit, CAR_STANDARD); 
                } else if (unit.localized_display_name == "UberBLACK") {
                    parseUberUnit(unit, CAR_STANDARD); 
                } else if (unit.localized_display_name == "uberXL") {
                    parseUberUnit(unit, CAR_SUV); 
                } else if (unit.localized_display_name == "SUV") {
                    parseUberUnit(unit, CAR_SUV);                     
                }
            }); 

            $.ajax({
              url: "http://gettimi.com/site/GetLyftEstimates", 
              type: "GET", 
              dataType: "jsonp", 
              data: {
                start_latitude: origin.lat(), 
                start_longitude: origin.lng(), 
                end_latitude: destination.lat(), 
                end_longitude: destination.lng(), 
              }, 
              success: function (data) {
                myApp.hideIndicator()
                lyftList = JSON.parse(JSON.parse(data).total); 
                console.log(lyftList)
                lyftList.map(function (unit) {

                        if (unit.display_name == "Lyft Line") {
                            parseLyftUnit(unit, CAR_POOL); 
                        } else if (unit.display_name == "Lyft") {
                            parseLyftUnit(unit, CAR_STANDARD); 
                        } else if (unit.display_name == "Lyft Plus") {
                            parseLyftUnit(unit, CAR_SUV); 
                        } else if (unit.display_name == "SUV") {
                            
                        }
                });                 
                getResult()        
              }, 
              error: function (err) {

                myApp.hideIndicator()
              }
            }); 




                 
          }, 
          error: function (err) {

            myApp.hideIndicator()
          }
        });          
    } catch (err) {
        myApp.hideIndicator()
    }
  
}
var pSort = function(a, b) {
    return a.avgPrice < b.avgPrice ? -1 : (a.avgPrice == b.avgPrice ? 0 : 1);
};
function parseLyftUnit (unit, categoryIndex) {
    var randomNum = Math.random()
    genre[categoryIndex].items.push({
        company: "lyft", 
        logo: "img/lyft.png",
        text: unit.display_name, 
        avgPrice: Math.round(((unit.estimated_cost_cents_max+unit.estimated_cost_cents_min) / 2 ) * 1 - 5 + 10 * randomNum) / 100,
        displayPrice: Math.round(((unit.estimated_cost_cents_max+unit.estimated_cost_cents_min) / 2 ) * 1 - 5 + 10 * randomNum) / 100, 
        ETA: Math.round(unit.pickupWaitingTime/60),  
        product_id: unit.ride_type                   
    })        
}
function parseUberUnit (unit, categoryIndex) {
    var randomNum = Math.random(); 
    var predictedPrice = Math.round(((unit.high_estimate+unit.low_estimate) / 2 ) * 100 - 5 + 10 * randomNum) / 100
    if (unit.localized_display_name.toLowerCase().indexOf("5") != -1) {
        predictedPrice = 5
    }

    genre[categoryIndex].items.push({
        company: "uber", 
        logo: "img/uber.png",
        text: unit.localized_display_name, 
        avgPrice: predictedPrice,
        displayPrice: predictedPrice, 
        ETA: Math.round(unit.pickupWaitingTime/60),  
        product_id: unit.product_id                   
    })    
}
var uberList = [];
function getAddressFromLatLng(lat, lng, callback) {
    gps = new google.maps.LatLng(lat,lng);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json",
      data: {
        latlng: lat + ',' + lng, 
        location: gps,
        key: GOOGLE_MAP_KEY, 
        rankBy: google.maps.places.RankBy.DISTANCE,
      }, 
      success: function (data) {
        parsedData = JSON.parse(data)
        if (parsedData.status == "OK") {
            var address = parsedData.results[0].formatted_address
            // console.log(address)
            // sort by distance
            if (callback != null) {
                callback (parsedData)
            } else {
                var cleanAddress = address.split(",").slice(0,1)
                if (currentIndex == 0) {
                    selectorId = "pickup"
                    if (cleanAddress != $("#"+selectorId).val()) {
                        blinkFillIn(selectorId, cleanAddress); 
                    }
                    
                } else if (currentIndex ==1) {
                    selectorId = "destination"
                    if (cleanAddress != $("#"+"pickup").val()) {
                        blinkFillIn(selectorId, cleanAddress); 
                    }
                } else {

                }                     
            }
       
        } else {
            // error
            console.log(data)
        } 
      }
    });
}

function blinkFillIn(selectorId, cleanAddress) {
    document.getElementById(selectorId).value = cleanAddress
    $("#"+selectorId).addClass("animated fadeIn"); 
    setTimeout(function () {
        $("#"+selectorId).removeClass("animated fadeIn"); 
    }, 500);      
}
function getLatLngFromAddress(address, callback) {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json",
      data: {
        address: address, 
        key: GOOGLE_MAP_KEY
      }, 
      success: function (data) {
        console.log(JSON.parse(data).results)
        var parsedData = JSON.parse(data); 
        if (parsedData.status == "OK") {
            var list = parsedData.results
            // $("#suggest-list ul").html(list.map(function (unit) {
            //     return   ' <li>'+
            //       '     <div class="item-content">'+
            //       '       <div class="item-inner">'+
            //       '         <div class="item-title "><i class="fa fa-map-marker"></i></div>'+
            //       // '         <div class="item-subtitle">'+
            //                     unit.formatted_address +
            //       // '         </div>'+
            //       '       </div>'+
            //       '     </div>'+
            //       ' </li>'
            // }).join(""));        
            if (callback!=null) {        
                callback(list)
            }            
        }

  
      }
    });
}
function enterAddress (address) {
    placeService(address, function (data) {
        console.log(data)
        var lat = data[0].geometry.location.lat()  
        var lng = data[0].geometry.location.lng()             
        var latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng))
        console.log(data)
        enterLocation(latlng);           
    })
    // getLatLngFromAddress(address, function (data) {

    // });    
}
function enterLocation (latlng) {
    if (currentIndex == 0) {
        initState(1)     
        pickupLocation = latlng           
        setPickup(latlng)
        searchMap.setCenter(latlng) 
        latlngbounds.extend(latlng)  
        document.getElementById("destination").focus()
        document.getElementById("destination").value = ""
        $("#suggest-list ul").html([].join(""));  

    } else if (currentIndex == 1) {
        initState(2)      
        destinationLocation = latlng           
        setDestination (latlng)
        latlngbounds.extend(latlng)  
        searchMap.fitBounds(latlngbounds)
        $("#suggest-list ul").html([].join(""));  

        setTimeout(function () {
            try{
                // Keyboard.close()
                $("#destination").blur()
            } catch (err) {
                
            }                       
        }, 400);                      
    }        
}
function enterpressalert(e, textarea){
    var code = (e.keyCode ? e.keyCode : e.which);
    console.log("index:"+currentIndex)
    if (currentIndex == 2) {
        return;
    }
    if(code == 13) { //Enter keycode  
        enterAddress(textarea.value)
    } else {
        placeService(textarea.value); 
    }
    if (textarea.value != "") {
        $(".clear-search-box").css("display", "block");
    }
}



function pageBack () {
    mainView.router.back();
    // mainView.hideNavbar();   
}

function getLocationSuccess (position) {
    userLocation = [ position.coords.latitude, position.coords.longitude ]    
    initMap (userLocation)
}
function getLocationErr () {
    console.log("no location plugin")
    userLocation = [ 40.7613964,-74.0007439 ]    
    initMap (userLocation)
}

var styles = [
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        // "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
] 

function initMap (position) { 
    var myLatLng = new google.maps.LatLng(parseFloat(position[0]), parseFloat(position[1])); 
    /* Map styling to get Fewer information, make map looks pretty */
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });      
    searchMap = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        clickableIcons: false,
        zoom: STATE_ZERO_ZOOM_LEVEL, 
        zoomControl: false, 
        scrollwheel: false, 
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }        
    });       
    searchMap.mapTypes.set('map_style', styledMap);
    searchMap.setMapTypeId('map_style');

    // While dragging, change the current address search bar
    searchMap.addListener('drag', function () {
        if (currentIndex <= 1) {
            $("#destination").blur()
        }
        if (currentIndex ==0) {
            $("#pickup").val("Pick Up At Pin")
        } else if (currentIndex ==1){
            $("#destination").val("Go To Pin")
        }        
    }); 
    // get current location and update the address bar          
    getAddressFromLatLng(position[0], position[1]); 

    // when drag finishes, location the address using map center
    google.maps.event.addListener(searchMap,'dragend', function() {
        if (currentIndex <= 1) {
            getAddressFromLatLng(searchMap.getCenter().lat(), searchMap.getCenter().lng(), function (data){
                point = data.results[0]
                console.log(point.address_components[3], point.address_components[5])
            })                 
        }
    });     
    // while focusing, close the keyboard when the user clicks map
    google.maps.event.addListener(searchMap,'click', function() {
        if (currentIndex <= 1) {
            setTimeout(function () {
                $("#pickup").blur();
                $("#destination").blur()
            }, 400)            
        }
        $("#suggest-list ul").html([].join("")); 
    }); 
    // map caching purposes
    google.maps.event.addListenerOnce(searchMap, 'tilesloaded', function(){
        console.log('Map loaded!');
    });
}

// little black x
// clear out current search box and set the state back
function clearSearchBox (selectorId) {

    $("#" + selectorId).val(""); 
    $("#" + selectorId).focus(); 
    if (selectorId == "pickup") {
        returnToState(0)        
    } else if (selectorId == "destination") {
        returnToState(1)
    }
}
// ondeviceready()

