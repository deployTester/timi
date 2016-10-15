



var isApp = false;
var isOnline = false;

var LYFT_REFERAL_LINK = "https://www.lyft.com/invite/BEFORETAXI?route_key=invite&v=OUT";
var LYFT_REFERAL_CODE = "BEFORETAXI";
var LYFT_REFERAL_LINK = "https://www.lyft.com/invite/BEFORETAXI?route_key=invite&v=OUT";
var LYFT_REFERAL_CODE = "BEFORETAXI";
var UBER_CLIENT_ID = "ET_pFQfrjDvqnryx4KI1bdilRqEU6y_C"
var UBER_SERVER_TOKEN = "E1l8RUPDdfiEAi7ZXAA8io7XMK3ngPThrEE5VLZg"; 
var userLocation = [ 40.7613964,-74.0007439 ]  
var TIMI_MAP_KEY = "AIzaSyAAqBHCFbs_2Q3o7ZTAxID8Xnd3dUBUSdw"
var MEILIUER_MAP_KEY = "AIzaSyAPS31-ciKWpaymaHqoasAo_PEkBrM63OQ"; 
// var BEFORETAXI_KEY = "AIzaSyCj2U0IdilRj6Dl4xFCL4qmvuJ8rMRbtaQ";
var FASTENCODE = "RA6493"
var GOOGLE_MAP_KEY = TIMI_MAP_KEY;
var GOOGLE_MAP_CORDOVA_KEY = "AIzaSyDHhSd9X_5XR4dgqFiYLJ4BSautAoMjomA";
var STATE_ZERO_ZOOM_LEVEL = 17; 
var STATE_ONE_ZOOM_LEVEL = 14;
var CAR_POOL = 0; 
var CAR_STANDARD = 1;
var CAR_SUV = 2;
var PUBLIC_TRANSIT = 3; 
var currentIndex = 0;
var latlngbounds; 
var pickupLocation; 
var destinationLocation; 
var pickupObject;
var destinationObject; 
var searchMap;
var mainView; 
var myApp;
var testLocation1;
var testLocation2;
var tripList = getTripList();
var autocomplete; 
var admob;
var push_notification; 



var genre = [];
var markerList = [];
var toDoAfterResume = [];

var map; // for google map native 

function appReturnedFromBackground () {
    console.log("WTF background")
    if ( push_notification != null ) {
        push_notification.setApplicationIconBadgeNumber(function() {
            console.log('success clearBadge');
        }, function() {
            console.log('error clearBadge');
        }, 0);            
    }      
    if (toDoAfterResume.length == 0) {
        // return;
    } else {
        var func = toDoAfterResume[toDoAfterResume.length-1]
        func()
        toDoAfterResume.pop()
    }

 
    
}
 


var strVar="";
var scriptHTML = document.getElementById("script").innerHTML; 
strVar += "    <!-- Status bar overlay for fullscreen mode-->";
strVar += "    <div class=\"statusbar-overlay\"><\/div>";
strVar += "    <!-- Panels overlay-->";
strVar += "    <div class=\"panel-overlay\"><\/div>";
strVar += "    <!-- Left panel with reveal effect-->";
strVar += "    <div class=\"panel panel-left panel-reveal\">";
strVar += "      <div class=\"content-block\">";
strVar += "        <p>Left panel content goes here<\/p>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "    <!-- Right panel with cover effect-->";
strVar += "    <div class=\"panel panel-right panel-cover\">";
strVar += "      <div class=\"content-block\">";
strVar += "        <p>Right panel content goes here<\/p>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "    <!-- Views-->";
strVar += "    <div class=\"views\">";
strVar += "      <!-- Your main view, should have \"view-main\" class-->";
strVar += "      <div class=\"view view-main\">";
strVar += "        <!-- Top Navbar-->";
strVar += "        <div class=\"navbar\">";
strVar += "";
strVar += "          <div class=\"navbar-inner\" data-page=\"index\">  ";
strVar += "            <div class=\"left\"><a><\/a><\/div>                 ";
strVar += "            <div class=\"center\" onclick=\"ads()\">Real Time Best Taxi Fare<\/div>";
strVar += "            <div class=\"right\"><a><\/a><\/div>              ";
strVar += "          <\/div>";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"result\">  ";
strVar += "            <div class=\"left\"><a class=\"link left-link\" onclick=\"pageBack()\"><li class=\"fa fa-chevron-left\"><\/li><\/a><\/div>                 ";
strVar += "            <div class=\"center \">Search Results<\/div>";
strVar += "            <div class=\"right\"><a><\/a><\/div>              ";
strVar += "          <\/div>          ";
strVar += "        <\/div>";
strVar += "";
strVar += "        <div class=\"pages navbar-through toolbar-through\">";
strVar += "          <!-- Page, data-page contains page name-->";
strVar += "          <div data-page=\"index\" class=\"page \">";
strVar += "            <div class=\"page-content\">";
strVar += "              <form id=\"my-form\" class=\"list-block startend-form\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <a class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title \"><i class=\"fa fa-circle color-green\"><\/i><\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input type=\"text\" onfocus=\"this.setSelectionRange(0, 9999);\" onkeyup=\"enterpressalert(event, this)\" class=\"\" id=\"pickup\" placeholder=\"Enter Pickup Location\">";
strVar += "                        <div class=\"clear-search-box\" id=\"pickup-searchbox-clear\" onclick=\"clearSearchBox('pickup')\"><i style=\"margin: 0px 4px;\" class=\"fa fa-times\"><\/i><\/div> ";
strVar += "                        <\/div>";
strVar += "                         ";
strVar += "                      <\/div>";
strVar += "                    <\/a>";
strVar += "                  <\/li>";
strVar += "                  <li id=\"destination-li\">";
strVar += "                    <a class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title \"><i class=\"fa fa-circle color-red\"><\/i><\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input type=\"text\" onfocus=\"this.setSelectionRange(0, 9999);\" class=\"\" id=\"destination\" onkeyup=\"enterpressalert(event, this)\" placeholder=\"Enter Destination\">";
strVar += "                        <\/div>";
strVar += "                        <div class=\"clear-search-box\" id=\"destination-searchbox-clear\" onclick=\"clearSearchBox('destination')\"><i style=\"margin: 0px 4px;\" class=\"fa fa-times\"><\/i><\/div>                          ";
strVar += "                      <\/div>";
strVar += "                    <\/a>";
strVar += "                  <\/li>                  ";
strVar += "                <\/ul>";
strVar += "              <\/form>            ";
strVar += "              <div id=\"map\"><\/div>";
strVar += "              <div class=\"centerMarker-green\"><\/div>";
strVar += "              <div class=\"centerMarker-red\" style=\"display:none\"><\/div>              ";
strVar += "";
strVar += "              <div id=\"suggest-list\" class=\"list-block\">       ";
strVar += "                <ul>                                                   ";
strVar += "                <\/ul>                ";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "            <a href=\"#\" id=\"ETA-button\" class=\"link button button-fill \"><\/a>      ";
strVar += "            <a href=\"#\" id=\"current-position-button\" class=\"link \"><i class=\"fa fa-location-arrow\"><\/i><\/a>           ";
strVar += "            <a href=\"#\" id=\"clear-button\" class=\"link \"><i class=\"fa fa-repeat\"><\/i>RESET<\/a>                        ";
strVar += "          <\/div>";
strVar += "          <div data-page=\"result\" class=\"page cached\">";
strVar += "            <div class=\"page-content contacts-content\">";
strVar += "              <div id=\"result-form\" class=\"list-block startend-form\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <a class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title \"><i class=\"fa fa-circle color-green\"><\/i><\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input type=\"text\" onfocus=\"this.blur()\" class=\"\" id=\"pickup-result\" placeholder=\"Enter Pickup Location\">";
strVar += "                        <\/div>                         ";
strVar += "                      <\/div>";
strVar += "                    <\/a>";
strVar += "                  <\/li>";
strVar += "                  <li id=\"destination-result-li\">";
strVar += "                    <a class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title \"><i class=\"fa fa-circle color-red\"><\/i><\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input type=\"text\" onfocus=\"this.blur()\" id=\"destination-result\"  placeholder=\"Enter Destination\">";
strVar += "                        <\/div>                          ";
strVar += "                      <\/div>";
strVar += "                    <\/a>";
strVar += "                  <\/li>                  ";
strVar += "                <\/ul>";
strVar += "              <\/div>              ";
strVar += "              <div id=\"fare-chart\" class=\"list-block contacts-block media-list\">";
strVar += "                <ul>";
strVar += "                <\/ul>";
strVar += "              <\/div>                                   ";
strVar += "            <\/div>          ";
strVar += "          <\/div>          ";
strVar += "        <\/div>";
strVar += "         <div class=\"toolbar\">";
strVar += "          <div class=\"toolbar-inner\">";
strVar += "          <\/div>";
strVar += "        <\/div> ";
strVar += "      <\/div>";
strVar += "    <\/div>";
console.log(scriptHTML)
scriptHTML += ''
console.log(scriptHTML)
scriptHTML = "<div class='script'><script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key="+GOOGLE_MAP_KEY+"&libraries=places&language=en&callback=mapLoaded'></script>" + scriptHTML + "</div>"
console.log(scriptHTML)
strVar += scriptHTML;

// Mixpanel
(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);






document.getElementById("body-html").innerHTML = strVar




function initPush () {
    // console.log(isCordova)
    localStorage.allowedPush = 1; 
    // localStorage.allowedPush = "1"
    // var playSound = "true"
    // if (localStorage.muteSound == 1 ) {
    //     playSound = "false"
    // }
    // myApp.alert("init push")

    push_notification = PushNotification.init({
        android: {
            senderID: "566643745158"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true",
        },
        windows: {}
    });
    push_notification.setApplicationIconBadgeNumber(function() {
        console.log('success clearBadge');
    }, function() {
        console.log('error clearBadge');
    }, 0);    


    push_notification.on("registration", function(data) {
        device_token = data.registrationId;
        console.log(data)

        // cordova.plugins.clipboard.copy(data.registrationId)
        // console.log("get token")
        // device_type = "iOS" || ""
        // device_type = "Android"

        // if ( device != null ) { 
        //     device_type = device.platform || "iOS";
        // } else {
        //     device_type = "iOS"
        // }
        // if ( device_token != "" ) {
        //     var ajaxUrl = "http://gettimi.com/site/takeDeviceToken?user_token=" + 
        //         localStorage.usertoken + "&device_type=" + device_type + "&device_token=" + device_token
        //         console.log(ajaxUrl)
        //     $.ajax({
        //         url: ajaxUrl,
        //         type: "GET",
        //         dataType: "jsonp",
        //         success: function(results) {
        //             console.log(result)
        //         }, 
        //         error: function (results) {

        //         }
        //     });           
        // } else {
        //     console.log("device_token not found")
        // }        
    });
    push_notification.on("notification", function(data) {
        myApp.alert(data)
        // 1 friend sign uo
        // 2 someone liked
        // 3 matched

        // if (data.additionalData.type == "1") {

                // user = {
                //     "avatar": data.additionalData.avatar,
                //     "username": data.additionalData.username,
                //     "phone": data.additionalData.phone, 
                //     "email": data.additionalData.email, 
                //     "user_id": data.additionalData.sender_id, 
                //     "geolocation": data.additionalData.geolocation,  // might cause bug
                //     "favorites": data.additionalData.favorites,   // might cause bug
                //     "whatsup": data.additionalData.whatsup,   // might cause bug
                //     "day": data.additionalData.day, 
                //     "time": data.additionalData.time, 
                //     "chat_history" : []
                //     // [sender_id:49, sender_name:"Doe", sender_avatar:"", receiver_id:23, receiver_name: "XXX", receiver_avatar:""]
                // }      

        // window.cache.clear(clearCacheSuccess, clearCacheError);
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
        push_notification.finish(function() {
            console.log("processing of push data is finished")
        })
    });
    push_notification.on("error", function(e) {
        console.log("push error")
        // put system redirect
        myApp.alert("Please go to Settings - Timi - and turn on Push Notification access! ")
    })    
}



function openUrl(url, readerMode) {
    try {
      SafariViewController.isAvailable(function (available) {
        if (available) {
          SafariViewController.show({
                url: url,
                hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
                animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                transition: 'fade', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
                enterReaderModeIfAvailable: readerMode, // default false
                tintColor: "#464748", // default is ios blue
                barColor: "#464748", // on iOS 10+ you can change the background color as well
                controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
              },
              // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
              function(result) {
                if (result.event === 'opened') {
                  console.log('opened');
                } else if (result.event === 'loaded') {
                  console.log('loaded');
                } else if (result.event === 'closed') {
                  console.log('closed');
                }
              },
              function(msg) {
                console.log("KO: " + msg);
              })
        } else {
            myApp.alert("It looks like you are not using the newest version of BeforeTaxi. Please update to the newest version! ")
          // potentially powered by InAppBrowser because that (currently) clobbers window.open
          window.open(url, '_blank', 'location=yes');
        }
      });
    } catch (err) {
        myApp.alert("It looks like you are not using the newest version of BeforeTaxi. Please update to the newest version! ")
    }
}
console.log("loaded")

function ads () {
    openUrl("http://gettimi.com")
}

function pickupLink (company, elem) {

    mixpanel.track("bookride", {
        isApp: isApp,
        fromLatlng: pickupLocation.toUrlValue() ,
        toLatlng: destinationLocation.toUrlValue(), 
        fromAddress: pickupObject.formatted_address, 
        toAddress: destinationObject.formatted_address,
        company: company, 
        type: $(elem).find(".item-title")[0].innerHTML, 
        timeaway: $(elem).find(".item-text")[0].innerHTML, 
        price: $(elem).find(".item-after")[0].innerHTML,         
    });       
    if (company == "uber") {
        var url = "uber://?action=setPickup&pickup[latitude]=" + pickupLocation.lat() + "&pickup[longitude]=" + pickupLocation.lng() + "&pickup[nickname]=" + $("#pickup").val() + "&pickup[formatted_address]=" + $("#pickup").val() + "&dropoff[latitude]=" + destinationLocation.lat() + "&dropoff[longitude]=" + destinationLocation.lng() + "&dropoff[nickname]=" + $("#destination").val() + "&dropoff[formatted_address]=" + $("#destination").val() + "&product_id=" + $(elem).attr("data-url") + "&client_id=" + UBER_CLIENT_ID
        // url = url.split(" ").join("+");
        // var url = "uber://"
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
        var url = "ViaRider://" + "?pickup=" + pickupLocation.lat() + "," + pickupLocation.lng() + "&dropff=" + destinationLocation.lat() + "," + destinationLocation.lng() + "&directionsmode=transit"
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
    } else if (company == "curb") {
        var url = "gocurb://"
        window.open(url)
    }
}
var buttonState = [
    {
        text: "Set Pickup Location".toUpperCase(), 
        buttonFunction: function () {
            console.log("hererere")
            initState(1) 
            pickupLocation = searchMap.getCenter()
            setPickup(pickupLocation, true);
            $("#destination").focus()
            // suggestFromHistoryRecord()               
        }
    }, 
    {
        text: "Set Drop Off Location".toUpperCase(), 
        buttonFunction: function () {
            if (destinationLocation!=null) {
                initState(2) 
                destinationLocation = searchMap.getCenter()
                setDestination(destinationLocation, true)                
                $("#suggest-list ul").html([].koin(""))
            } else {
                myApp.alert("PLEASE PICK A DESTINATION")
            }

        }
    }, 
    {
        text: "Get Best Rates".toUpperCase(), 
        buttonFunction: function () {
            if (getDistanceNoCall(pickupLocation, destinationLocation) > 144000) {
                myApp.alert("The Trip is Too Far! Please Try a shorter Trip.")

            } else {
                if (getDistanceNoCall(pickupLocation, destinationLocation) < 30 ) {
                    myApp.confirm("The Pickup and Dropoff are within 100 feet. Do you really want to request a cab? ", function (){
                        myApp.showIndicator(); 
                        addPairToDatabase(pickupObject, destinationObject);
                        loadTimeFromServer(pickupLocation, destinationLocation);
                        mixpanel.track("getQuote", {
                            isApp: isApp,
                            fromLatlng: pickupLocation.toUrlValue() ,
                            toLatlng: destinationLocation.toUrlValue(), 
                            fromAddress: pickupObject.formatted_address, 
                            toAddress: destinationObject.formatted_address
                        });    
                    })
                } else {
                    myApp.showIndicator(); 
                    addPairToDatabase(pickupObject, destinationObject);
                    loadTimeFromServer(pickupLocation, destinationLocation);
                    mixpanel.track("getQuote", {
                        isApp: isApp,
                        fromLatlng: pickupLocation.toUrlValue() ,
                        toLatlng: destinationLocation.toUrlValue(), 
                        fromAddress: pickupObject.formatted_address, 
                        toAddress: destinationObject.formatted_address
                    });                        
                }                
                
            }
          
        }
    }    
]
function getTripList () {
    if (localStorage.tripList == null || localStorage.tripList == "null" ||localStorage.chatlist =="") {
        var tripList = []
    } else {
        var tripList = JSON.parse(localStorage.tripList)
    }
    return tripList
}

function addPairToDatabase (pickupObject, destinationObject) {

    tripList = getTripList();
    var tripClass = {
        pickup: pickupObject, 
        destination : destinationObject, 
        create_time: new Date()
    }
    tripList.push(tripClass);
    localStorage.tripList = JSON.stringify(tripList);     
}
// var hasLoadedGoogleMapScript = false;


var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistanceNoCall = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};
var waitToLoadMap = false;
function waitTillMapIsLoad() { 
    if ( (!isApp) && (!isOnline)) {
        //testing environment
        mixpanel.track = function () {
        }
    } else {
        mixpanel.init("babc263871e047bb60d6bcd47d506773");    
    }
    // initApp()         
    waitToLoadMap = setInterval(function () {
        console.log(hasLoadedGoogleMapScript)
        if (hasLoadedGoogleMapScript) {
            console.log("killed waiting")
            clearTimeout(waitToLoadMap)
            initApp()  
        }
    }, 300);     
}

function ondeviceready() {
    isApp = true;
    if (waitToLoadMap == false) {
        waitTillMapIsLoad()        
    }
    document.addEventListener("resume", appReturnedFromBackground, false);  
    if (localStorage.allowedPush == 1) {

    } else {
        initPush ()
    }
    
           
      // Set AdMobAds options:
   
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
        admob.createBannerView();
        // admob.requestInterstitialAd();        
    }  catch (err) {

    }


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

function setPickup (latlng, skipAddressValidation) {
    skipAddressValidation = skipAddressValidation || false;
    var markerNow = new google.maps.Marker({
        position: latlng,
        map: searchMap,
        icon: "img/2744green.png", 
    });      

    // Format user input address, can be ignored if user used pin

    if (!skipAddressValidation) {
        getAddressFromLatLng(latlng.lat(), latlng.lng(), function (data) {
            // pp = data;
            console.log("validate")
            pickupObject = data.results[0]     
            $("#pickup").val(data.results[0].formatted_address.split(",").slice(0,1));
        });        
    }


    // Do the marker
    markerList.push(markerNow);
    latlngbounds.extend(latlng);     
    pickupLocation = latlng;    
}
function setDestination (latlng, skipAddressValidation) {
    skipAddressValidation = skipAddressValidation || false;    
    var markerNow = new google.maps.Marker({
        position: latlng,
        map: searchMap,
        icon: "img/2744crimson.png", 
        // http://maps.gstatic.com/mapfiles/markers2/marker.png
    });       

    // Format user input address, can be ignored if user used pin
    if (!skipAddressValidation) {
        getAddressFromLatLng(latlng.lat(), latlng.lng(), function (data) {
            destinationObject = data.results[0] 
            console.log("validate")    
            $("#destination").val(data.results[0].formatted_address.split(",").slice(0,1));
        });        
    }


    // Do the marker
    markerList.push(markerNow);     
    destinationLocation = latlng
    latlngbounds.extend(latlng);     
}



function returnToState (index) {
    mixpanel.track("returnToState", {
        isApp: isApp,
        "toState": index, 
        "fromState": currentIndex
    });      
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

var suggestService;


function clickDestinationBoxEvent () {
         
        if (currentIndex == 0) {
            searchMap.setCenter(pickupLocation)    
            setPickup(pickupLocation, true)
            document.getElementById("destination").focus()
            initState(1)
        }             
}

function deduplicateArray (list) {
    var newList = []
    list.map(function (unit) {
        if( newList.length == 0 ) {
            newList.push(unit);
        } else {
            var appears = false; 
            newList.map(function (item) {
                if (item.destination.formatted_address == unit.destination.formatted_address){
                    appears = true
                }
            })
            if (!appears) {
                newList.push(unit)
            }
        }
    });
    return newList
}
function filterDistantSuggestion (list) {
    return list.filter(function (item) {
        var myLocation = new google.maps.LatLng(userLocation[0], userLocation[1])
        var destinationLoc =  new google.maps.LatLng(item.destination.geometry.location.lat,
                            item.destination.geometry.location.lng);
        return (getDistanceNoCall(myLocation, destinationLoc) < 20000)
    })
}
function placeIdSort (a, b) {
    return a.destination.formatted_address < b.destination.formatted_address ? -1 : (a.destination.formatted_address == b.destination.formatted_address ? 0 : 1);
}
function tSort (a, b) {
    var aTime = new Date(a.create_time); 
    var bTime = new Date(b.create_time);
    return aTime < bTime ? -1 : (aTime == bTime ? 0 : 1);    
}
var historyList = []
function suggestFromHistoryRecord () {
    tripList = getTripList()
    historyList = deduplicateArray(filterDistantSuggestion(tripList.reverse()))
    $("#suggest-list ul").html(historyList.map(function (unit, index) {
        // console.log(unit)
        return   ' <li onclick="assignAddress(this, ' + index + ', \'history\')">'+
          '     <a class="item-content">'+
            '    <div class="item-media"><i class="fa fa-clock-o"></i></div>'+                  
            '    <div class="item-inner">' +
            '      <div class="item-title-row">' +
                    autocompleteTextSearch(unit.destination) + 
            '      </div>' +
            // '      <div class="item-text">' +  + '</div>' +
            '    </div>' +
          '     </a>'+
          ' </li>'
    }).join(""));   
}

function initApp() {
    hasInitApp = true;     
    if (!hasLoadedGoogleMapScript) {
        console.log("waiting for google map loaded")
        return;
    }

    mixpanel.track("Open App", {
        isApp: isApp,
        userLocation: userLocation.join(",")
    });    
    console.log("map script loaded")
    testLocation1 = new google.maps.LatLng(40.7613964,-74.0007439); 
    testLocation2 = new google.maps.LatLng(40.7987994,-73.9665349);    
    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationErr);  

    $ = Framework7.$;
    myApp = new Framework7({
        swipeBackPage: true,
        modalTitle: "BeforeTaxi"
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
        if (currentIndex == 1){
            returnToState(0)
        } // ??
        if ($("#pickup").val() != "" ) {
            $("#pickup-searchbox-clear").css("visibility", "visible"); 
        } else {
            //suggest pickup location
                  
            // 
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
        } else {
            
        }
        suggestFromHistoryRecord()            
        if (document.getElementById("pickup").value == "") {
            return; 
        } else {
            // clickDestinationBoxEvent()                  
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
    // $("#destination-li").click(function () {
    //     console.log(1)
    //     if (document.getElementById("pickup").value == "") {
    //         return; 
    //     } else {
    //         clickDestinationBoxEvent()                       
    //     }

    // })   
    $("#destination").on("touchstart", function () {
        console.log(1)
        if (document.getElementById("pickup").value == "") {
            return; 
        } else {
            clickDestinationBoxEvent()
            // when user select pickup by cliking second box
                         
        }        
    });
    $("#current-position-button").click(function () {        
        updatePersonalLocation (function () {
            var latlng = new google.maps.LatLng(parseFloat(userLocation[0]), parseFloat(userLocation[1])); 
            searchMap.setCenter(latlng);
            searchMap.setZoom(STATE_ZERO_ZOOM_LEVEL);   
            mixpanel.track("current-location", {
                isApp: isApp,
                "pickupLocation": latlng.toUrlValue()
            });                  
        })        

    });
    $("#clear-button").click(function () {
        if (pickupLocation == null) {return;}
        mixpanel.track("reset", {
            isApp: isApp,
            "pickupLocation": pickupLocation.toUrlValue(), 
            "pickUpAddress": pickupObject.formatted_address
        });
        $("#pickup").val("");
        $("#destination").val("");
        initState(0)
        markerList.map(function (unit){
            unit.setMap(null)
            return unit
        });
        var pickUpAddress = pickupObject.formatted_address.split(",").slice(0,1)
        blinkFillIn("pickup", pickUpAddress)
        searchMap.setCenter(pickupLocation);
    })
}
var directionsDisplay;

function initState(index) {
    currentIndex = index
    document.getElementById("ETA-button").innerHTML = buttonState[currentIndex].text
    document.getElementById("ETA-button").onclick = function () {
        buttonState[currentIndex].buttonFunction()
    }    
    if (index == 0) {
        if (directionsDisplay!=null) {
            directionsDisplay.setMap(null);
        }
        $(".centerMarker-green").css("display", "block")
        $(".centerMarker-red").css("display", "none")        
        if (markerList.length > 0) {
            markerList[markerList.length-1].setMap(null);
        }    
        if (searchMap!= null)     {
            searchMap.setZoom(STATE_ZERO_ZOOM_LEVEL);                
        }
        mixpanel.track("awaiting pickupLocation", {
            isApp: isApp
        }); 
        latlngbounds = new google.maps.LatLngBounds();
    } else if (index == 1){
        if (directionsDisplay!=null) {
            directionsDisplay.setMap(null);
        }
        $(".centerMarker-green").css("display", "none")
        $(".centerMarker-red").css("display", "block")  
        mixpanel.track("awaiting destinationLocation", {
            isApp: isApp,
            fromLatlng: pickupLocation.toUrlValue() ,
            fromAddress: pickupObject.formatted_address, 
        }); 
        // destinationLocation = pickupLocation; 
        // destinationObject = pickupObject
        // blinkFillIn("destination", destinationObject.formatted_address.split(",").slice(0,1)[0])
        searchMap.setZoom(STATE_ONE_ZOOM_LEVEL);         
    } else {
        setTimeout(function () {
            // searchMap.setZoom(16);             
            searchMap.fitBounds(latlngbounds)
        }, 400)           
        mixpanel.track("awaiting getResult", {
            isApp: isApp,
            fromLatlng: pickupLocation.toUrlValue() ,
            toLatlng: destinationLocation.toUrlValue(), 
            fromAddress: pickupObject.formatted_address, 
            toAddress: destinationObject.formatted_address        
        });   
        oneCallGetDistance(pickupLocation, destinationLocation)
        $(".centerMarker-green").css("display", "none")
        $(".centerMarker-red").css("display", "none")          
    }
}
function getResult () {
    mainView.router.loadPage({
        "pageName": "result", 
    }); 
    blinkFillIn("pickup-result", pickupObject.formatted_address.split(",").slice(0,2).join(","));
    blinkFillIn("destination-result", destinationObject.formatted_address.split(",").slice(0,2).join(","))
    function badge(item, index) {
        if (item.text.toLowerCase() == "walking" || item.text.toLowerCase() == "subway") {
            return ""
        }
        if (index == 0) {
            return "<span class='recommended animated bounceInRight'>VALUE</span>"
        } else if (item.text.toLowerCase().indexOf("suv") != -1 || item.text.toLowerCase().indexOf("black") != -1 || item.text.toLowerCase().indexOf("select")!=-1) {
            return "<span class='recommended animated bounceInRight' style='background:black;'>LUX</span>"
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
            '      <div class="item-text">' + ((item.ETA!=-1) ? (item.ETA +' min away') : "") + ((item.poolChance!=null) ? (" - " + Math.round((item.poolChance*100)) + "% Sharing Ride") : "") + '</div>' +
            '    </div>' +
            '  </a>' +
            '</li>';
        }).join(""); 
        return htmlString; 
    }).join(""));     
    getDistance(pickupLocation, destinationLocation)
}

function oneCallGetDistance (origin, destination) {
    // var directionsDisplay;
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(searchMap);
    var request = {
        origin:origin.toUrlValue(),
        destination:destination.toUrlValue(),
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsDisplay.setOptions({
        markerOptions: {
            visible: false
        },
        polylineOptions: {
            strokeColor: "rgb(66,198,222)",
            strokeWeight: 4
        }, 
        suppressMarkers: false
    })
    directionsService.route(request, function(result, status) {
        console.log(result)
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
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
        console.log(response)
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
        console.log(response)
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
        // console.log(response)
        console.log(response.rows[0].elements[0].distance.text)
        console.log(response.rows[0].elements[0].duration.text)
        var distance = response.rows[0].elements[0].distance.text
        var duration = response.rows[0].elements[0].duration.value   // in second      
        var distanceVal = parseFloat(distance);
        // var durationVal = parseFloat(duration); 
        // if (distanceVal < 0.3)
        var taxiFare = nycCabFare(distanceVal, duration)
        if (genre.length > 0 && taxiFare < genre[CAR_STANDARD].items[0].displayPrice) {
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
    price *= 1.15
    return price.toFixed(2);
}
var placeService; 
function autocompletePrediction (unit) {
    unit.formatted_address = unit.formatted_address || unit.description
    return  '        <div class="item-title">' + unit.formatted_address.split(",").slice(0,1) + '</div>' +
            '        <div class="item-after">' + unit.formatted_address.split(",").slice(1,2) + '</div>'        
    if (unit.name == unit.formatted_address.split(",").slice(0,1)) {

    } else {
        return  '        <div class="item-title">' + unit.name + '</div>' +
                '        <div class="item-after">' + unit.formatted_address.split(",").slice(0,2) + '</div>'
    }
}
function autocompleteTextSearch (unit) {
    unit.formatted_address = unit.formatted_address || unit.vicinity
        return  '        <div class="item-title">' + unit.formatted_address.split(",").slice(0,1) + '</div>' +
                '        <div class="item-after">' + unit.formatted_address.split(",").slice(1,2) + '</div>'    
    // if (unit.name == unit.formatted_address.split(",").slice(0,1)) {

    // } else {
    //     return  '        <div class="item-title">' + unit.name + '</div>' +
    //             '        <div class="item-after">' + unit.formatted_address.split(",").slice(0,2) + '</div>'
    // }
}
function placeServiceSearch (queryText, callback) {
    if (queryText == "") {
        console.log("empty");
        return;
    }
    var request = {
        query: queryText,         
        location: searchMap.getCenter(),
        radius: '30', 
        keyword: ['address', 'name', 'type']
    };    

    // placeService = new google.maps.places.PlacesService(searchMap);
    // placeService.nearbySearch(request, function (results, status) {
    //     // console.log(queryText, results)

    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         console.log(results)
    //         // $("#suggest-list").css("display", "block");
    //         // // for (var i = 0; i < results.length; i++) {
    //         // //     var place = results[i];
    //         // //     console.log
    //         // //     // createMarker(results[i]);
    //         // // }
    //         // var list = results
    //         // suggestAddressList = results
    //         // console.log(suggestAddressList.length)
    //         // $("#suggest-list ul").html(list.map(function (unit, index) {
    //         //     return   ' <li onclick="assignAddress(this, ' + index + ')">'+
    //         //       '     <a class="item-content">'+
    //         //         '    <div class="item-media"><i class="fa fa-map-marker"></i></div>'+                  
    //         //         '    <div class="item-inner">' +
    //         //         '      <div class="item-title-row">' +
    //         //                 autocompleteTextSearch(unit) + 
    //         //         '      </div>' +
    //         //         // '      <div class="item-text">' +  + '</div>' +
    //         //         '    </div>' +
    //         //       '     </a>'+
    //         //       ' </li>'
    //         // }).join(""));        
    //         // if (callback!=null) {        
    //         //     callback(list)
    //         // }               
    //     }        
    // });    



    suggestService = new google.maps.places.AutocompleteService();
    suggestService.getPlacePredictions({ 
            input: queryText, 
            location: searchMap.getCenter(), 
            radius: 20000
    }, displaySuggestions);
    function displaySuggestions (predictions, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(predictions)
            $("#suggest-list").css("display", "block");
            var list = predictions
            var locationList = []; 
            tripList = getTripList()
            deduplicateArray(filterDistantSuggestion(tripList.reverse())).map(function (unit) {
                locationList.push(unit.destination);
            })
            console.log(locationList);
            fuse = new Fuse(locationList, {
                shouldSort: true,
                threshold: 0.1,
                // tokenize: true,
                // matchAllTokens: true,
                maxPatternLength: 32,
                keys: [
                    "formatted_address"
                ]
            })              
            var searchedList = fuse.search(queryText); 
            searchedList.map(function (unit,i){searchedList[i].history=1});
            suggestAddressList = searchedList.concat(predictions)
            var list = suggestAddressList
            console.log(suggestAddressList)
            // .concat(filterDistantSuggestion(tripList).filter(function (unit) {

            // }))


            $("#suggest-list ul").html(list.map(function (unit, index) {
                return   ' <li onclick="assignAddress(this, ' + index + ', \'suggestion\')">'+
                  '     <a class="item-content">'+
                    '    <div class="item-media">' + (unit.history ? '<i class="fa fa-clock-o"></i>' : '<i class="fa fa-map-marker"></i>') + '</div>'+                  
                    '    <div class="item-inner">' +
                    '      <div class="item-title-row">' +
                            autocompletePrediction(unit) + 
                    '      </div>' +
                    // '      <div class="item-text">' +  + '</div>' +
                    '    </div>' +
                  '     </a>'+
                  ' </li>'
            }).join(""));        
            if (callback!=null) {        
                callback(list)
            }               
        } else {
            $("#suggest-list ul").html(' <li>'+
                  '     <a class="item-content">'+
                    '    <div class="item-media"><i class="fa fa-times"></i></div>'+                  
                    '    <div class="item-inner">' +
                    '      <div class="item-title-row">' +
                  '        <div class="item-title">Location Not Found</div>' +
                   '        <div class="item-after">Please Try Again Later</div>' +
                    '      </div>' +
                    // '      <div class="item-text">' +  + '</div>' +
                    '    </div>' +
                  '     </a>'+
                  ' </li>'); 
            mixpanel.track("suggestion-no-show" , {
                isApp: isApp,
                "status": status, 
                "query": queryText
            })
            console.log(predictions)
        }          
        // console.log(predictions.map(s=>s.description).join(","))
        // predictions.forEach(function(prediction) {
        //   var li = document.createElement('li');
        //   li.appendChild(document.createTextNode(prediction.description));
        //   document.getElementById('results').appendChild(li);
        // });
    };    
}
var suggestAddressList = []

function getMapDetail(placeId, callback) {
    console.log(placeId)
  var service = new google.maps.places.PlacesService(searchMap);
  service.getDetails({
    placeId: placeId, 
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place.geometry.location)
        if (callback!= null) {
            callback(place)
        }
    } else {
        console.log("Wtf")
    }
  });    
}
function assignAddress(elem, index, listType) {
    eee = elem;
    var list = []
    if (listType == "suggestion") {
        list = suggestAddressList
    } else if (listType == "history") {
        list = historyList
    }
    console.log(listType)
    var address = $(elem).find(".item-title")[0].innerHTML
    console.log(address)
    mixpanel.track("click_suggest_address", {
        isApp: isApp,
        "title": address, 
        "subtitle": $(elem).find(".item-after")[0].innerHTML, 
        "ranking": index
    });    
    if (currentIndex == 0) {
        blinkFillIn("pickup", address);
        if (listType == "suggestion") {
            getMapDetail(list[index].place_id, function (data) {
                console.log(data)
                pickupObject = data
                pickupLocation = new google.maps.LatLng(data.geometry.location.lat(),data.geometry.location.lng())
                enterLocation(pickupLocation, true); 
                suggestFromHistoryRecord();
            });                 
        } else if (listType == "history") {
            pickupObject = list[index].destination
            console.log(list[index].destination) // everything is dropoff no pickup as of now!!
            pickupLocation = new google.maps.LatLng(pickupObject.geometry.location.lat,pickupObject.geometry.location.lng)
            console.log(pickupObject)
            enterLocation(pickupLocation, true); 
        }
        

        // $("#suggest-list ul").html([].join(""));             
        // give history location
    } else if (currentIndex == 1) {
        blinkFillIn("destination", address); 
        if (listType == "suggestion") {
            getMapDetail(list[index].place_id, function (data) {
                console.log(data)
                destinationObject = data
                destinationLocation = new google.maps.LatLng(data.geometry.location.lat(),data.geometry.location.lng())
                enterLocation(destinationLocation, true); 
            });                
        } else if (listType == "history"){
                destinationObject = list[index].destination
                destinationLocation = new google.maps.LatLng(destinationObject.geometry.location.lat,destinationObject.geometry.location.lng)
                enterLocation(destinationLocation, true);             
        }
      
        $("#suggest-list ul").html([].join(""));  

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
    genre = [
        {
            title: "Car Sharing <span class='title-description'>(price for 1, +$1 for 2)</span>", 
            items: []
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
            items: [], 
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
    if (pickupObject.address_components.filter(function (unit) {
            return (unit.long_name == "Manhattan")
        }).length * destinationObject.address_components.filter(function (unit) {
            return (unit.long_name == "Manhattan")
        }).length == 1) {
        // it's manhattan;
        genre[CAR_STANDARD].items.push(GETT_DEAL_TYPE_ITEM);
             
        if (isViaWorking()) {
            genre[CAR_POOL].items.push(VIA_TYPE_ITEM);   
        }
    }
}

function isViaWorking () {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes()
    if (d.getDay() >= 1 && d.getDay() <= 5) {
        if (h >=6) {
            return true;
        }
    } else if (d.getDay() == 6) {
        if (h >= 10) {
            return true;
        }
    } else {
        if (h >= 10 && h < 21) {
            return true;
        }

    }
    // wk days 6am-12am
    // sat 10am - 12am
    // sun 1-am - 9pm
    return false;
}

var uberhasLoaded = false, lyfthasLoaded = false; 



function placeAutocomplete (queryText) {
    // myApp.showIndicator()    
    var url ="https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&key="+GOOGLE_MAP_KEY




    if (queryText == "") {
        console.log("empty query");
        return;
    }
    var request = {
        query: queryText,         
        location: searchMap.getCenter(),
        radius: '2000', 
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
    // autocomplete = new google.maps.places.Autocomplete(searchMap);
    // placeService.textSearch(request, function (results, status) {
    //     console.log(queryText, results)

    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         $("#suggest-list").css("display", "block");
    //         // for (var i = 0; i < results.length; i++) {
    //         //     var place = results[i];
    //         //     console.log
    //         //     // createMarker(results[i]);
    //         // }
    //         var list = results
    //         suggestAddressList = results
    //         console.log(suggestAddressList.length)
    //         $("#suggest-list ul").html(list.map(function (unit, index) {
    //             return   ' <li onclick="assignAddress(this, ' + index + ')">'+
    //               '     <a class="item-content">'+
    //                 '    <div class="item-media"><i class="fa fa-map-marker"></i></div>'+                  
    //                 '    <div class="item-inner">' +
    //                 '      <div class="item-title-row">' +
    //                         autocompleteFormat(unit) + 
    //                 '      </div>' +
    //                 // '      <div class="item-text">' +  + '</div>' +
    //                 '    </div>' +
    //               '     </a>'+
    //               ' </li>'
    //         }).join(""));        
    //         if (callback!=null) {        
    //             callback(list)
    //         }               
    //     }        
    // });    
initAutocomplete()

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('pickup')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(place)
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

    // try {
    //     $.ajax({
    //       url: url, 
    //       data: {
    //             query: queryText,         
    //             location: searchMap.getCenter(),
    //             radius: '2000',
    //             key: GOOGLE_MAP_KEY
    //         };    

    //       success: function (data) {
    //         console.log(data)       
    //         ff= data
    //       }, 
    //       error: function (err) {
    //         myApp.hideIndicator()
    //       }
    //     });          
    // } catch (err) {
    //     myApp.hideIndicator()
    // }    
}

function getPoolChance (high, low) {
    return Math.max(Math.min(high / (low*1.1) - 1, 0.75), 0.05);
}

function loadTimeFromServer (origin, destination) {
    uberhasLoaded = false, lyfthasLoaded = false;     
    loadCarType (origin)
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
            uberhasLoaded = true; 

            uberList = JSON.parse(JSON.parse(data).total); 
            console.log()
            if (uberList.length == 0 || uberList[0].localized_display_name.toLowerCase() == "future") {
                myApp.alert("Uber is not available in this area now");
            } else {
                uberList.map(function (unit) {
                    if (unit.localized_display_name.toLowerCase().indexOf("pool") != -1) {
                        parseUberUnit(unit, CAR_POOL); 
                    } else if (unit.localized_display_name.toLowerCase().indexOf("uberx") != -1 && unit.localized_display_name.toLowerCase().indexOf("uberxl") == -1) {
                        parseUberUnit(unit, CAR_STANDARD); 
                    } else if (unit.localized_display_name.toLowerCase().indexOf("black") != -1) {
                        parseUberUnit(unit, CAR_STANDARD); 
                    } else if (unit.localized_display_name.toLowerCase().indexOf("select") != -1) {
                        parseUberUnit(unit, CAR_STANDARD); 
                    } else if (unit.localized_display_name.toLowerCase().indexOf("xl") != -1) {
                        parseUberUnit(unit, CAR_SUV); 
                    } else if (unit.localized_display_name.toLowerCase().indexOf("suv") != -1) {
                        parseUberUnit(unit, CAR_SUV);                     
                    }
                });       
                var uberXObject = uberList.filter(function (unit) {
                    return ((unit.display_name.toLowerCase().indexOf("uberx")!=-1) && (unit.display_name.toLowerCase().indexOf("uberxl")==-1))
                })[0];
                var poolObject = uberList.filter(function(unit){
                    return (unit.display_name.toLowerCase().indexOf("pool")!=-1);
                })[0];
                var poolChance = -1;
                if ( !((!uberXObject) || (!poolObject))) {
                    var uberPoolPrice =0;
                    if (poolObject.localized_display_name.toLowerCase().indexOf("5") != -1) {
                        uberPoolPrice = 5
                    } else {
                        uberPoolPrice = (poolObject.high_estimate + poolObject.low_estimate) / 2  
                    }
                    var uberXPrice = (uberXObject.high_estimate + uberXObject.low_estimate) / 2     
                    poolChance = getPoolChance(uberXPrice, uberPoolPrice);

                }
                genre[CAR_POOL].items.map(function (unit, i) {
                    if (unit.text.toLowerCase().indexOf("pool") != -1) {
                        genre[CAR_POOL].items[i].poolChance = poolChance;
                    }
                });                           
                }
 
            if (lyfthasLoaded) {
                myApp.hideIndicator()  
                getResult()                   
            }              
          }, 
          error: function (err) {
            myApp.alert("Uber is not available in this area now");
            myApp.hideIndicator()

          }
        });          
    } catch (err) {
        myApp.alert("Uber is not available in this area now");
        myApp.hideIndicator()
    }
    try {
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
            // console.log()
            lyfthasLoaded = true; 
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
                    parseLyftUnit(unit, CAR_SUV);                     
                } else {
                    console.log("wat")
                }
            });       
            var lyftObject = lyftList.filter(function(unit){
                return unit.display_name == "Lyft"
            })[0];
            console.log(lyftObject)
            var lyftLineObject = lyftList.filter(function(unit){
                return unit.display_name == "Lyft Line";
            })[0];
            console.log(lyftLineObject)
            var poolChance = -1;
            if ( !((!lyftObject) || (!lyftLineObject))) {
                var lyftPrice = (lyftObject.estimated_cost_cents_max + lyftObject.estimated_cost_cents_min) / 2
                var lyftLinePrice = (lyftLineObject.estimated_cost_cents_max + lyftLineObject.estimated_cost_cents_min) / 2                
                poolChance = getPoolChance(lyftPrice, lyftLinePrice)
            }
            console.log(1-poolChance);
            genre[CAR_POOL].items.map(function (unit, i) {
                if (unit.text == "Lyft Line") {
                    genre[CAR_POOL].items[i].poolChance = poolChance;
                }
            });
            console.log(genre)
            if (uberhasLoaded) {
                myApp.hideIndicator()  
                getResult()                   
            }                     
          }, 
          error: function (err) {
            myApp.alert("Lyft is not available in this area now");
            myApp.hideIndicator()
          }
        }); 
    } catch (err) {
        myApp.alert("Lyft is not available in this area now");
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
        product_id: unit.ride_type,               
    })        
}
function parseUberUnit (unit, categoryIndex) {
    var randomNum = Math.random(); 
    if (unit.display_name.toLowerCase().indexOf("pool") != -1) {
        unit.high_estimate = parseFloat(unit.estimate.slice(1,unit.estimate.length))
        unit.low_estimate = parseFloat(unit.estimate.slice(1,unit.estimate.length))
    }
    var predictedPrice = Math.round(((unit.high_estimate+unit.low_estimate) / 2 ) * 100 - 5 + 10 * randomNum) / 100
    if (unit.localized_display_name.toLowerCase().indexOf("5") != -1) {
        if (pickupObject.address_components.filter(function (unit) {
                return (unit.long_name == "Manhattan")
            }).length * destinationObject.address_components.filter(function (unit) {
                return (unit.long_name == "Manhattan")
            }).length == 1) {
            // both location in manhattan
            predictedPrice = 5
        }        
        
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
                    pickupLocation = gps
                    pickupObject = parsedData.results[0]
                    
                } else if (currentIndex ==1) {
                    selectorId = "destination"
                    if (cleanAddress != $("#"+"pickup").val()) {
                        blinkFillIn(selectorId, cleanAddress); 
                    }
                    destinationLocation = gps
                    destinationObject = parsedData.results[0]
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
function enterAddress (address, indexWhileClick) {
    placeServiceSearch(address, function (result) {
        console.log(result[0], indexWhileClick)
        getMapDetail(result[0].place_id, function (data) {
            console.log(data)
            if (indexWhileClick == 0){
                pickupObject = data
                // console.log(p)
                blinkFillIn("pickup", data.formatted_address.split(",").slice(0,1))
                pickupLocation = new google.maps.LatLng(data.geometry.location.lat(),data.geometry.location.lng())
                enterLocation(pickupLocation, true);  
                suggestFromHistoryRecord()
            } else if (indexWhileClick == 1) {
                destinationObject = data
                destinationLocation = new google.maps.LatLng(data.geometry.location.lat(),data.geometry.location.lng())
                blinkFillIn("destination", data.formatted_address.split(",").slice(0,1))                
                enterLocation(destinationLocation, true);                 
            } else {
                console.log("WTF not 1 not 0")
            }

        });  
    })
    // getLatLngFromAddress(address, function (data) {

    // });    
}
function enterLocation (latlng, skipAddressValidation) {
    console.log(currentIndex)
    if (currentIndex == 0) {
            
        pickupLocation = latlng   
        console.log(latlng);        
        setPickup(latlng, skipAddressValidation)
        searchMap.setCenter(latlng) 
        latlngbounds.extend(latlng)  
        document.getElementById("destination").focus()
        document.getElementById("destination").value = "" // maybe change this
        // give destination suggestion
        $("#suggest-list ul").html([].join(""));  
        initState(1) 
    } else if (currentIndex == 1) {
        if (destinationLocation == null ){
            myApp.alert("PLEASE PICK A DESTINATION")
            return;
        }
             
        destinationLocation = latlng           
        setDestination (latlng, skipAddressValidation)
        latlngbounds.extend(latlng)  
        searchMap.fitBounds(latlngbounds)
        // hide suggest list
        $("#suggest-list ul").html([].join(""));  
        initState(2) 
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
    if (currentIndex == 2 || textarea.value == "") {
        return;
    }
    if(code == 13) { //Enter keycode  
        mixpanel.track("type_address", {
            isApp: isApp,
            "query": textarea.value, 
            "currentIndex": currentIndex
        })
        enterAddress(textarea.value, currentIndex)
    } else {
        clearTimeout(searchTimeout); // doesn't matter if it's 0
        searchTimeout = setTimeout(function () {
            placeServiceSearch(textarea.value);  
        }, 250);
    }
    if (textarea.value != "") {
        $(".clear-search-box").css("display", "block");
    }
}
var searchTimeout; 
var lastkeystroke;


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
    searchMap.addListener('dragstart', function () {
        $("#suggest-list ul").html([].join(""))
        if (currentIndex <= 1) {
            $("#destination").blur()
        }
        if (currentIndex ==0) {
            blinkFillIn("pickup", "Pick up at Pin")
        } else if (currentIndex ==1){
            blinkFillIn("destination", "Go To Pin")
        }        
    }); 
    // get current location and update the address bar          
    getAddressFromLatLng(position[0], position[1]); 

    // when drag finishes, location the address using map center
    google.maps.event.addListener(searchMap,'dragend', function() {
        if (currentIndex <= 1) {
            // auto fill blinkFillIn
            getAddressFromLatLng(searchMap.getCenter().lat(), searchMap.getCenter().lng())                 
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
        // hide list
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
if (window.location.protocol.indexOf("http") != -1 || isApp == false) {
    if (window.location.protocol.indexOf("http") != -1) {
        isOnline = true;
    }
    if (waitToLoadMap == false) {
        waitTillMapIsLoad()        
    }

}
!function(t){"use strict";function e(){console.log.apply(console,arguments)}function s(t,e){var s,n,o,i;for(this.list=t,this.options=e=e||{},s=0,i=["sort","shouldSort","verbose","tokenize"],n=i.length;n>s;s++)o=i[s],this.options[o]=o in e?e[o]:r[o];for(s=0,i=["searchFn","sortFn","keys","getFn","include","tokenSeparator"],n=i.length;n>s;s++)o=i[s],this.options[o]=e[o]||r[o]}function n(t,e,s){var i,r,h,a,c,p;if(e){if(h=e.indexOf("."),-1!==h?(i=e.slice(0,h),r=e.slice(h+1)):i=e,a=t[i],null!==a&&void 0!==a)if(r||"string"!=typeof a&&"number"!=typeof a)if(o(a))for(c=0,p=a.length;p>c;c++)n(a[c],r,s);else r&&n(a,r,s);else s.push(a)}else s.push(t);return s}function o(t){return"[object Array]"===Object.prototype.toString.call(t)}function i(t,e){e=e||{},this.options=e,this.options.location=e.location||i.defaultOptions.location,this.options.distance="distance"in e?e.distance:i.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:i.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||i.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var r={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:i,sortFn:function(t,e){return t.score-e.score},getFn:n,keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g};s.VERSION="2.5.0",s.prototype.set=function(t){return this.list=t,t},s.prototype.search=function(t){this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var s=this._format();return s},s.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(t.tokenSeparator),o=0,i=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];i>o;o++)this.tokenSearchers.push(new s(n[o],t));this.fullSeacher=new s(e,t)},s.prototype._startSearch=function(){var t,e,s,n,o=this.options,i=o.getFn,r=this.list,h=r.length,a=this.options.keys,c=a.length,p=null;if("string"==typeof r[0])for(s=0;h>s;s++)this._analyze("",r[s],s,s);else for(this._keyMap={},s=0;h>s;s++)for(p=r[s],n=0;c>n;n++){if(t=a[n],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,i(p,t,[]),p,s)}},s.prototype._analyze=function(t,s,n,i){var r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b=this.options,_=!1;if(void 0!==s&&null!==s){h=[];var M=0;if("string"==typeof s){if(r=s.split(b.tokenSeparator),b.verbose&&e("---------\nKey:",t),this.options.tokenize){for(v=0;v<this.tokenSearchers.length;v++){for(f=this.tokenSearchers[v],b.verbose&&e("Pattern:",f.pattern),d=[],y=!1,S=0;S<r.length;S++){g=r[S],m=f.search(g);var L={};m.isMatch?(L[g]=m.score,_=!0,y=!0,h.push(m.score)):(L[g]=1,this.options.matchAllTokens||h.push(1)),d.push(L)}y&&M++,b.verbose&&e("Token scores:",d)}for(c=h[0],l=h.length,v=1;l>v;v++)c+=h[v];c/=l,b.verbose&&e("Token score average:",c)}u=this.fullSeacher.search(s),b.verbose&&e("Full text score:",u.score),p=u.score,void 0!==c&&(p=(p+c)/2),b.verbose&&e("Score average:",p),k=this.options.tokenize&&this.options.matchAllTokens?M>=this.tokenSearchers.length:!0,b.verbose&&e("Check Matches",k),(_||u.isMatch)&&k&&(a=this.resultMap[i],a?a.output.push({key:t,score:p,matchedIndices:u.matchedIndices}):(this.resultMap[i]={item:n,output:[{key:t,score:p,matchedIndices:u.matchedIndices}]},this.results.push(this.resultMap[i])))}else if(o(s))for(v=0;v<s.length;v++)this._analyze(t,s[v],n,i)}},s.prototype._computeScore=function(){var t,s,n,o,i,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(n=0,o=l[t].output,i=o.length,a=1,s=0;i>s;s++)r=o[s].score,h=p?p[o[s].key].weight:1,c=r*h,1!==h?a=Math.min(a,c):(n+=c,o[s].nScore=c);1===a?l[t].score=n/i:l[t].score=a,this.options.verbose&&e(l[t])}},s.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},s.prototype._format=function(){var t,s,n,o,i,r=this.options,h=r.getFn,a=[],c=this.results,p=r.include;for(r.verbose&&e("\n\nOutput:\n\n",c),o=r.id?function(t){c[t].item=h(c[t].item,r.id,[])[0]}:function(){},i=function(t){var e,s,n,o,i,r=c[t];if(p.length>0){if(e={item:r.item},-1!==p.indexOf("matches"))for(n=r.output,e.matches=[],s=0;s<n.length;s++)o=n[s],i={indices:o.matchedIndices},o.key&&(i.key=o.key),e.matches.push(i);-1!==p.indexOf("score")&&(e.score=c[t].score)}else e=r.item;return e},s=0,n=c.length;n>s;s++)o(s),t=i(s),a.push(t);return a},i.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},i.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},i.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},i.prototype.search=function(t){var e,s,n,o,i,r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b,_,M=this.options;if(t=M.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>M.maxPatternLength){if(y=t.match(new RegExp(this.pattern.replace(M.tokenSeparator,"|"))),k=!!y)for(S=[],e=0,b=y.length;b>e;e++)_=y[e],S.push([t.indexOf(_),_.length-1]);return{isMatch:k,score:k?.5:1,matchedIndices:S}}for(o=M.location,n=t.length,i=M.threshold,r=t.indexOf(this.pattern,o),v=[],e=0;n>e;e++)v[e]=0;for(-1!=r&&(i=Math.min(this._bitapScore(0,r),i),r=t.lastIndexOf(this.pattern,o+this.patternLen),-1!=r&&(i=Math.min(this._bitapScore(0,r),i))),r=-1,g=1,m=[],c=this.patternLen+n,e=0;e<this.patternLen;e++){for(h=0,a=c;a>h;)this._bitapScore(e,o+a)<=i?h=a:c=a,a=Math.floor((c-h)/2+h);for(c=a,p=Math.max(1,o-a+1),l=Math.min(o+a,n)+this.patternLen,u=Array(l+2),u[l+1]=(1<<e)-1,s=l;s>=p;s--)if(d=this.patternAlphabet[t.charAt(s-1)],d&&(v[s-1]=1),0===e?u[s]=(u[s+1]<<1|1)&d:u[s]=(u[s+1]<<1|1)&d|((f[s+1]|f[s])<<1|1)|f[s+1],u[s]&this.matchmask&&(g=this._bitapScore(e,s-1),i>=g)){if(i=g,r=s-1,m.push(r),!(r>o))break;p=Math.max(1,2*o-r)}if(this._bitapScore(e+1,o)>i)break;f=u}return S=this._getMatchedIndices(v),{isMatch:r>=0,score:0===g?.001:g,matchedIndices:S}},i.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,o=-1,i=0,r=t.length;r>i;i++)e=t[i],e&&-1===n?n=i:e||-1===n||(o=i-1,s.push([n,o]),n=-1);return t[i-1]&&s.push([n,i-1]),s},"object"==typeof exports?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.Fuse=s}(this);

