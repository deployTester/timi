var $$ = Dom7;
var a,b;
var updateCalTimeout;
var avail = []; 
var cardHeight; 
var userList =[]
var invitedList = [];
var contactedLoaded = false; 
var contactsList = []
var timeFrame = 0; 
var myAvail; 
var xhr; 
var loadingCard; 
var loading = false;
var availFriend = []
for (var i = 0; i < 3; i++) {
    availFriend[i] = []
}
var userLocation = []
// var currentTimeFrame = 0;
var usersFavoriteList = []
var timeOutValue = 5000;
var personalData = new Object ()
var selfData = new Object () ;
for (var i = 0 ; i < 7; i++) {
    avail[i] = []
    for (var j = 0; j < 3; j++ ) {
        avail [i][j] = 1; 
    }
}
var favoriteFoodList = ["Pizza", "Tex-Mex", "Ramen", "Sushi", "French", "American", "Coffee", "Burger", "Chinese/Spicy", "Chinese", "Indian", "Sandwich"].sort(cSort)
var currentIndex = [ null, null, null]; 
var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
var d = new Date()
var queryDay = ( d.getHours <= 1 ) ? ((d.getDay() - 1) % 7 ): d.getDay()

if ( d.getHours ) {

} else if ( d.getHours ) {

} else if ( d.getHours ) {

}

$$('#explore-tab').on('show', function () {
    console.log('Tab 1 is visible');
    $(".subnavbar").css("display", "flex")
    changeNavbarTitle("Explore"); 
});
 
$$('#availability-tab').on('show', function () {
    console.log('Tab 2 is visible');
    updateFreeTime ()
    $(".subnavbar").css("display", "none")
    changeNavbarTitle("Availability");  
    updateForm()
});
 
$$('#messenger-tab').on('show', function () {
    $(".subnavbar").css("display", "none")
    changeNavbarTitle("Past dates"); 
});    
$$('#invitation-tab').on('show', function () {
    $(".subnavbar").css("display", "none")
    loadFriendsFromContact()
    changeNavbarTitle("Invite friends to Timi"); 
    console.log('Tab 4 is visible');
});    

$$('#more-tab').on('show', function () {
    $(".subnavbar").css("display", "none")
    changeNavbarTitle("More");
    document.getElementById("profile-pic").src = personalData.avatar;
    document.getElementById("profile-name").innerHTML = personalData.username
    $("#profile-pic-background").css("background", ('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + personalData.avatar + ')'  ))

    // change background too
    console.log('Tab 5 is visible');
});   

document.addEventListener('deviceready', onDeviceReady, false);

// center the given title in the navbar
function changeNavbarTitle (title) {
    $("#home-page-navbar-center").html(title)
    var left = ($(window).width() - $("#home-page-navbar-center").width()) / 2 - 8
    $("#home-page-navbar-center").css("left", left+"px")      
} 

function switchTime () {
    // var htmlString = '<div class="popover">'+
    // '    <div class="popover-angle"></div>'+
 
    // '    <div class="popover-inner">'+
    // 'yes'
    // '    </div>'+
    // '</div>'
    myApp.popover(htmlString, "#home-page-navbar-center") 

    // home-page-navbar-center
}

// take selfie to change the profile picture
function changePicture () {
    console.log("pic")
    navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URI, 
        targetWidth: 360,
        encodingType: Camera.EncodingType.JPEG,
        targetHeight: 360,

    });
}

function availableTime () {
    var d = new Date(); 
    var n = d.getHours()
    console.log(n)


}


function updateProfilePic (fileURL) {
    // var ajaxUrl = "http://gettimi.com/site/changeAvatar?user_token=" + token + 

    var options = new FileUploadOptions;
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf("/") + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;
    var params = {};
    params.user_token = localStorage.usertoken;
    // params.name = document.getElementById("post-image-title-input").value;
    // params.description = "";
    // params.type = 2;
    // params.udid = udid;
    options.params = params;
    var ft = new FileTransfer;
    var win = function(r) {
        myApp.hideIndicator();
        // myApp.alert("\u592a6\u4e86\uff01\u53d1\u9001\u6210\u529f");
        console.log(r);
        // myApp.closeModal(".popup-post-image")
    };
    var fail = function(error) {
        console.log(error)
        myApp.hideIndicator();
        // myApp.alert("\u7f51\u7edc\u95ee\u9898\uff0c\u8bf7\u91cd\u8bd5\uff01")
    };
    myApp.showIndicator();
    ft.upload(fileURL, encodeURI("http://gettimi.com/site/changeAvatar"), win, fail, options, true)
}

function serializeObject (obj)  {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    } 
    return str   
}

function postGeolocation () {
    var infoObject = {
        "user_token": ray_token, 
        "geolocation": userLocation, 
    }
    // serializeObject(infoObject)
    var ajaxUrl = "http://gettimi.com/site/returnInfo?" + serializeObject(infoObject)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
            // myApp.hideIndicator()

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            myApp.alert("Network error. Please try again later? ")
        }
    });      
}

function postPersonalInfo () {
// 'username'=>$user->username,
// 'avatar'=>Yii::app()->params['globalURL'].$user->avatar,
// 'email'=>$user->email,
// 'phone'=>$user->phone,
// 'country'=>$user->country,
// 'city'=>$user->city,
// 'geolocation'=>$user->geolocation,
// 'favorites'=>$user->favorites,
// 'whatsup'=>$user->whatsup,
// 'range'=>$user->range,  
    myApp.showIndicator()
    var infoObject = {
        "user_token": ray_token, 
        "favorites": usersFavoriteList,
        "range": document.getElementById("distance-range").value, 
        "whatsup": document.getElementById("whatsup").value
    }
    // serializeObject(infoObject)
    var ajaxUrl = "http://gettimi.com/site/returnInfo?" + serializeObject(infoObject)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
            myApp.hideIndicator()

        }, 
        error: function (results) {
            myApp.hideIndicator()
            console.log(results)
            myApp.alert("Network error. Please try again later? ")
        }
    });        
}

function getPersonalInfo () {
    var ajaxUrl = "http://gettimi.com/site/returnInfo?user_token=" + ray_token
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
            personalData = results
            updatePersonalPage ()

            // myApp.hideIndicator()

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            myApp.alert("Network error. Please try again later? ")
        }
    });      
}

// update the profile picture
function onCameraSuccess(imageData) {
    console.log(imageData)
    var profilePic = document.getElementById('profile-pic');
    var profilePicBg = document.getElementById('profile-pic-background');
    // profilePic.src = "data:image/jpeg;base64," + imageData;
    profilePic.src = imageData
    // console.log('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +  imageData + '")')
    $("#profile-pic-background").css("background", ('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + profilePic.src + ')'  ))
    updateProfilePic (imageData)
}

function onCameraFail(message) {
    // myAalert('Failed because: ' + message);
}

// upload user contact list to server
function updateContactList () {
    // myApp.showIndicator()
    var ajaxUrl = "http://gettimi.com/site/TakePhoneContact"
    console.log(contactsList.length)
    // "34e760735a29876e2d95cd9c99d38b51"
        // localStorage.usertoken  
    $.ajax({
        url: ajaxUrl,
        type: "POST",
        crossDomain: true,
        data: ({
            "user_token": localStorage.usertoken, 
            "list": JSON.stringify(contactsList)
        }), 
        dataType: "json",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
            // myApp.hideIndicator()




        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            myApp.alert("Network error. Please try again later? ")
        }
    });  
}

// get a list of users whose status are either isInvited, or isSignedup
function updateInvitationStatus () {
    // [ isInvited, isSignedUp ]
    var ajaxUrl = "http://gettimi.com/site/ReturnInvitedSignedup?user_token=" + 
     localStorage.usertoken

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results.result)
            invitedList = JSON.parse(results.result)

            for (var x in invitedList ) {
                var name = x; 
                var arr = invitedList[x]
                console.log(name, arr)
            }
            console.log(results)
        }, 
        error: function (results) {
            myApp.alert("Network error. Please try again later? ")
        }
    });  
}

// fired once the user invited their friend. Invite friends by sending sms on the backend. 
// If success, change the style of the button
// If not, change it back
function inviteFriend (number, html) {
    myApp.showIndicator()
    var ajaxUrl = "http://gettimi.com/site/Invitefriends?user_token=" + 
    // "fc14487e19bc119e5e1115994bf094df" + 
     localStorage.usertoken + 
     "&number=" + number
     console.log(ajaxUrl)
     console.log("invite F")
     // $(this).html("adding..")
     // console.log(html)
     // lol = html
     $(html).removeClass("button"); 
     $(html).removeClass("color-green");
     $(html).addClass("color-gray"); 
     $(html).addClass("text-holder");       
     $(html).html('<div class="">Adding</div>')
     // $(html).removeClass("button"); 
     // $(html).removeClass("color-green");
     // $(html).addClass("color-gray"); 
     // $(html).addClass("text-holder");  

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // $(this).html("Added")
            $(html).html('<div class="">Added</div>')

            console.log("invite F good ")
            myApp.hideIndicator()
        }, 
        error: function (results) {
             $(html).addClass("button"); 
             $(html).addClass("color-green");
             $(html).removeClass("color-gray"); 
             $(html).removeClass("text-holder");       
             $(html).html('<div class="">Add</div>')            
            console.log("invite F bad")
            myApp.hideIndicator()
            myApp.alert("Network error. Please try again later? ")
        }, 
        timeout: timeOutValue
    });      
// http://gettimi.com/site/Invitefriends?user_token=fc14487e19bc119e5e1115994bf094df&callback=jQuery11110014998639413968062_1461351029249&_=1461351029251&number=2126410987    
}

function updateDistanceValue () {
    console.log("lol")
    


    clearTimeout(updateCalTimeout);
    document.getElementById("distance-value").innerHTML = document.getElementById("distance-range").value + "mi."
    updateCalTimeout = setTimeout(function () {
        // do the update here
    }, 800)
}

function getGeolocation () {  
    var onSuccess = function(position) {
        // myApp.alert('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n' +
        //       'Altitude: '          + position.coords.altitude          + '\n' +
        //       'Accuracy: '          + position.coords.accuracy          + '\n' +
        //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //       'Heading: '           + position.coords.heading           + '\n' +
        //       'Speed: '             + position.coords.speed             + '\n' +
        //       'Timestamp: '         + position.timestamp                + '\n');
        userLocation = [ position.coords.latitude, position.coords.longitude ]
        postGeolocation ()
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        // myApp.alert('code: '    + error.code    + '\n' +
        //       'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);    
}


function matched (name, number) {
    // name = name || "someone"
    myApp.confirm('Congrats! ' + name + ' says YES to you, too! Send him/her a message to grab a meal', "MATCHED",
      function () {
        textTo(number)
        // myApp.alert('You clicked Ok button');
      },
      function () {
        // myApp.alert('You clicked Cancel button');
      }
    );
}
function textTo (number) {
    number = number || "6178005220"
    window.open ("sms:" + number,"_system");
}

// import and display the contact list from users' mobile contacts
function loadFriendsFromContact () {
    if (!contactedLoaded) {
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true; 
        var fields = ["displayName", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
        document.getElementById("progressbar").style.display = "block"
    }

    function onSuccess(contacts) {
        document.getElementById("progressbar").style.display = "none"

        contactedLoaded = true; 

        // sort the names alphabetically
        contacts = contacts.sort(cSort);

        // generate the list of data
        contactsList = []; 
        var htmlString = "<ul>"

        contacts.map(function (userUnit) {
            var number = [], email = []
            // deal with phone number
            if (userUnit.phoneNumbers != null) {
                for (var j = 0; j < Math.min(userUnit.phoneNumbers.length, 3) ; j ++) {
                    number.push(userUnit.phoneNumbers[j].value)  


                    // check the invitation status
                    var arr = null ; 
                    var text = ""
                    for (var name in invitedList ) {
                        console.log(name)
                        if ( name == userUnit.name.formatted ) {
                            arr = invitedList[name]
                        }
                    }
                    if ( arr == null ) {
                        // the user is yet to be invited
                        text = "<div class='button button-fill color-gray ' onclick = \"inviteFriend(\'"+ userUnit.phoneNumbers[j].value +"\', this) \">Add</div>"

                    } else {
                        // The suer is invited or has signed up
                        var isInvited = arr[0]
                        var hasSignedUp = arr[1]

                        if (isInvited == 1 && hasSignedUp == 0) {
                            text = "<div class='text-holder color-gray'>Added</div>"
                        } else if ( hasSignedUp == 1 ){
                            text = "<div class='text-holder color-gray'>Friend</div>"
                        } else {
                            text = "<div class=' button button-fill color-gray ' onclick = \"inviteFriend(\'"+ userUnit.phoneNumbers[j].value +"\', this) \">Add</div>"
                        }                
                    }    

                    // update HTML string
                    htmlString += '<li>'+
                    '      <a href="#" class=" item-content"> '+
                    '        <div class="item-inner"> '+
                    '          <div class="item-title-row"> '+
                    '            <div class="item-title">'+ userUnit.name.formatted +'</div> '+
                    '            <div class="item-after">' + text + '</div> '+
                    '          </div> '+
                    '          <div class="item-subtitle color-gray">'+ userUnit.phoneNumbers[j].value +'</div> '+
                    // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
                    '        </div> '+
                    '      </a> '+
                    '    </li> '
                }                
            } 
            // deal with email
            if (userUnit.emails != null) {
                for (var j = 0; j < Math.min(userUnit.emails.length, 3) ; j ++) {
                    email.push(userUnit.emails[j].value)
                }                     
            }
            // add to contact list
            contactsList.push({
                "name": userUnit.name.formatted, 
                "number": number, 
                "email":email
            });            
        })
        updateContactList()
        document.getElementById("friend-list-form").innerHTML = htmlString + '</ul>'

    }

    function onError() {
        document.getElementById("progressbar").style.display = "none"
        alert("Some Error Occured");
    }          
}

function showNoFriendBlock () {
    setTimeout(function () {
        $(".no-friend").css("display", "block")
        $(".no-friend").addClass("animated bounceIn")
        setTimeout(function () {
            $(".no-friend").removeClass("animated bounceIn")
        }, 1000)
    }, 1500)        
}

// update the front page of the user's page given the userList
// timeFrame can be 0, 1, or 2
function updateFrontPage (timeFrame) {
    
    // if (loading) 

    if ( availFriend[timeFrame].length == 0 ) {
        console.log("has no stuff")
        placePulse(); 
        showNoFriendBlock ()
        return; 
    } else {
        $(".no-friend").css("display", "none")
        console.log("has stuff")
        placePulse (); 
        loadingCard = setTimeout(function () {
            document.getElementById("tinderslide").innerHTML = ""
            var tinderListHTML = "<div id='tinder-contain'><ul>"
            availFriend[timeFrame].map(function(item) {
                tinderListHTML += 
                '      <li> ' + 
                '            <div class="card demo-card-header-pic"> ' + 
                '              <div class="card-pic"  style="background:url(\''+ item.avatar + '\') 50% 50% no-repeat"></div> ' + 
                '              <div style="" class="card-header no-border">' + item.username + '</div> ' + 
                '              <div class="card-content"> ' + 
                '                <div class="card-content-inner"> ' + 
                // '                  <div class="color-pink">' +item.name+ ' says: </div>' + 
                '                   <div class="color-gray"><i class="fa fa-comments color-pink"></i>'+item.whatsup+'</div>' + 
                // '                  <div class="color-pink">' +item.name+ ' likes: </div>' + 
                '                   <div class="color-gray"><i class="fa fa-heart color-pink"></i>' + item.favorites.split(',').join(', ') + '</div> ' + 
                '                </div> ' + 
                '              </div> ' + 
                '              <div class="card-footer no-gutter row"> ' + 
                '                <a href="#" class="link button col-50 color-gray button-fill dislike-button">PASS</a> ' + 
                '                <a href="#" class="link button col-50 color-pink button-fill like-button">I\'M DOWN! </a> ' + 
                '              </div> ' + 
                '            </div>    ' +
                '            <div class="like" ></div> ' + 
                '            <div class="dislike" onclick="$(\"#tinderslide\").jTinder(\'dislike\');"></div> ' + 
                '          </li>'
            })

            document.getElementById("tinderslide").innerHTML = tinderListHTML + "</ul></div>"             

            initTinderSwipe ("#tinder-contain"); 
        }, 2000)
    } 
}


// Place the pulse effect
function placePulse () {
    var pulseHTML = 
    '   <img src="' + personalData.avatar + '" class="pulse-portrait animated bounceIn"  />' + 
    '   <div class="gps-ring"></div>' + 
    '   <div class="gps-ring-2"></div>' + 
    '   <div class="one-line-prompt no-friend" style="color:#929292">It looks like no friend is nearby. </div>' + 
    '   <div class="button color-pink one-line-button no-friend" onclick="">Invite More friends to Timi? </div>' + 
    '   <div class="one-line-prompt no-friend" style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
    document.getElementById("tinderslide").innerHTML = pulseHTML
    document.getElementById("tinderslide").style.display = "block"
}

function placeBusy (unit) {
    if ( unit == 0 ) {
        // busy
        var pulseHTML = 
        '   <img src="' + personalData.avatar + '" class="matched-portrait animated bounceIn "  />' + 
        // '   <div class="gps-ring"></div>' + 
        // '   <div class="gps-ring-2"></div>' + 
        '   <div class="one-line-prompt " style="color:#929292">It looks like you are busy for this time! </div>' + 
        '   <div class="button color-pink one-line-button " onclick=\'myApp.showTab(\"#availability-tab\");\'>Turn on the slot? </div>' 
        // '   <div class="one-line-prompt " style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"          
    } else {
        // matched with other
        var pulseHTML = 
        '   <img src="' + unit.avatar + '" class="pulse-portrait animated bounceIn"  />' +
        '   <div class="one-line-prompt " style="color:#929292">You are matched with ' + unit.username + ' </div>' + 
        '   <div class="button color-pink one-line-button " onclick="textTo(' + unit.phone + ')">Text '+ unit.username +'</div>' 
        // '   <div class="one-line-prompt " style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"          
    }
  
}


// Initiate the tinder swipe page, called when the home page is loaded
function initTinderSwipe (object) {
    $(object).jTinder({
        onLike: function(item) {
            console.log(item)
            console.log(availFriend[timeFrame][currentIndex[timeFrame]].username)
            var d = new Date();
            var n = d.getDay();
            requestFriend(ray_token, n, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 1);                         
            currentIndex[timeFrame]--
            if (currentIndex[timeFrame] < 0) {
                placePulse()
                showNoFriendBlock ()
                
            }
        }, 
        onDislike: function (item) {
            console.log(item)
            console.log(availFriend[timeFrame][currentIndex[timeFrame]].username)
            var d = new Date();
            var n = d.getDay();
            requestFriend(ray_token, n, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 2);                              
            currentIndex[timeFrame]--
            if (currentIndex[timeFrame] < 0) {
                placePulse()
                showNoFriendBlock ()            
            }
        }
    });    
    initTinderSwipeCSS()
    console.log("init")
    $(".like-button").on("click", function () {
        console.log(123)
        $(object).jTinder('like');
    })
    $(".dislike-button").on("click", function () {
        console.log(123)
        $(object).jTinder('dislike');
    })               
}

// Initiate the tinder page css, called when the home page is loaded
function initTinderSwipeCSS() {
    // if ( currentIndex[timeFrame] < 0 ) return; 
    if ($(window).height() < 600 ) {
        $(".card-pic").css("height", (Math.round($(window).width()*0.80)+1)+"px"); 
        $(".card-pic").css("width", (Math.round($(window).width()*0.80)+1)+"px"); 
        $("#tinderslide").css("width", (Math.round($(window).width()*0.80)+1)+"px"); 
        $("#tinderslide").css("left", "10%"); 
        var nav = 98; 
        var tbH = 50; 
        var statusH = 0; 
        var a = Math.round(($(window).height() - nav-tbH -statusH- $(".card.demo-card-header-pic").height())/2); 
        console.log(a)
        a += 44        
        $("#tinderslide").css("margin-top", a + "px"); 
    } else {
        $(".card-pic").css("height", (Math.round($(window).width()*0.94)+1)+"px"); 
        $(".card-pic").css("width", (Math.round($(window).width()*0.94)+1)+"px"); 
        var nav = 98; 
        var tbH = 50; 
         var statusH = 0; 
        var a = Math.round(($(window).height() - nav-tbH -statusH - $(".card.demo-card-header-pic").height())/2); 
        console.log(a)
        a += 44        
        $("#tinderslide").css("margin-top", a + "px"); 
    }
}
function updateFavFood () {
    // favoriteFoodList
    usersFavoriteList = []
    var dict = myApp.formToJSON('#favorite-food')  
    for (var x in dict) {
        if ( dict[x].length > 0 ) {
            usersFavoriteList.push(x)
        }
    }
}

function favoriteFoodUnitHTML (value) {
return '                <li> ' +
'                  <label class="label-checkbox item-content"> ' +
'                    <input type="checkbox" name="'+value+'" value="'+value+'" onchange="updateFavFood()"> ' +
'                    <div class="item-media"> ' +
'                      <i class="icon icon-form-checkbox"></i> ' +
'                    </div> ' +
'                    <div class="item-inner"> ' +
'                      <div class="item-title">'+ value +'</div> ' +
'                    </div> ' +
'                  </label> ' +
'                </li> '   
}

var myApp = new Framework7({
    swipeBackPage: false, 
    onPageInit: function (app, page) {
        a = app; 
        b = page; 
        console.log(app, page)
        $(".navbar").css("visibility", "visible")
        // if ()
        if (page.name == "index") {
            console.log("asdfasfa")
            $(".navbar").css("visibility", "hidden")    
        } else if (page.name == "home") {
            getFriendFreeTime ()       
            getPersonalInfo ()  
            getGeolocation ()      
            // getMySchedule()       
        } else if (page.name == "personal-setting-page") {

            // build fav food list
            var htmlString = "<ul>"
            favoriteFoodList.map(function (unit) {
                htmlString += favoriteFoodUnitHTML(unit)
                return; 
            })
            document.getElementById("favorite-food").innerHTML = htmlString + "</ul>"


            //
            // updateFavFood ()
            getPersonalInfo()
            // var formData = {}

            

            
        } else if (page.name == "ask-calendar") {
            updateForm()
        } 
    }
});
function updatePersonalPage () {
    document.getElementById("whatsup").value = personalData.whatsup
    document.getElementById("distance-range").value = personalData.range
    document.getElementById("distance-value").innerHTML = Math.round(personalData.range) + "mi."
    var formData = myApp.formToJSON('#favorite-food')

    for (var x in formData) {
        if (personalData.favorites.split(",").indexOf(x) == -1) {
            formData[x] = []
        } else {
            formData[x] = [x]
        }
    }
    myApp.formFromJSON('#favorite-food', formData)
}
 
// Init main view
var mainView = myApp.addView('.view-main', {
    domCache: true,  //enable inline pages
    dynamicNavbar: true

});

function goToMainPage () {
    mainView.router.loadPage({"pageName": "home"})
}
function goToFriendList () {
    mainView.router.loadPage({"pageName": "friends-list"})
}

function toChangeSettingPage () {
    mainView.router.loadPage({"pageName": "setting-page"})
}
function goToPersonalInfoPage() {
    mainView.router.loadPage({"pageName":"phone-number"})
}
function goToChattingPage () {
    mainView.router.loadPage({"pageName": "chatting-page"})
}


// sorting algorithm
var cSort = function(a, b) {
  aName = a.name.formatted
  bName = b.name.formatted
  return aName < bName ? -1 : (aName == bName ? 0 : 1);
};






function onDeviceReady () {
    if (localStorage.usertoken === undefined || localStorage.usertoken == null || localStorage.usertoken == '') {
        // not logged in 
        console.log("not logged in")
        // stay at index page
    } else if (localStorage.checkedPhone == false) {
        // phone no good
        console.log("phone not good")
        mainView.router.loadPage({
            "pageName": "phone-number", 
            "reload" : true, 
            "animatePages": true
        })             
    } else {
        console.log("good")
        mainView.router.loadPage({
            "pageName": "home", 
            "reload" : true, 
            "animatePages": true
        })
        updateInvitationStatus ()   
    } 
    var push = PushNotification.init({
        android: {
            senderID: "12345679"
        },
        ios: {
            alert: "true",
            badge: true,
            sound: "false",
            clearBadge: true
        },
        windows: {}
    });
    push.on("registration", function(data) {
        device_token = data.registrationId;
        // cordova.plugins.clipboard.copy(data.registrationId)
    });
    push.on("notification", function(data) {
        // 1 friend sign uo
        // 2 someone liked
        // 3 matched
        if (data.additionalData.type == "1") {
            // go to home
        }
        else if (data.additionalData.type == "2") {
            // go to home
        }
        else if (data.additionalData.type == "3") {
            // getMySchedule()
            matched( data.additionalData.username, data.additionalData.phone )
        }

        // window.cache.clear(clearCacheSuccess, clearCacheError);
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
        push.finish(function() {
            console.log("processing of push data is finished")
        })
    });
    push.on("error", function(e) {
        console.log("push error")
    })
}



function mobileFormat (text) {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');    
}

ray_token = "fc14487e19bc119e5e1115994bf094df"

jimmy_token = "34e760735a29876e2d95cd9c99d38b51"




// (0 for noon, 1 for evening, 2 for night)

// request or turn down friends
function requestFriend(token, day, time, receiver, decision) {
    var ajaxUrl = "http://gettimi.com/site/SendRequest?user_token=" + 
        token + "&request_day=" + 
        day + "&request_time=" + time + "&receiver=" + receiver + "&decision=" + decision; 
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            if (results.status == "sent") {
                // console.log("good")
                console.log(results)

            } else if (results.status == "matched"){
                var user = availFriend[timeFrame][currentIndex[timeFrame] + 1]
                console.log(user)
                matched(user.username, user.phone)
                // myApp.alert("matched!!!")
                // matched()
                console.log(results)
            } else {
                console.log(results)
            }
        }, 
        error: function (results) {
            myApp.hideIndicator()
            myApp.alert("Network error. Please try again later? ")
        }
    });  
}

// Load friends' free time to @userList
function getFriendFreeTime (user_token) {
    user_token = user_token || ray_token
    placePulse(); 
    var ajaxUrl = "http://gettimi.com/site/GetFriendsFreeSlots?user_token=" + user_token + "&day=" + queryDay
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            userList = JSON.parse(results.result)
            // addDetail(); 
            userList.map(function (unit) {
                for (var i = 0 ; i < 3; i ++) {
                    if ( unit.availability[i] == 1 ) {
                        availFriend[i].push(unit)
                    } 
                }
            })
            currentIndex = [ 
                availFriend[0].length - 1,
                availFriend[1].length - 1,
                availFriend[2].length - 1,                
            ]
            getMySchedule(
                function () {
                    updateFrontPage (timeFrame)    
            }); 

            
        }, 
        error: function (results) {
            myApp.alert("Network error. Please try again later? ")
        }
    });       
}

// Add artifical users' detail
function addDetail () {
    userList.map(function(item){
        console.log(item); 
        item["prompt"] = "let's chipotle and chill!";
        item["favorite"] = (Math.random() > 0.5) ? ["Asian, Ramen, Sushiiii"] : ["noddles", "fruit", "eggs"]
        item["picture"] = (Math.random() > 0.5) ? "http://www.wanhuajing.com/pic/1602/2411/4451604/1_531_341.jpg" : "https://scontent-lga3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1382242_598150426908028_673547697_n.jpg?oh=b97c6cfbaf26c37302d22add92a36c66&oe=577918FC"  
    });     
}


function getMySchedule (s) {

    var user_token = ray_token
    var day = queryDay
    var ajaxUrl = "http://gettimi.com/site/GetMySchedule?user_token=" + user_token + "&day=" + queryDay
    
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            myAvail = JSON.parse(results.result)
            console.log(myAvail)
            if ( myAvail[timeFrame] == 1 ) {
                if (s) {
                    s()
                }
            } else {
                placeBusy (myAvail[timeFrame])
            }
        }, 
        error: function (results) {
            myApp.alert("Network error. Please try again later? ")
        }
    });        
}


// download users' free time and display
function updateFreeTime () {
    // myApp.showIndicator()
    var user_token = ray_token
    var ajaxUrl = "http://gettimi.com/site/UpdateFreetime?user_token=" + user_token
    
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)
            avail = JSON.parse(results.result)
            updateForm()
        }, 
        error: function (results) {
            myApp.alert("Network error. Please try again later? ")
        }
    });      
}

function goToMatchPage () {
    mainView.router.loadPage({
        "pageName": "match-page"
    });    
}


// Upload users' availability
function submitCalendar () {
    myApp.showIndicator(); 
    var ajaxUrl = "http://gettimi.com/site/Freetime"                   
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        data: ({
            "free_time": JSON.stringify(avail), 
            "user_token": ray_token
        }), 
        dataType: "jsonp",
        success: function(results) {
            myApp.hideIndicator(); 
            getMySchedule ()
        }, 
        error: function (results) {
            myApp.hideIndicator(); 
        }
    });     
}


// switch to calendar page
function proceedToCalendar () {
    mainView.router.loadPage({"pageName": "ask-calendar"})
    document.getElementById("ask-calendar-back").style.display = "flex"
    updateFreeTime ()
}

$(".subnavbar .tab-link").on("click", function (e) {
    console.log(e)
    $(".subnavbar .tab-link").removeClass("active")
    $(this).addClass("active")
})
$$(".lunch-tab").on("click", function (e) {
    // if (loading) return; 

    if ( myAvail[0] != 1 ) {
        // not available
        clearTimeout(loadingCard)
        placeBusy (myAvail[0])
    } else {
        timeFrame = 0
        updateFrontPage (timeFrame)         
    }
})
$$(".dinner-tab").on("click", function (e) {
    if ( myAvail[1] != 1 ) {
        // not available
        clearTimeout(loadingCard)
        placeBusy (myAvail[1])
    } else {
        timeFrame = 1
        updateFrontPage (timeFrame)         
    }    
  
})
$$(".night-tab").on("click", function (e) {
    if ( myAvail[2] != 1 ) {
        // not available
        clearTimeout(loadingCard)
        placeBusy (myAvail[2])
    } else {
        timeFrame = 2
        updateFrontPage (timeFrame)         
    }          
})

// Update users' availability
function updateForm () {
    var htmlString = '              <div class="row"> '+
    '                <div class="col-25 top-row">Day<div class="calendar-note"style="color:rgba(152,152,152,0.15)">something</div></div> '+
    '                <div class="col-25 top-row">Lunch<div class="calendar-note">(11am-4pm)</div></div> '+
    '                <div class="col-25 top-row">Dinner<div class="calendar-note">(5pm-10pm)</div></div> '+
    '                <div class="col-25 top-row">Nightlife<div class="calendar-note">(10pm-)</div></div> '+
    '              </div>   ' 
    for (var i = 0; i < 7; i++) {
        htmlString += '<div class="row"><div class="col-25">'+ days[i] +'</div>'
        for (var j = 0; j < 3; j ++) {
            if (avail[i][j] == 0) {
                htmlString += '<div class="col-25"><div onclick="flip('+i+','+j+')"class=" gray-block "><i class="fa fa-minus"></i></div></div>'
            } else {
                htmlString += '<div class="col-25"><div onclick="flip('+i+','+j+')"class=" green-block "><i class="fa fa-check"></i></div></div>'
            }
            
        }
        htmlString += '</div>'
    }    
    $(".calendar-table").html(htmlString)

    // adjust
    var toolbarH = 50; 
    var navbarH = 44; 
    var promptH = 68;
    var targetH = ($(window).height() - toolbarH - navbarH - promptH ) / 8 - 2
    $(".calendar-table .row").css("line-height", targetH+"px")
    // $(".top-row").css("line-height", targetH/2+"px")
    // document.getElementById("calendar-table").innerHTML = htmlString
}


// Change users' free time, and save after 800ms
function flip(i,j) {
    clearTimeout(updateCalTimeout);
    avail[i][j] = Math.abs(avail[i][j] - 1); 
    updateCalTimeout = setTimeout(function () {
        submitCalendar()
    }, 800)
    updateForm()
}





function login () {
    if (!window.cordova) {
        var appId = 1692336331017767; 
        facebookConnectPlugin.browserInit(appId);
    }
    facebookConnectPlugin.login( ["email", "user_friends"],
        function (response) {
            console.log(response)
            // localStorage.usertoken = response
        	selfData.accessToken = response.authResponse.accessToken; 

            setTimeout(function () {
                getFriendsAndPersonalData ()
            }, 800)
        	


        	// alert(JSON.stringify(response)) 
        },
        function (response) { 
        	myApp.alert(JSON.stringify(response)) 
        });
        console.log("helloooooooooo");

}

function showDialog () { 
    facebookConnectPlugin.showDialog( { method: "feed" }, 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
}

function numberIsValid (number) {
    return true; 
}


// Verify phone number
function verifyPhone () {
    var countryCode = document.getElementById("country-code").innerHTML
    var phoneNumber = document.getElementById("phone-number-input").value

    if (numberIsValid(phoneNumber)) {
        myApp.showIndicator()
        var ajaxUrl = "http://gettimi.com/site/InputPhone?user_token=" + 
            localStorage.usertoken + "&number=" + countryCode + phoneNumber                        
        console.log(ajaxUrl)
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                // alert(results)
                myApp.hideIndicator()
                mainView.router.loadPage({"pageName":"verification-code"})
                setTimeout(function () {
                    document.getElementById("verification-code-input").focus()
                }, 800)
                console.log(results)
                // alert("sent")
                // myApp.alert("\u8bf7\u67e5\u6536\u60a8\u7684\u90ae\u4ef6")
            }
        });         
    }
   
}

$(".back-link").on("click", function (e) {
    mainView.router.back()
})

// Input verification code
function verifyCode () {
    var code = document.getElementById("verification-code-input").value
    var ajaxUrl = "http://gettimi.com/site/InputCode?user_token=" + 
        localStorage.usertoken + "&code=" + code
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            myApp.hideIndicator()
            localStorage.checkedPhone = true; 
            mainView.router.loadPage({"pageName":"ask-calendar"})
            document.getElementById("ask-calendar-back").style.display = "none"
            console.log(results)                
        }, 
        error: function (results) {
            myApp.hideIndicator()
            myApp.alert("the code you put is incorrect, please try again:)")
            mainView.router.loadPage({"pageName":"phone-number"})            
        }
    });      
}

// Get data from Facebook
function getFriendsAndPersonalData () { 
    console.log("api")
    facebookConnectPlugin.api( "me/?fields=name,id,email,friends", ["user_birthday", "user_friends"],
        function (response) { 
            console.log("success api")
           	selfData.userId = response.id;
            selfData.email = response.email;  
            selfData.name = response.name; 
            selfData.friends = response.friends;           
            friendDataEscaped = JSON.stringify(selfData).replace(/\//g, '\\\/');

            var ajaxUrl = "http://gettimi.com/site/facebookLogin"                      
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                dataType: "jsonp",
                data: ({'selfData':friendDataEscaped}),
                success: function(results) {
                    // localStorage 
                    console.log(JSON.stringify(results))
                    localStorage.usertoken = results["user_token"]
                    console.log(results["phone"].length)
                    if (!results["phone"].length) {
                        // not verified verified users
                        mainView.router.loadPage({"pageName":"phone-number"})
                        myApp.formFromJSON("#my-form", {
                            'name': selfData.name, 
                            'email': selfData.email, 
                            'phone' : ""
                        })
                        setTimeout(function () {
                            document.getElementById("phone-number-input").focus()
                        }, 800);                             

                    } else {
                        //   phone verified users
                        localStorage.checkedPhone = true; 
                        mainView.router.loadPage({
                            "pageName":"home"
                        })                    
                        

                    }
                }, 
                error: function (results) {
                    myApp.alert("no good")
                    console.log(results)

                }
            });             

            
            // cordova.plugins.clipboard.copy(friendDataEscaped);
        	// alert(JSON.stringify(friendDataEscaped)) 

        },
        function (response) { 
            myApp.alert("Please allow Facebook access to continue using timi:) ")
            // alert(JSON.stringify(response)) 
        }); 
}

function logPurchase () {
    facebookConnectPlugin.logPurchase(1.99, "USD",
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function logEvent () {
    // For more information on AppEvent param structure see
    // https://developers.facebook.com/docs/ios/app-events
    // https://developers.facebook.com/docs/android/app-events
    facebookConnectPlugin.logEvent("Purchased",
        {
            NumItems: 1,
            Currency: "USD",
            ContentType: "shoes",
            ContentID: "HDFU-8452"
        }, null,
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function getAccessToken () { 
    facebookConnectPlugin.getAccessToken( 
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function getStatus () { 
    facebookConnectPlugin.getLoginStatus( 
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function logout () {
    localStorage.usertoken = null; 
    localStorage.checkedPhone = false; 
    logoutFB()
    mainView.router.loadPage({
        "pageName":"index"
    })
}

function logoutFB () { 
    facebookConnectPlugin.logout( 
        function (response) { 
            console.log(JSON.stringify(response)) 
        },
        function (response) { 
            console.log(JSON.stringify(response)) 
        });
}