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
var myAvail = [1,1,1]; 
var xhr; 
var isCordova = false;
var device_token = "";
var loadingCard; 

var ray_token = "fc14487e19bc119e5e1115994bf094df"

var jimmy_token = "34e760735a29876e2d95cd9c99d38b51"
var loading = false;
var availFriend = []
for (var i = 0; i < 3; i++) {
    availFriend[i] = []
}
var userLocation = []
// var currentTimeFrame = 0;
// var usersFavoriteList = []
var timeOutValue = 5000;
var personalData = new Object ()
var selfData = new Object () ;
for (var i = 0 ; i < 7; i++) {
    avail[i] = []
    for (var j = 0; j < 3; j++ ) {
        avail [i][j] = 1; 
    }
}
// localStorage = window.localStorage; 
var push_notification;
var favoriteFoodList = ["Pizza", "Tex-Mex", "Ramen", "Sushi", "French", "American", "Coffee", "Burger", "Chinese/Spicy", "Chinese", "Indian", "Sandwich"].sort(cSort)
var currentIndex = [ null, null, null]; 
var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
var d = new Date()
var queryDay = ( d.getHours() <= 1 ) ? ((d.getDay() - 1) % 7 ): d.getDay()
// localStorage.allowedPush = "0"
var timeAvail; 

function updateTimeAvail () {
    if ( d.getHours() < 2) {
        timeAvail = [0,0,1]
        // t-1 night life
        // midnight
        // d.getHours 
    } else if ( d.getHours() < 15) {
        // lunch dinner night available
        timeAvail = [1,1,1]
    } else if ( d.getHours() < 21) {
        // dinner, night avialable
        timeAvail = [0,1,1]
    } else {
        timeAvail = [0,0,1]
        // night avialable
    }    
}
updateTimeAvail ()

var scriptHTML = document.getElementById("body-html").innerHTML
var strVar="";
strVar += "    <script>";
strVar += "      (function(d, s, id){";
strVar += "         var js, fjs = d.getElementsByTagName(s)[0];";
strVar += "         if (d.getElementById(id)) {return;}";
strVar += "         js = d.createElement(s); js.id = id;";
strVar += "         js.src = \"https:\/\/connect.facebook.net\/en_US\/sdk.js\";";
strVar += "         fjs.parentNode.insertBefore(js, fjs);";
strVar += "       }(document, 'script', 'facebook-jssdk'));";
strVar += "      window.fbAsyncInit = function() {";
strVar += "        FB.init({";
strVar += "          appId      : '1692336331017767',";
strVar += "          xfbml      : true,";
strVar += "          version    : 'v2.6'";
strVar += "        });";
strVar += "        FB.getLoginStatus(function(response) {";
strVar += "          if (response.status === 'connected') {";
strVar += "            console.log('Logged in.');";
strVar += "          }";
strVar += "          else {";
strVar += "            FB.login();";
strVar += "          }";
strVar += "        });      ";
strVar += "      };  ";
strVar += "    <\/script>    ";
strVar += "";
strVar += "    <div class=\"statusbar-overlay\" >";
strVar += "    <\/div>";
strVar += "    <div class=\"views\">";
strVar += "      <!-- Your main view -->";
strVar += "      <div class=\"view view-main\">";
strVar += "        <div class=\"navbar\" id=\"navbar-container\" >";
strVar += "            <!-- Home page navbar -->";
strVar += "          <div class=\"navbar-inner \" data-page=\"index\">";
strVar += "            <div class=\"center\"><\/div>";
strVar += "          <\/div>";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"home\">";
strVar += "";
strVar += "            <div class=\"center\" id=\"home-page-navbar-center\" onclick=\"switchTime ()\" >  Explore                     ";
strVar += "            <\/div>   ";
strVar += "        <div class=\"subnavbar\">";
strVar += "          <div class=\"buttons-row\">";
strVar += "            <a href=\"#tab1\" class=\"button lunch-tab tab-link active\">Lunch<\/a>";
strVar += "            <a href=\"#tab2\" class=\"button dinner-tab tab-link\">Dinner<\/a>";
strVar += "            <a href=\"#tab3\" class=\"button night-tab tab-link\">Night<\/a>";
strVar += "          <\/div>";
strVar += "        <\/div>                              ";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"match-page\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span>Back<\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\" >Matching<\/div>";
strVar += "           ";
strVar += "          <\/div>";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"ask-calendar\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\" id=\"ask-calendar-back\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span>Back<\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\">Your availability<\/div>";
strVar += "          <\/div>";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"chatting-page\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\" id=\"ask-calendar-back\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span>Back<\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\"><img class=\"navbar-chatting-avatar\" src= \"https:\/\/scontent-lga3-1.xx.fbcdn.net\/hphotos-prn2\/v\/t1.0-9\/10419421_10200182965892764_3445955032075166546_n.jpg?oh=af6473420546cff0c2bce9ed846f46a7&oe=57794D70\">Ray Xiao<\/div>";
strVar += "          <\/div>        ";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"personal-setting-page\" >";
strVar += "            <div class=\"left\" onclick=\"postPersonalInfo () \"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span>Back<\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\" >Personal Settings<\/div>";
strVar += "            <div class=\"right\" >";
strVar += "              <a class=\"link\">               ";
// strVar += "                <span>Save<\/span>";
strVar += "              <\/a>            ";
strVar += "            <\/div>";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"phone-number\">      ";
strVar += "            <div class=\"center\">Personal Info<\/div>";
strVar += "          <\/div>";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"friends-list\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span>Back<\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>";
strVar += "            <div class=\"center\">Friends<\/div>";
strVar += "          <\/div>        ";
strVar += "        <\/div>";
strVar += "        <span class=\"progressbar-infinite\" id=\"progressbar\"><\/span> ";
strVar += "";
strVar += "        <div class=\"pages navbar-through\">";
strVar += "          <div class=\"page cached\" data-page=\"phone-number\">";
strVar += "            <div class=\"page-content\">";
strVar += "              <form id=\"my-form\" class=\"list-block\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title label\">";
strVar += "                          <i class=\"fa fa-user\"><\/i>";
strVar += "                        <\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input type=\"text\" name=\"name\" placeholder=\"( your name )\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title label\">";
strVar += "                          <i class=\"fa fa-envelope\"><\/i>";
strVar += "                        <\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input type=\"text\" name=\"email\" placeholder=\"( your email )\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title label\" id=\"country-code\">+1<\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input id=\"phone-number-input\" type=\"tel\" name=\"phone\" placeholder=\"( your phone # )\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>                ";
strVar += "                <\/ul>";
strVar += "              <\/form>";
strVar += "              <div class=\"button one-line-button\" onclick=\"verifyPhone()\">";
strVar += "                TEXT ME! ";
strVar += "              <\/div>";
strVar += "              <div class= \"one-line-prompt\"> ";
strVar += "                Please let timi verify your number to find friends for you";
strVar += "              <\/div>                              ";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "          <div class=\"page cached \" data-page=\"home\">";
strVar += "            <div class=\"toolbar tabbar tabbar-labels\">";
strVar += "              <div class=\"toolbar-inner\">";
strVar += "                <a href=\"#explore-tab\" id=\"explore-tab-button\" class=\"tab-link active\">";
strVar += "                    <i class=\"fa fa-compass\"><\/i>";
strVar += "                    <!-- <span class=\"tabbar-label\">Explore<\/span> -->";
strVar += "                <\/a>";
strVar += "                <a href=\"#availability-tab\" class=\"tab-link\">";
strVar += "                    <i class=\"fa fa-calendar\">";
strVar += "                        <!-- <span class=\"badge bg-red\"><\/span> -->";
strVar += "                    <\/i>";
strVar += "                    <!-- <span class=\"tabbar-label\">Availability<\/span> -->";
strVar += "                <\/a>";
// strVar += "                <a href=\"#messenger-tab\" class=\"tab-link\">";
// strVar += "                    <i class=\"fa fa-comments\"><\/i>";
// strVar += "                    <!-- <span class=\"tabbar-label\">Messenger<\/span> -->";
// strVar += "                <\/a>";
strVar += "                <a href=\"#invitation-tab\" id=\"invitation-tab-button\" class=\"tab-link\">";
strVar += "                    <i class=\"fa fa-user-plus\"><\/i>";
strVar += "                    <!-- <span class=\"tabbar-label\">Invite<\/span> -->";
strVar += "                <\/a>";
strVar += "                <a href=\"#more-tab\" class=\"tab-link\">";
strVar += "                    <i class=\"fa fa-bars\"><\/i>";
strVar += "                    <!-- <span class=\"tabbar-label\">More<\/span> -->";
strVar += "                <\/a>        ";
strVar += "              <\/div>";
strVar += "            <\/div>          ";
strVar += "            ";
strVar += "            <div class=\"tabs\">";
strVar += "              <div id=\"explore-tab\" class=\"tab active\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\">";
strVar += "                    <div id=\"loading-icon\">";
strVar += "                    <\/div>";
strVar += "                    <div id=\"tinderslide\">";
strVar += "                        <ul>";
strVar += "                        <\/ul>";
strVar += "                    <\/div>            ";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 2 -->";
strVar += "              <div id=\"availability-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\">";
strVar += "                    <div class=\"one-line-prompt\">";
strVar += "                      let timi know when you are available! ";
strVar += "                    <\/div>                     ";
strVar += "                    <div class=\"calendar-table\">       ";
strVar += "                    <\/div>";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 3 -->";
strVar += "              <div id=\"messenger-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\">";
strVar += "                    <div class=\"list-block media-list\">";
strVar += "                      <ul>";
strVar += "                        <li>";
strVar += "                          <a href=\"#\" class=\"item-link item-content\">";
strVar += "                            <div class=\"item-media\"><img src=\"https:\/\/scontent-lga3-1.xx.fbcdn.net\/hphotos-xpt1\/v\/t1.0-9\/10600360_10153439561687143_5185744258781611244_n.jpg?oh=f1474ca7e812482eb2cf6b9b5a2505d0&oe=57AEED71\" width=\"60\"><\/div>";
strVar += "                            <div class=\"item-inner\" onclick=\"goToChattingPage()\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\">Yellow Submarine<\/div>";
strVar += "                                <div class=\"item-after\">7:39PM<\/div>";
strVar += "                              <\/div>";
strVar += "                              <!-- <div class=\"item-subtitle\">Beatles<\/div> -->";
strVar += "                              <div class=\"item-text\">Lorem ipsum dolor sit amet...<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/a>";
strVar += "                        <\/li>           ";
strVar += "                      <\/ul>";
strVar += "                    <\/div>";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 4 -->";
strVar += "              <div id=\"invitation-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\">";
strVar += "                  <form data-search-list=\".list-block-search\" data-search-in=\".item-title\" class=\"searchbar searchbar-init\">";
strVar += "                    <div class=\"searchbar-input\">";
strVar += "                      <input type=\"search\" placeholder=\"Search\"><a href=\"#\" class=\"searchbar-clear\"><\/a>";
strVar += "                    <\/div><a href=\"#\" class=\"searchbar-cancel\">Cancel<\/a>";
strVar += "                  <\/form>          ";
strVar += "                  <div class=\"searchbar-overlay\"><\/div>            ";
strVar += "                    <div class=\"content-block searchbar-not-found\">";
strVar += "                      <div class=\"content-block-inner\">Nothing found<\/div>";
strVar += "                    <\/div>            ";
strVar += "                    <div class=\"list-block media-list list-block-search searchbar-found\" id=\"friend-list-form\">";
strVar += "                      <div class=\"one-line-prompt\" style=\"color:#929292;\">There is no friend yet. <\/div>";
strVar += "                      <div class=\"button one-line-button\" onclick = \"loadFriendsFromContact ()\"> Let Timi find friends for you? <\/div>";
strVar += "                    <\/div>   ";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 5 -->";
strVar += "              <div id=\"more-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\" >";
strVar += "                    <div class=\"profile-image-container\" id=\"profile-pic-background\">";
strVar += "                    <\/div>";
strVar += "                    <div class=\"\">";
strVar += "                      <img onclick=\"changePicture()\" id=\"profile-pic\"class=\"profile-pic\" src=''>";
strVar += "                    <\/div>";
strVar += "                    <div class=\"user-name\" id=\"profile-name\">";
strVar += "";
strVar += "                    <\/div>";
strVar += "";
strVar += "                    <div class=\"edit-profile-text\"> ";
strVar += "                      Edit Profile Picture";
strVar += "                    <\/div>";
strVar += "                    ";
strVar += "                    <div class=\"list-block media-list\">";
strVar += "                      <ul>";
strVar += "                        <li onclick='mainView.router.loadPage({\"pageName\":\"personal-setting-page\"})'>";
strVar += "                          <div class=\"item-content\">";
strVar += "                            <div class=\"item-media\">";
strVar += "                              <i class=\"fa fa-heart\"><\/i>";
strVar += "                            <\/div>";
strVar += "                            <div class=\"item-inner\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\">Personal Setting<\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"item-subtitle\">Favorite Food, Prompt, and more<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/div>";
strVar += "                        <\/li>";
strVar += "                        <li onclick='window.open(\"sms:6178005220&body=Hi I have a question about Timi:\")'>";
strVar += "                          <div class=\"item-content\">";
strVar += "                            <div class=\"item-media\">";
strVar += "                              <i class=\"fa  fa-question-circle\"><\/i>";
strVar += "                            <\/div>";
strVar += "                            <div class=\"item-inner\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\">Help<\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"item-subtitle\">FAQ, contact, and more<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/div>";
strVar += "                        <\/li>    ";
strVar += "                        <li>";
strVar += "                          <div class=\"item-content\" onclick=\"logout()\">";
strVar += "                            <div class=\"item-media\">";
strVar += "                              <i class=\"fa  fa-sign-out\"><\/i>";
strVar += "                            <\/div>";
strVar += "                            <div class=\"item-inner\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\">Log out<\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"item-subtitle\">No, No, and more<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/div>";
strVar += "                        <\/li>                                                                          ";
strVar += "                      <\/ul>";
strVar += "                    <\/div>";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>            ";
strVar += "            <\/div>";
strVar += "          <\/div>          ";
strVar += "          <div class=\"page no-navbar\" data-page=\"index\">";
strVar += "            <div class=\"page-content first-page\" >";
strVar += "<!--               <h1 class=\"title\">";
strVar += "              Timi                    ";
strVar += "              <\/h1> -->";
strVar += "              <img class=\"front-page-logo\" src = \"img\/timi.png\">";
strVar += "              <div class=\"one-line-prompt\">";
strVar += "                Timi is the easiest way to get friends to hang out.";
strVar += "              <\/div>";
strVar += "              <div class=\"button facebook-login-button\" onclick=\"login()\">";
strVar += "                <i class=\"fa fa-facebook\" aria-hidden=\"true\"><\/i>";
strVar += "                <span class=\"text\">Continue with Facebook";
strVar += "                <\/span>";
strVar += "              <\/div>";
strVar += "              <div class=\"no-facebook\" onclick=\"goToPersonalInfoPage()\">";
strVar += "                I don't have a Facebook account";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>  ";
strVar += "";
strVar += "          <div class=\"page cached \" data-page=\"personal-setting-page\">";
strVar += "            <div class=\"page-content\" >";
strVar += "              <div class=\"content-block-title\">";
strVar += "                <span>What's in your mind <a class=\"clear-whatsup\" onclick=\"cleanWhatsUp()\">clear all</a><\/span>";
strVar += "              <\/div> ";
strVar += "              <div class=\"list-block\" id=\"prompt-list-block\">";
strVar += "                <ul>";
strVar += "                  <li class=\"align-top\">";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-input\">";
strVar += "                            <textarea class=\"resizable\" id=\"whatsup\" placeholder=\"Let your friend what's in your mind. E.g., Let's Chipotle and chill? \"><\/textarea>";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>";
strVar += "                <\/ul>";
strVar += "              <\/div>                       ";
strVar += "";
strVar += "   ";
strVar += "";
// strVar += "              <div class=\"content-block-title\">";
// strVar += "                <span>Maximum Distance<\/span>";
// strVar += "                <span style=\"float:right\" id=\"distance-value\">5mi.<\/span>";
// strVar += "              <\/div>";
// strVar += "              <div class=\"list-block\">";
// strVar += "                <ul>";
// strVar += "                  <li>";
// strVar += "                    <div class=\"item-content\">                ";
// strVar += "                      <div class=\"item-inner\">";
// strVar += "                        <div class=\"item-input\">";
// strVar += "                            <input";
// strVar += "                                type=\"range\"";
// strVar += "                                min=\"5\"                    \/\/ default 0";
// strVar += "                                max=\"75\"                  \/\/ default 100";
// strVar += "                                step=\"1\"                   \/\/ default 1";
// strVar += "                                value=\"10\"                 \/\/ default min + (max-min)\/2";
// strVar += "                                data-orientation=\"horizontal\" \/\/ default horizontal";
// strVar += "                                onchange=\"updateDistanceValue()\"";
// strVar += "                                oninput=\"updateDistanceValue()\"";
// strVar += "                                id=\"distance-range\"";
// strVar += "";
// strVar += "                            >";
// strVar += "                        <\/div>  ";
// strVar += "                      <\/div>      ";
// strVar += "                    <\/div>           ";
// strVar += "                  <\/li>";
// strVar += "                <\/ul>";
// strVar += "              <\/div>";
strVar += "              <div class=\"content-block-title\">";
strVar += "                <span>Favorite Food <a id=\"favorite-food-prompt\" class=\"clear-whatsup\"></a><\/span>";
strVar += "              <\/div>            ";
strVar += "              <form class=\"list-block\" id=\"favorite-food\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <label class=\"label-checkbox item-content\">";
strVar += "                      <input type=\"checkbox\" name=\"my-checkbox\" value=\"Books\">";
strVar += "                      <div class=\"item-media\">";
strVar += "                        <i class=\"icon icon-form-checkbox\"><\/i>";
strVar += "                      <\/div>";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title\">Books<\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/label>";
strVar += "                  <\/li>";
strVar += "                <\/ul>";
strVar += "              <\/form>                 ";
strVar += "            <\/div>";
strVar += "          <\/div>          ";
strVar += "          <div class=\"page cached\" data-page=\"verification-code\">";
strVar += "            <div class=\"page-content\">";
strVar += "              <form  class=\"list-block\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input id=\"verification-code-input\" type=\"tel\" name=\"verification-code\" placeholder=\"Verification Code\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>             ";
strVar += "                <\/ul>";
strVar += "              <\/form>         ";
strVar += "              <div class=\"button one-line-button color-pink \" onclick=\"verifyCode()\">";
strVar += "                SUBMIT";
strVar += "              <\/div>               ";
strVar += "            <\/div>";
strVar += "";
strVar += "          <\/div>";
strVar += "          <div class=\"page cached\" data-page=\"ask-calendar\">";
strVar += "            <div class=\"page-content\">";
strVar += "              <div class=\"one-line-prompt\">";
strVar += "                let timi know when to match you with your friends! ";
strVar += "              <\/div>                     ";
strVar += "              <div class=\"calendar-table\">       ";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>     ";
strVar += "          <div class=\"page cached toolbar-fixed\" data-page=\"chatting-page\">";
strVar += "            <div class=\"toolbar messagebar\">";
strVar += "              <div class=\"toolbar-inner\">";
strVar += "                <textarea placeholder=\"Message\"><\/textarea><a href=\"#\" class=\"link\">Send<\/a>";
strVar += "              <\/div>";
strVar += "            <\/div>            ";
strVar += "            <div class=\"page-content messages-content\">";
strVar += "              <div class=\"messages\">";
strVar += "                <div class=\"messages-date\">Sunday, Feb 9 <span>12:58<\/span><\/div>";
strVar += "                <div class=\"message message-sent\">";
strVar += "                  <div class=\"message-text\">Hello<\/div>";
strVar += "                <\/div>";
strVar += "                <div class=\"message message-sent\">";
strVar += "                  <div class=\"message-text\">How are you?<\/div>";
strVar += "                <\/div>";
strVar += "                <div class=\"message message-received\">";
strVar += "                  <div class=\"message-name\">Ray Xiao<\/div>";
strVar += "";
strVar += "                  <div class=\"message-text\">I am fine, thanks<\/div>";
strVar += "                  <div style=\"background-image:url('http:\/\/www.sinaimg.cn\/ty\/http\/video.sina.com.cn\/p\/sports\/k\/v\/2016-04-17\/U11936P6T408D232505F8868DT20160417140713.jpg')\" class=\"message-avatar\"><\/div>";
strVar += "                <\/div>";
strVar += "                <div class=\"messages-date\">Sunday, Feb 3 <span>11:58<\/span><\/div>";
strVar += "                <div class=\"message message-sent\">";
strVar += "                  <div class=\"message-text\">Nice photo?<\/div>";
strVar += "                <\/div>";
strVar += "                <div class=\"message message-sent message-pic\">";
strVar += "                  <div class=\"message-text\"><img src=\"http:\/\/www.sinaimg.cn\/ty\/http\/video.sina.com.cn\/p\/sports\/k\/v\/2016-04-17\/U11936P6T408D232505F8868DT20160417140713.jpg\"><\/div>";
strVar += "                  <div class=\"message-label\">Delivered<\/div>";
strVar += "                <\/div>";
strVar += "                <div class=\"message message-received\">";
strVar += "                  <div class=\"message-name\">Ray Xiao<\/div>";
strVar += "                  <div class=\"message-text\">Wow, awesome!<\/div>";
strVar += "                  <div style=\"background-image:url(http:\/\/lorempixel.com\/output\/people-q-c-100-100-9.jpg)\" class=\"message-avatar\"><\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>          ";
strVar += "          <div class=\"page cached\" data-page=\"push-notification\">";
strVar += "            <div class=\"page-content\">";
strVar += "              Please allow Push Notification so that you know when you are paired with a friend! ";
strVar += "            <\/div>";
strVar += "          <\/div>              ";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "    <div class=\"popup popup-intro \">";
strVar += "";
strVar += "      <div class=\"swiper-container swiper-init\" onload=\"initIntro()\">";
strVar += "          <div class=\"swiper-wrapper\">";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img\" src=\"img\/screenshot\/5.5-inch-1.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  Timi helps you quickly find friends for lunch, dinner, and activities at night";
strVar += "                <\/div> -->";
strVar += "                ";
strVar += "              <\/div>";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img\" src=\"img\/screenshot\/5.5-inch-2.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  Anonymously \"Like\" or \"Pass\"";
strVar += "                <\/div> -->";
strVar += "              <\/div>";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img\" src=\"img\/screenshot\/5.5-inch-3.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  We'll let you know if someone likes you back";
strVar += "                <\/div> -->";
strVar += "              <\/div>";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img\" src=\"img\/screenshot\/5.5-inch-4.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  We'll let you know if someone likes you back";
strVar += "                <\/div> -->";
strVar += "              <\/div>              ";
strVar += "          <\/div>";
strVar += "          <div class=\"swiper-pagination\"><\/div>";
strVar += "      <\/div>  ";
strVar += "      <div class=\"one-line-prompt\"> ";
strVar += "        By signing in you agree with our <a onclick='tos()'>Terms of Service</a>";
strVar += "      <\/div>      ";
strVar += "      <div class=\"button facebook-login-button-tutorial\" onclick=\"login()\">";
strVar += "        <i class=\"fa fa-facebook\" aria-hidden=\"true\"><\/i>";
strVar += "        <span class=\"text\">Continue with Facebook";
strVar += "        <\/span>";
strVar += "      <\/div> ";
strVar += "      <div class=\"one-line-prompt\"> ";
strVar += "        We don't post anything to Facebook";
strVar += "      <\/div>      ";
strVar += "    <\/div>";
strVar += "  <div class=\"popup popup-services\"> "
strVar += "    <div class=\"content-block\"> <div class='button one-line-button color-pink' onclick='myApp.closeModal(\".popup-services\")'>Close</div>"
strVar += "<p>Welcome to Timi, operated by Timi, Inc. (the &ldquo;Company&rdquo; or &ldquo;Timi&rdquo;). By creating a Timi account, whether through a mobile device, mobile application or computer (collectively, the &ldquo;Service&rdquo;) you agree to be bound by these Terms of Use (this &ldquo;Agreement&rdquo;). If you wish to create a Timi account and make use of the Service, please read this Agreement. You should also read the Timi Privacy Policy, which is incorporated by reference into this Agreement and available in the Service. If you do not accept and agree to be bound by all of the terms of this Agreement, including the Timi Privacy Policy, do not use the Service. Please contact us with any questions regarding this Agreement. Acceptance of Terms of Use Agreement.  a. This Agreement is an electronic contract that establishes the legally binding terms you must accept to use the Service. This Agreement includes the Company&rsquo;s (i) Privacy Policy, (ii) our Safety Tips and (iii) terms disclosed and agreed to by you if you purchase or accept additional features, products or services we offer on the Service, such as terms governing features, billing, free trials, discounts and promotions. b. By accessing or using the Service, you accept this Agreement and agree to the terms, conditions and notices contained or referenced herein and consent to have this Agreement and all notices provided to you in electronic form. To withdraw this consent, you must cease using the Service and terminate your account. Please print a copy of this Agreement for your records. To receive a non-electronic copy of this Agreement, please contact us at help@gettimi.com. c. We may, at any time and for any reason make changes to this Agreement. We may do this for a variety of reasons including to reflect changes in or requirements of the law, new features, or changes in business practices. The most recent version of this Agreement will be posted on the Services under Settings and also on gettimi.com, and you should regularly check for the most recent version. The most recent version is the version that applies. If the changes include material changes that affect your rights or obligations, we will notify you of the changes by reasonable means, which could include notification through the Services or via email. If you continue to use the Services after the changes become effective, then you shall be deemed to have accepted those changes. If you don&rsquo;t agree to these changes, you must end your relationship with us (without penalty) by ceasing to use the Services and leaving Timi. Additionally, if we update or upgrade the Services, you may be required to accept the most recent version of the Agreement to access the updated or upgraded Services.  Eligibility. No part of Timi is directed to persons under the age of 13. You must be at least 13 years of age to access and use the Service. Any use of the Service is void where prohibited. By accessing and using the Service, you represent and warrant that you have the right, authority and capacity to enter into this Agreement and to abide by all of the terms and conditions of this Agreement. If you create an account, you represent and warrant that you have never been convicted of a felony and that you are not required to register as a sex offender with any government entity. Using the Service may be prohibited or restricted in certain countries. If you use the Service from outside of the United States, you are responsible for complying with the laws and regulations of the territory from which you access or use the Service. Creating an Account. In order to use Timi, you must have or create a Facebook account and sign in using your Facebook login. If you do so, you authorize us to access and use certain Facebook account information, including but not limited to your public Facebook profile and information about Facebook friends you might share in common with other Timi users. </p> " 
strVar += "<p>Term and Termination. This Agreement will remain in full force and effect while you use the Service and/or have a Timi account. You may terminate your account at any time, for any reason, by following the instructions in &ldquo;Settings&rdquo; in the Service. The Company may terminate or suspend your account at any time without notice if the Company believes that you have breached this Agreement, or for any other reason, in its sole discretion. Upon such termination or suspension, you will not be entitled to any refund of unused fees for in app purchases. The Company is not required to disclose, and may be prohibited by law from disclosing, the reason for the termination or suspension of your account. After your account is terminated, this Agreement will terminate, except that the following provisions will still apply: Section 4, Section 8, Section 9(e), Section 15, and Sections 17-19. Non-commercial Use by Users. The Service is for personal use only. Users may not use the Service or any content contained in the Service (including, but not limited to, content of other users, designs, text, graphics, images, video, information, logos, software, audio files and computer code) in connection with any commercial endeavors, such as (i) advertising or soliciting any user to buy or sell any products or services not offered by the Company or (ii) soliciting others to attend parties or other social functions, or networking, for commercial purposes. Users of the Service may not use any information obtained from the Service to contact, advertise to, solicit, or sell to any other user without his or her prior explicit consent. Organizations, companies, and/or businesses may not use the Service or the Service for any purpose except with Timi&rsquo;s express consent (such as for promoted profiles or other advertisements), which Timi may provide or deny in its sole discretion. The Company may investigate and take any available legal action in response to illegal and/or unauthorized uses of the Service, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email and unauthorized framing of or linking to the Service. Account Security. You are responsible for maintaining the confidentiality of the username and password you designate during the registration process, and you are solely responsible for all activities that occur under your username and password. You agree to immediately notify the Company of any disclosure or unauthorized use of your username or password or any other breach of security at help@gettimi.com and ensure that you log out from your account at the end of each session. Your Interactions with Other Users.   YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS. YOU UNDERSTAND THAT THE COMPANY CURRENTLY DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS OR SCREENINGS ON ITS USERS. THE COMPANY ALSO DOES NOT INQUIRE INTO THE BACKGROUNDS OF ALL OF ITS USERS OR ATTEMPT TO VERIFY THE STATEMENTS OF ITS USERS. THE COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS OR THEIR COMPATIBILITY WITH ANY CURRENT OR FUTURE USERS. THE COMPANY RESERVES THE RIGHT TO CONDUCT ANY CRIMINAL BACKGROUND CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES), AT ANY TIME AND USING AVAILABLE PUBLIC RECORDS. The Company is not responsible for the conduct of any user. As noted in and without limiting Sections 15 and 17 below, in no event shall the Company, its affiliates or its partners be liable (directly or indirectly) for any losses or damages whatsoever, whether direct, indirect, general, special, compensatory, consequential, and/or incidental, arising out of or relating to the conduct of you or anyone else in connection with the use of the Service including, without limitation, death, bodily injury, emotional distress, and/or any other damages resulting from communications or meetings with other users or persons you meet through the Service. You agree to take all necessary precautions in all interactions with other users, particularly if you decide to communicate off the Service or meet in person, or if you decide to send money to another user. In addition, you agree to review and follow the Company's Safety Tips, located in the Service, prior to using the Service. You understand that the Company makes no guarantees, either express or implied, regarding your ultimate compatibility with individuals you meet through the Service. You should not provide your financial information (for example, your credit card or bank account information), or wire or otherwise send money, to other users. Proprietary Rights. The Company owns and retains all proprietary rights in the Service, and in all content, trademarks, trade names, service marks and other intellectual property rights related thereto. The Service contains the copyrighted material, trademarks, and other proprietary information of the Company and its licensors. You agree to not copy, modify, transmit, create any derivative works from, make use of, or reproduce in any way any copyrighted material, trademarks, trade names, service marks, or other intellectual property or proprietary information accessible through the Service, without first obtaining the prior written consent of the Company or, if such property is not owned by the Company, the owner of such intellectual property or proprietary rights. You agree to not remove, obscure or otherwise alter any proprietary notices appearing on any content, including copyright, trademark and other intellectual property notices. Content Posted by You in the Service. You are solely responsible for the content and information that you post, upload, publish, link to, transmit, record, display or otherwise make available (hereinafter, &ldquo;post&rdquo;) on the Service or transmit to other users, including text messages, chat, videos (including streaming videos), photographs, or profile text, whether publicly posted or privately transmitted (collectively, &ldquo;Content&rdquo;). You may not post as part of the Service, or transmit to the Company or any other user (either on or off the Service), any offensive, inaccurate, incomplete, abusive, obscene, profane, threatening, intimidating, harassing, racially offensive, or illegal material, or any material that infringes or violates another person&rsquo;s rights (including intellectual property rights, and rights of privacy and publicity). You represent and warrant that (i) all information that you submit upon creation of your account, including information submitted from your Facebook account, is accurate and truthful and that you will promptly update any information provided by you that subsequently becomes inaccurate, incomplete, misleading or false and (ii) you have the right to post the Content on the Service and grant the licenses set forth below. You understand and agree that the Company may, but is not obligated to, monitor or review any Content you post as part of a Service. The Company may delete any Content, in whole or in part, that in the sole judgment of the Company violates this Agreement or may harm the reputation of the Service or the Company. By posting Content as part of the Service, you automatically grant to the Company, its affiliates, licensees and successors, a non-exclusive, transferable, sub-licensable, fully paid-up, worldwide right and license to (i) use, copy, store, perform, display, reproduce, record, play, adapt, modify and distribute the Content, (ii) prepare derivative works of the Content or incorporate the Content into other works, and (iii) grant and authorize sublicenses of the foregoing in any media now known or hereafter created. You represent and warrant that any posting and use of your Content by the Company will not infringe or violate the rights of any third party. In addition to the types of Content described in Section 9(a) above, the following is a partial list of the kind of Content that is prohibited in the Service. You may not post, upload, display or otherwise make available Content that: that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual; advocates harassment or intimidation of another person; requests money from, or is intended to otherwise defraud, other users of the Service; involves the transmission of &ldquo;junk mail&rdquo;, &ldquo;chain letters,&rdquo; or unsolicited mass mailing or &ldquo;spamming&rdquo; (or &ldquo;spimming&rdquo;, &ldquo;phishing&rdquo;, &ldquo;trolling&rdquo; or similar activities); promotes information that is false or misleading, or promotes illegal activities or conduct that is defamatory, libelous or otherwise objectionable; promotes an illegal or unauthorized copy of another person&rsquo;s copyrighted work, such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated images, audio or video, or links to pirated images, audio or video files; contains video, audio photographs, or images of another person without his or her permission (or in the case of a minor, the minor&rsquo;s legal guardian); contains restricted or password only access pages, or hidden pages or images (those not linked to or from another accessible page); provides material that exploits people in a sexual, violent or other illegal manner, or solicits personal information from anyone under the age of 18; provides instructional information about illegal activities such as making or buying illegal weapons or drugs, violating someone&rsquo;s privacy, or providing, disseminating or creating computer viruses; contains viruses, time bombs, trojan horses, cancelbots, worms or other harmful, or disruptive codes, components or devices; impersonates, or otherwise misrepresents affiliation, connection or association with, any person or entity; provides information or data you do not have a right to make available under law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information); disrupts the normal flow of dialogue, causes a screen to &ldquo;scroll&rdquo; faster than other users are able to type, or otherwise negatively affects other users&rsquo; ability to engage in real time exchanges; solicits passwords or personal identifying information for commercial or unlawful purposes from other users or disseminates another person&rsquo;s personal information without his or her permission; and publicizes or promotes commercial activities and/or sales without our prior written consent such as contests, sweepstakes, barter, advertising, and pyramid schemes. The Company reserves the right, in its sole discretion, to investigate and take any legal action against anyone who violates this provision, including removing the offending communication from the Service and terminating or suspending the account of such violators. Your use of the Service, including all Content you post through the Service, must comply with all applicable laws and regulations. You agree that the Company may access, preserve and disclose your account information and Content if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary, such as to: (i) comply with legal process; (ii) enforce this Agreement; (iii) respond to claims that any Content violates the rights of third parties; (iv) respond to your requests for customer service or allow you to use the Service in the future; or (v) protect the rights, property or personal safety of the Company or any other person. You agree that any Content you place on the Service may be viewed by other users and may be viewed by any person visiting or participating in the Service (such as individuals who may receive shared Content from other Timi users).  Prohibited Activities. The Company reserves the right to investigate, suspend and/or terminate your account if you have misused the Service or behaved in a way the Company regards as inappropriate or unlawful, including actions or communications the occur off the Service but involve users you meet through the Service. The following is a partial list of the type of actions that you may not engage in with respect to the Service. You will not: impersonate any person or entity. solicit money from any users. post any Content that is prohibited by Section 9. &ldquo;stalk&rdquo; or otherwise harass any person. express or imply that any statements you make are endorsed by the Company without our specific prior written consent. use the Service in an illegal manner or to commit an illegal act; access the Service in a jurisdiction in which it is illegal or unauthorized; ask or use users to conceal the identity, source, or destination of any illegally gained money or products. use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, &ldquo;data mine&rdquo;, or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents. collect usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email or unauthorized framing of or linking to the Service. interfere with or disrupt the Service or the servers or networks connected to the Service. email or otherwise transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment. forge headers or otherwise manipulate identifiers in order to disguise the origin of any information transmitted to or through the Service (either directly or indirectly through use of third party software). &ldquo;frame&rdquo; or &ldquo;mirror&rdquo; any part of the Service, without the Company's prior written authorization. use meta tags or code or other devices containing any reference to the Company or the Service (or any trademark, trade name, service mark, logo or slogan of the Company) to direct any person to any other website for any purpose. modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or otherwise disassemble any portion of the Service any software used on or for the Service, or cause others to do so. post, use, transmit or distribute, directly or indirectly, (e.g. screen scrape) in any manner or media any content or information obtained from the Service other than solely in connection with your use of the Service in accordance with this Agreement.  Customer Service. The Company provides assistance and guidance through its customer care representatives. When communicating with our customer care representatives, you agree to not be abusive, obscene, profane, offensive, sexist, threatening, harassing, racially offensive, or to not otherwise behave inappropriately. If we feel that your behavior towards any of our customer care representatives or other employees is at any time threatening or offensive, we reserve the right to immediately terminate your account.  In App Purchases. Generally. From time to time, Timi may offer additional products and services for purchase (&ldquo;in app purchases&rdquo;) through the App Store &#8480;, Google Play or other application platforms authorized by Timi (each, a &ldquo;Software Store&rdquo;). If you choose to make an in app purchase, you will be prompted to enter details for your account with the mobile platform you are using (e.g., Apple, Android, etc.) (&ldquo;your IAP Account&rdquo;), and your IAP Account will be charged for the in app purchase in accordance with the terms disclosed to you at the time of purchase as well as the general terms for in app purchases that apply to your IAP Account. In app purchases may include a free trial period. At the end of the free trial period, you will be charged the price of the subscription and will continue to be charged until you cancel your subscription. To avoid any charges, you must cancel before the end of the trial period. If you purchase an auto-recurring periodic subscription through an in app purchase, your IAP Account will be billed continuously for the subscription until you cancel in accordance with the platform terms. In all cases, please refer to the terms of your application platform which apply to your in app purchases. Super Likes and Other Virtual Items. From time to time, you may be able to purchase, with &ldquo;real world&rdquo; money, a limited, personal, non-transferable, non-sublicensable, revocable license to use &ldquo;virtual items&rdquo;, including but not limited to Super Likes (collectively, &ldquo;Virtual Items&rdquo;). You are only allowed to purchase Virtual Items from us or our authorized partners through the Service and not in any other way. Regardless of the terminology used, Virtual Items represent a limited license right governed by this Agreement. Except as otherwise prohibited by applicable law, Virtual Items obtained by you are licensed to you, and you hereby acknowledge that no title or ownership in or to Virtual Items is being transferred or assigned hereunder. This Agreement should not be construed as a sale of any rights in Virtual Items. Any Virtual Item balance shown in your account does not constitute a real-world balance or reflect any stored value, but instead constitutes a measurement of the extent of your license. Virtual Items do not incur fees for non-use; provided, however, that the license granted hereunder to Virtual Items will terminate in accordance with the terms and conditions of this Agreement, when Timi ceases providing the Service or this Agreement or your Account is otherwise terminated. Timi, in its sole discretion, reserves the right to charge fees for the right to access or use Virtual Items and/or may distribute Virtual Items with or without charge. You may purchase Virtual Items only within the Service or through a Software Store. Purchase and use of Virtual Items through a Software Store are subject to such Software Store&rsquo;s governing documents, including but not limited to its terms of service and privacy policy. Timi may manage, regulate, control, modify or eliminate Virtual Items at any time. Timi shall have no liability to you or any third party in the event that Timi exercises any such rights. The transfer of Virtual Items is prohibited, and you shall not sell, redeem or otherwise transfer Virtual Items to any person or entity. Virtual Items may only be redeemed through the Service. ALL PURCHASES AND REDEMPTIONS OF VIRTUAL ITEMS MADE THROUGH THE SERVICE ARE FINAL AND NON-REFUNDABLE. The provision of Virtual Items for use in the Service is a service provided by Timi that commences immediately upon the acceptance of your purchase of such Virtual Items. You agree to pay all fees and applicable taxes incurred by you or anyone using your Timi account. Timi may revise the pricing for the goods and services offered through the Service at any time. YOU ACKNOWLEDGE THAT Timi IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED VIRTUAL ITEMS WHEN AN ACCOUNT IS CLOSED, WHETHER SUCH CLOSURE WAS VOLUNTARY OR INVOLUNTARY.  Modifications to Service. The Company reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that the Company shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service. To protect the integrity of the Service, the Company reserves the right at any time in its sole discretion to block users from certain IP addresses from accessing the Service.  Copyright Policy; Notice and Procedure for Making Claims of Copyright Infringement. You may not post, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior written consent of the owner of such proprietary rights. Without limiting the foregoing, if you believe that your work has been copied and posted on the Service in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information: an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; a description of the copyrighted work that you claim has been infringed; a description of where the material that you claim is infringing is located on the Service (and such description must be reasonably sufficient to enable the Company to find the alleged infringing material, such as a url); your address, telephone number and email address; a written statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf. Notice of claims of copyright infringement should be provided to the Company&rsquo;s Copyright Agent at copyright@match.com or the following address: </p>"
strVar += "<p>Copyright Agent  c/o Timi Legal  P.O. Box 25458  Dallas, Texas 75225. The Company will terminate the accounts of repeat infringers.  Disclaimers. You acknowledge and agree that neither the Company nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage, including personal injury or death, as a result of or alleged to be the result of (i) any incorrect or inaccurate Content posted in the Service, whether caused by users or any of the equipment or programming associated with or utilized in the Service; (ii) the timeliness, deletion or removal, incorrect delivery or failure to store any Content, communications or personalization settings; (iii) the conduct, whether online or offline, of any user; (iv) any error, omission or defect in, interruption, deletion, alteration, delay in operation or transmission, theft or destruction of, or unauthorized access to, any user or user communications; or (v) any problems, failure or technical malfunction of any telephone network or lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or at any website or combination thereof, including injury or damage to users or to any other person&rsquo;s computer or device related to or resulting from participating or downloading materials in connection with the Internet and/or in connection with the Service. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, THE COMPANY PROVIDES THE SERVICE ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS AND GRANTS NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO THE SERVICE (INCLUDING ALL CONTENT CONTAINED THEREIN), INCLUDING (WITHOUT LIMITATION) ANY IMPLIED WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. THE COMPANY DOES NOT REPRESENT OR WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR FREE, SECURE OR THAT ANY DEFECTS OR ERRORS IN THE SERVICE WILL BE CORRECTED. ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR AND HEREBY WAIVE ANY AND ALL CLAIMS AND CAUSES OF ACTION WITH RESPECT TO ANY DAMAGE TO YOUR DEVICE, COMPUTER SYSTEM, INTERNET ACCESS, DOWNLOAD OR DISPLAY DEVICE, OR LOSS OR CORRUPTION OF DATA THAT RESULTS OR MAY RESULT FROM THE DOWNLOAD OF ANY SUCH MATERIAL. IF YOU DO NOT ACCEPT THIS LIMITATION OF LIABILITY, YOU ARE NOT AUTHORIZED TO DOWNLOAD OR OBTAIN ANY MATERIAL THROUGH THE SERVICE. From time to time, the Company may make third party opinions, advice, statements, offers, or other third party information or content available through the Service. All third party content is the responsibility of the respective authors thereof and should not necessarily be relied upon. Such third party authors are solely responsible for such content. THE COMPANY DOES NOT: (I) GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY THIRD PARTY CONTENT PROVIDED THROUGH THE SERVICE, OR (II) ADOPT, ENDORSE OR ACCEPT RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY OPINION, ADVICE, OR STATEMENT MADE BY ANY PARTY THAT APPEARS IN THE SERVICE. UNDER NO CIRCUMSTANCES WILL THE COMPANY OR ITS AFFILIATES BE RESPONSIBLE OR LIABLE FOR ANY LOSS OR DAMAGE RESULTING FROM YOUR RELIANCE ON INFORMATION OR OTHER CONTENT POSTED IN THE SERVICE, OR TRANSMITTED TO OR BY ANY USERS. In addition to the preceding paragraph and other provisions of this Agreement, any advice that may be posted in the Service is for informational and entertainment purposes only and is not intended to replace or substitute for any professional financial, medical, legal, or other advice. The Company makes no representations or warranties and expressly disclaims any and all liability concerning any treatment, action by, or effect on any person following the information offered or provided within or through the Service. If you have specific concerns or a situation arises in which you require professional or medical advice, you should consult with an appropriately trained and qualified specialist.  Links. The Service may contain, and the Service or third parties may provide, advertisements and promotions offered by third parties and links to other web sites or resources. You acknowledge and agree that the Company is not responsible for the availability of such external websites or resources, and does not endorse and is not responsible or liable for any content, information, statements, advertising, goods or services, or other materials on or available from such websites or resources. Your correspondence or business dealings with, or participation in promotions of, third parties found in or through the Service, including payment and delivery of related goods or services, and any other terms, conditions, warranties or representations associated with such dealings, are solely between you and such third party. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of, or reliance upon, any such content, information, statements, advertising, goods or services or other materials available on or through any such website or resource.  Limitation on Liability. TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, BUSINESS PARTNERS, LICENSORS OR SERVICE PROVIDERS BE LIABLE TO YOU OR ANY THIRD PERSON FOR ANY INDIRECT, RELIANCE, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OF GOODWILL, DAMAGES FOR LOSS, CORRUPTION OR BREACHES OF DATA OR PROGRAMS, SERVICE INTERRUPTIONS AND PROCUREMENT OF SUBSTITUTE SERVICES, EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, THE COMPANY'S LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO THE COMPANY FOR THE SERVICE WHILE YOU HAVE AN ACCOUNT. YOU AGREE THAT REGARDLESS OF ANY STATUTE OR LAW TO THE CONTRARY, ANY CLAIM OR CAUSE OF ACTION ARISING OUT OF OR RELATED TO USE OF THE SERVICE OR THE TERMS OF THIS AGREEMENT MUST BE FILED WITHIN ONE YEAR AFTER SUCH CLAIM OR CAUSE OF ACTION AROSE OR BE FOREVER BARRED.  Arbitration and Governing Law. Except for users residing within the European Union and elsewhere where prohibited by applicable law: The exclusive means of resolving any dispute or claim arising out of or relating to this Agreement (including any alleged breach thereof) or the Service shall be BINDING ARBITRATION administered by the American Arbitration Association. The one exception to the exclusivity of arbitration is that you have the right to bring an individual claim against the Company in a small-claims court of competent jurisdiction. But whether you choose arbitration or small-claims court, you may not under any circumstances commence or maintain against the Company any class action, class arbitration, or other representative action or proceeding. By using the Service in any manner, you agree to the above arbitration agreement. In doing so, YOU GIVE UP YOUR RIGHT TO GO TO COURT to assert or defend any claims between you and the Company (except for matters that may be taken to small-claims court). YOU ALSO GIVE UP YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION OR OTHER CLASS PROCEEDING. Your rights will be determined by a NEUTRAL ARBITRATOR, NOT A JUDGE OR JURY. You are entitled to a fair hearing before the arbitrator. The arbitrator can grant any relief that a court can, but you should note that arbitration proceedings are usually simpler and more streamlined than trials and other judicial proceedings. Decisions by the arbitrator are enforceable in court and may be overturned by a court only for very limited reasons. For details on the arbitration process, see ourArbitration Procedures. Any proceeding to enforce this arbitration agreement, including any proceeding to confirm, modify, or vacate an arbitration award, may be commenced in any court of competent jurisdiction. In the event that this arbitration agreement is for any reason held to be unenforceable, any litigation against the Company (except for small-claims court actions) may be commenced only in the federal or state courts located in Dallas County, Texas. You hereby irrevocably consent to the jurisdiction of those courts for such purposes. This Agreement, and any dispute between you and the Company, shall be governed by the laws of the state of Texas without regard to principles of conflicts of law, provided that this arbitration agreement shall be governed by the Federal Arbitration Act. For users residing in the European Union or elsewhere where this arbitration agreement is prohibited by law, the laws of Texas, U.S.A., excluding Texas&rsquo;s conflict of laws rules, will apply to any disputes arising out of or relating to this Agreement or the Services. All claims arising out of or relating to this Agreement or the Services will be litigated exclusively in the federal or state courts of Dallas County, Texas, USA, and you and Timi consent to personal jurisdiction in those courts. Indemnity by You. You agree to indemnify and hold the Company, its subsidiaries, and affiliates, and its and their officers, agents, partners and employees, harmless from any loss, liability, claim, or demand, including reasonable attorney's fees, made by any third party due to or arising out of your breach of or failure to comply with this Agreement (including any breach of your representations and warranties contained herein), any postings or Content you post in the Service, and the violation of any law or regulation by you. The Company reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with the Company in connection therewith.  Notice. The Company may provide you with notices, including those regarding changes to this Agreement, using any reasonable means now known or hereafter developed, including by email, regular mail, SMS, MMS, text message or postings in the Service. Such notices may not be received if you violate this Agreement by accessing the Service in an unauthorized manner. You agree that you are deemed to have received any and all notices that would have been delivered had you accessed the Service in an authorized manner. Entire Agreement; Other. This Agreement, with the Privacy Policy and any specific guidelines or rules that are separately posted for particular services or offers in the Service, contains the entire agreement between you and the Company regarding the use of the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect. The failure of the Company to exercise or enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision. You agree that your online account is non-transferable and all of your rights to your profile or contents within your account terminate upon your death. No agency, partnership, joint venture or employment is created as a result of this Agreement and you may not make any representations or bind the Company in any manner. Special State Terms. The following provisions are added to this Agreement for subscribers residing in Arizona, California, Connecticut, Illinois, Iowa, Minnesota, New York, North Carolina, Ohio and Wisconsin: You, the buyer, may cancel this Agreement, without penalty or obligation, at any time prior to midnight of the third business day following the original date of this contract, excluding Sundays and holidays. To cancel this agreement, please follow these instructions: </p>"
strVar += "    </div> "
strVar += "  </div> "


document.getElementById("body-html").innerHTML += strVar + scriptHTML




function appReturnedFromBackground () {
    console.log("returned")
    // getFriendFreeTime()
    updateTimeAvail ()
    afterClickTab(timeFrame)
    if ( localStorage.usertoken == "null" || localStorage.usertoken == null) {
        getGeolocation()
    }
}

function tos() {
    myApp.popup(".popup-services")
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
    if ( localStorage.allowedContact == 1 ) {
        loadFriendsFromContact()
    }
    changeNavbarTitle("Invite friends to Timi"); 
    console.log('Tab 4 is visible');
});    



$$('#more-tab').on('show', function () {
    $(".subnavbar").css("display", "none")
    changeNavbarTitle("More");
    document.getElementById("profile-pic").src = personalData.avatar;
    document.getElementById("profile-name").innerHTML = personalData.username
    $("#profile-pic-background").css("background", ('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + personalData.avatar + ')'  ))
    console.log(localStorage.usertoken)
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
    localStorage.allowedContact = null; 
    localStorage.allowedPush = null;
}

function initIntro () {

}

// take selfie to change the profile picture
function changePicture () {

    var buttons = [
        {
            text: 'Upload from Camera',
            onClick: function () {
                console.log("pic")
                navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
                    quality: 50,
                    allowEdit : true,
                    destinationType: Camera.DestinationType.DATA_URI, 
                    targetWidth: 360,
                    encodingType: Camera.EncodingType.JPEG,
                    targetHeight: 360,

                });
            }
        },
        {
            text: 'Upload from Album',
            onClick: function () {
                navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
                    quality: 50,
                    allowEdit : true,
                    destinationType: Camera.DestinationType.DATA_URI, 
                    targetWidth: 360,
                    encodingType: Camera.EncodingType.JPEG,
                    targetHeight: 360,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY

                });
            }
        },        
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);



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
        "user_token": localStorage.usertoken, 
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
    // myApp.showIndicator()

    if (document.getElementById("whatsup").value != "") {
        localStorage.hasChangedPref = 1
    }
    var infoObject = {
        "user_token": localStorage.usertoken, 
        "favorites": usersFavoriteList,
        // "range": document.getElementById("distance-range").value, 
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
            // myApp.hideIndicator()

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            myApp.alert("Network error. Please try again later? ")
        }
    });        
}

function getPersonalInfo () {
    var ajaxUrl = "http://gettimi.com/site/returnInfo?user_token=" + localStorage.usertoken
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

// $("#favorite-food input").on("change", function (e) {
//     console.log("yes")
//     console.log(this)
// })

function cleanWhatsUp () {
    document.getElementById("whatsup").value = ""
}

// fired once the user invited their friend. Invite friends by sending sms on the backend. 
// If success, change the style of the button
// If not, change it back
function inviteFriend (number, html) {
    myApp.showIndicator()
    var ajaxUrl = "http://gettimi.com/site/Invitefriends?user_token=" + 
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
    if ( localStorage.allowedLocation != 1 ) {
        myApp.confirm("Allow us to get your location to help you find friends? ", "Timi", function (){
            navigator.geolocation.getCurrentPosition(onSuccess, onError);    
            localStorage.allowedLocation = 1
        })        
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);    
    }



    
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


    if ( (localStorage.allowedContact == null || localStorage.allowedContact == "null") ) {
        myApp.confirm("Allow us to access your Contacts to find friends for you? ", "Timi ", function () {
            localStorage.allowedContact = "1"
            if (!contactedLoaded) {
                var options = new ContactFindOptions();
                options.filter="";
                options.multiple=true; 
                var fields = ["displayName", "phoneNumbers"];
                navigator.contacts.find(fields, onSuccess, onError, options);
                document.getElementById("progressbar").style.display = "block"
            }                    
        }, function () {
            return; 
        })
    } else {
        if (!contactedLoaded) {
            var options = new ContactFindOptions();
            options.filter="";
            options.multiple=true; 
            var fields = ["displayName", "phoneNumbers"];
            navigator.contacts.find(fields, onSuccess, onError, options);
            document.getElementById("progressbar").style.display = "block"
        }        
        // return;
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
                        // console.log(name)
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
        // localStorage.contacts = JSON.stringify(contactsList) 
        console.log(contactsList)
        updateContactList()
        document.getElementById("friend-list-form").innerHTML = htmlString + '</ul>'

    }

    function onError() {
        document.getElementById("progressbar").style.display = "none"
        alert("Some Error Occured");
    }          
}

// used with placePulse

function showNoFriendBlock () {
    setTimeout(function () {
        $(".no-friend").css("display", "block")
        $(".no-friend").addClass("animated bounceIn")
        setTimeout(function () {
            $(".no-friend").removeClass("animated bounceIn")
        }, 1000)
    }, 1500)        
}

function reportUser () {
    var buttons = [
        {
            text: 'Report User',
            onClick: function () {
                console.log("report")
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
}

// update the front page of the user's page given the userList
// timeFrame can be 0, 1, or 2
function updateFrontPage (timeFrame) {
    
    // if (loading) 
    console.log("update fornt page")

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
                '              <div style="" class="card-header no-border">' + item.username + '<div class="report-user color-gray" onclick="reportUser()"><i class="fa fa-ellipsis-h"></i></div></div> ' + 
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
        }, 1000)
    } 
}

function inviteNextFriend () {
    // console.log()
    var index = Math.round(Math.random() * contactsList.length)
    document.getElementById("invite-friend-name").innerHTML = contactsList[index].name
    
}

function initShuffleInvite () {
    $("#invitation-tab-button")[0].click()
}

// Place the pulse effect
function placePulse () {
    var pulseHTML = ''
    if ( localStorage.allowedContact == "1" ) {
        // if contact is allowed
        pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="pulse-portrait animated bounceIn"  />' + 
        '   <div class="gps-ring"></div>' + 
        '   <div class="gps-ring-2"></div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#929292">It looks like no friend is nearby. Invite more friends by sending them FREE text!</div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#222; font-size: 17px;">Invite <span id="invite-friend-name"></span> !</div>' +     

        '   <div class="row"> ' +
        '        <div class="col-50"> ' +
        '            <div class="button button-fill color-gray no-friend" style="height:44px;line-height:44px;" onclick="inviteNextFriend()">Skip</div> ' +
        '        </div> ' +
        '        <div class="col-50"> ' +
        '            <div class="button button-fill color-pink no-friend" style="height:44px;line-height:44px;" onclick="sendInvite()">Invite</div> ' +
        '        </div> ' +
        '    </div>'
        inviteNextFriend ()
        // '   <div class="button color-pink one-line-button no-friend" onclick="">Invite More friends to Timi? </div>' + 
        // '   <div class="one-line-prompt no-friend" style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
    } else {
        // if contact is not allowed yet
        pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="pulse-portrait animated bounceIn"  />' + 
        '   <div class="gps-ring"></div>' + 
        '   <div class="gps-ring-2"></div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#929292">It looks like no friend is nearby. Invite more friends by sending them FREE text!</div>' + 
        // '   <div class="one-line-prompt no-friend" style="color:#222; font-size: 17px;">Invite <span id="invite-friend-name">Ray Xiao</span>!</div>' +     

        // '   <div class="row"> ' +
        // '        <div class="col-50"> ' +
        // '            <div class="button button-fill color-gray no-friend" style="height:44px;line-height:44px;" onclick="inviteNextFriend()">Skip</div> ' +
        // '        </div> ' +
        // '        <div class="col-50"> ' +
        // '            <div class="button button-fill color-pink no-friend" style="height:44px;line-height:44px;" onclick="sendInvite()">Invite</div> ' +
        // '        </div> ' +
        // '    </div>'
        '   <div class="button color-pink one-line-button no-friend" onclick="initShuffleInvite ()">Invite More friends to Timi? </div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
    }

    document.getElementById("tinderslide").innerHTML = pulseHTML
    document.getElementById("tinderslide").style.display = "block"
}

function sendInvite () {

}
// several cases
// past the time
//  timeAvail[timeFrame]
// if gets 0, meaning that the person set him/herself to be busy

// if gets user, meaning that the person is matched with others

// placeBusy will change the UI


function placeBusy (unit) {
    var mealIndicator = ""; 
    if (timeFrame == 0) {
        mealIndicator =  "Lunch can be called from 2am-2pm"
    } else if ( timeFrame == 1 ) {
        mealIndicator =  "Dinner can be called from 2am-9pm"
    }
    console.log(mealIndicator)
    if ( timeAvail[timeFrame] == 0 ) {
        //
        var pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="matched-portrait animated bounceIn "  />' + 
        // '   <div class="gps-ring"></div>' + 
        // '   <div class="gps-ring-2"></div>' + 
        '   <div class="one-line-prompt " style="color:#929292">It looks like the time has past already. ' + mealIndicator + ' </div>' 
        // '   <div class="button color-pink one-line-button " onclick=\'myApp.showTab(\"#availability-tab\");\'>Turn on the slot? </div>' 
        // '   <div class="one-line-prompt " style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"          
        return; 
    }
    if ( unit == 0 ) {
        // busy
        var pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="matched-portrait animated bounceIn "  />' + 
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
        // '   <img src="' + "img/timi.png" + '" class="pulse-portrait animated bounceIn"  />' +        
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
            console.log(n,timeFrame,availFriend[timeFrame][currentIndex[timeFrame]].user_id)
            requestFriend(localStorage.usertoken, n, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 1);                         
            currentIndex[timeFrame]--
            if (currentIndex[timeFrame] < 0) {
                placePulse()
                showNoFriendBlock ()
                // getFriendFreeTime ()
                
            }
        }, 
        onDislike: function (item) {
            console.log(item)
            console.log(availFriend[timeFrame][currentIndex[timeFrame]].username)
            var d = new Date();
            var n = d.getDay();
            console.log(n,timeFrame,availFriend[timeFrame][currentIndex[timeFrame]].user_id)

            requestFriend(localStorage.usertoken, n, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 2);                              
            currentIndex[timeFrame]--
            if (currentIndex[timeFrame] < 0) {
                placePulse()
                showNoFriendBlock ()      
                // getFriendFreeTime ()      
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
    
    if ( usersFavoriteList.length < 3 ) {
        var num = 3 - usersFavoriteList.length
        document.getElementById("favorite-food-prompt").innerHTML = "Please choose at least 3 items."
        
    } else {
        document.getElementById("favorite-food-prompt").innerHTML = "<i class='fa fa-check  '></i>"
    }
}

function updateNotificationId () {



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

            // popupTutorial()
        } else if (page.name == "home") {
            if ( !((localStorage.usertoken) == null || (localStorage.usertoken == "null")) ) {
                // getFriendFreeTime ()       
                afterClickTab(timeFrame)
                // getPersonalInfo ()  
                if ( (localStorage.allowedPush != "null") && (localStorage.allowedPush != 1) ) {
                    // not null and not 1
                    myApp.confirm("Allow Push Notification so that you know when you are matched?", "Timi ", function () {
                        localStorage.allowedPush = "1"
                        initPush ()
                    })
                } else {
                    if ( isCordova ) {
                        initPush ()
                    }
                }                
            }

            // getMySchedule()       
        } else if (page.name == "personal-setting-page") {

            // build fav food list
            var htmlString = "<ul>"
            favoriteFoodList.map(function (unit) {
                htmlString += favoriteFoodUnitHTML(unit)
                return; 
            })
            document.getElementById("favorite-food").innerHTML = htmlString + "</ul>"
            getPersonalInfo()
            
        } else if (page.name == "ask-calendar") {
            updateForm()
        } 
    }
});
function updatePersonalPage () {
    document.getElementById("whatsup").value = personalData.whatsup
    // document.getElementById("distance-range").value = personalData.range
    // document.getElementById("distance-value").innerHTML = Math.round(personalData.range) + "mi."
    var formData = myApp.formToJSON('#favorite-food')
    var chose = 0; 
    usersFavoriteList = []
    for (var x in formData) {
        if (personalData.favorites.split(",").indexOf(x) == -1) {
            formData[x] = []
        } else {
            num ++ 
            usersFavoriteList.push(x)
            formData[x] = [x]
        }
    }
    if ( chose < 3 ) {
        var num = 3 - chose
        document.getElementById("favorite-food-prompt").innerHTML = "Please choose at least 3 items."
        
    } else {
        document.getElementById("favorite-food-prompt").innerHTML = "<i class='fa fa-check animated bounceIn'></i>"
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
        setTimeout(function () {
            popupTutorial ()
        }, 200)         
        // stay at index page
    } else if (localStorage.checkedPhone == false) {
        // phone no good
        console.log("phone not good")
        // mainView.router.loadPage({
        //     "pageName": "phone-number", 
        //     "reload" : true, 
        //     "animatePages": true
        // })             
        setTimeout(function () {
            popupTutorial ()
        }, 200)               
    } else {
        console.log("good")
        mainView.router.loadPage({
            "pageName": "home", 
            "reload" : true, 
            "animatePages": true
        })
        getMySchedule()
        // getFriendFreeTime ()
        getPersonalInfo ()
        $("#explore-tab-button")[0].click()
        $(currentTab())[0].click()
        afterClickTab(timeFrame)
        document.addEventListener("resume", appReturnedFromBackground, false);      
        updateInvitationStatus ()   
    } 
    isCordova = true;


}

function initPush () {
    push_notification = PushNotification.init({
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
    push_notification.on("registration", function(data) {
        device_token = data.registrationId;
        console.log("get token")

        if ( device_token != "" ) {
            var ajaxUrl = "http://gettimi.com/site/takeDeviceToken?user_token=" + 
                localStorage.usertoken + "&device_type=" + "iOS" + "&device_token=" + device_token
                console.log(ajaxUrl)
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                dataType: "jsonp",
                success: function(results) {
                    console.log(result)
                }, 
                error: function (results) {

                }
            });           
        } else {
            console.log("device_token not found")
        }        
        // cordova.plugins.clipboard.copy(data.registrationId)
    });
    push_notification.on("notification", function(data) {
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


// 'title'=>'You have been matched with '.$user->username.' for '.$time_word.'!',
// 'type'=>3,//3 for match
// 'user_id'=>$friend->id,
// 'username'=>$friend->username,
// 'avatar'=>Yii::app()->params['globalURL'].$friend->avatar,
// 'email'=>$friend->email,
// 'phone'=>$friend->phone,
// 'country'=>$friend->country,
// 'city'=>$friend->city,
// 'geolocation'=>$friend->geolocation,
// 'favorites'=>$friend->favorites,
// 'whatsup'=>$friend->whatsup,
// 'range'=>$friend->range,
// 'day'=>$_GET['request_day'],
// 'time'=>$_GET['request_time'],       
            mainView.router.loadPage({"pageName":"home"})     
            $("#explore-tab-button")[0].click();
            
            if ( data.additionalData.time == 0) {
                timeFrame = 0
                $(".lunch-tab")[0].click()
            } else if ( data.additionalData.time == 1) {
                timeFrame = 1
                $(".dinner-tab")[0].click()
            } else {
                timeFrame = 2
                $(".night-tab")[0].click()
            }             
            var unit = {
                "avatar":data.additionalData.avatar,
                "username":data.additionalData.username,
                "phone":data.additionalData.phene
            }         
            // post confirmation box
            matched( data.additionalData.username, data.additionalData.phone )
            // therefore occupied
            placeBusy (unit)
        }

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
    })    
    updateNotificationId ()
}

function popupTutorial () {
    myApp.popup(".popup-intro")   
    // $(".statusbar-overlay").css("background", "fff")
    var mySwiper = myApp.swiper('.swiper-container', {
        speed: 400,
        pagination:'.swiper-pagination',
        spaceBetween: 100
    });   
}
function mobileFormat (text) {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');    
}





// (0 for noon, 1 for evening, 2 for night)

// request or turn down friends
function requestFriend(token, day, time, receiver, decision) {
    var ajaxUrl = "http://gettimi.com/site/SendRequest?user_token=" + 
        token + "&request_day=" + 
        day + "&request_time=" + time + "&receiver=" + receiver + "&decision=" + decision; 
        console.log(ajaxUrl)
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
                placeBusy(user)
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
// Query the users' friends availability
// make three lists
// update currentIndex or different columns
// compare with my avil and update the front page

function getFriendFreeTime (user_token) {
    user_token = user_token || localStorage.usertoken
    placePulse(); 
    var ajaxUrl = "http://gettimi.com/site/GetFriendsFreeSlots?user_token=" + user_token + "&day=" + queryDay
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            userList = JSON.parse(results.result)
            // addDetail(); 
            availFriend = [[], [], []]
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

// get my availability, if avail, execute the callback


function getMySchedule (callbackFunction) {
    console.log("get my schedule")
    var user_token = localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/GetMySchedule?user_token=" + user_token + "&day=" + queryDay
    
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            myAvail = JSON.parse(results.result)
            console.log(myAvail)
            if ( myAvail[timeFrame] == 1 ) {
                if (callbackFunction) {
                    callbackFunction()
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
    var user_token = localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/UpdateFreetime?user_token=" + user_token
    
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)
            avail = JSON.parse(results.result)
            if (avail.length == []) {
                for (var i = 0 ; i < 7; i++) {
                    avail[i] = []
                    for (var j = 0; j < 3; j++ ) {
                        avail [i][j] = 1; 
                    }
                }
            }
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
    // myApp.showIndicator(); 
    var ajaxUrl = "http://gettimi.com/site/Freetime"                   
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        data: ({
            "free_time": JSON.stringify(avail), 
            "user_token": localStorage.usertoken
        }), 
        dataType: "jsonp",
        success: function(results) {
            // myApp.hideIndicator(); 
            getMySchedule ()
        }, 
        error: function (results) {
            // myApp.hideIndicator(); 
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

// switch to a certain time frame
// if no more, then show no friends
// if person sets not avail, ask him/her to turn on
// or matched. 
// myAvail is either 0, 1, or a user object
// otherwise update

function afterClickTab (timeFrame) {
    
    // not avail: occupied or not updated
    if ( myAvail[timeFrame] != 1 || timeAvail[timeFrame] != 1 ) {

        console.log("yea")
        clearTimeout(loadingCard)
        placeBusy (myAvail[timeFrame])        
    } else {    
        // no friend
        if ( currentIndex[timeFrame] < 0 ) {
            console.log("heyo1")
            // not available, let placeBusy handle
            placePulse ()
            showNoFriendBlock ()
        } else {
            console.log("heyo2")
            // if avail && with more users, show it
            getFriendFreeTime()          
            // updateFrontPage (timeFrame)         
        }    
    }
}

$$(".lunch-tab").on("click", function (e) {
    timeFrame = 0
    afterClickTab (timeFrame)
})


$$(".dinner-tab").on("click", function (e) {
    timeFrame = 1
    afterClickTab (timeFrame)
})
$$(".night-tab").on("click", function (e) {
    timeFrame = 2
    afterClickTab (timeFrame)
})
$$("#explore-tab-button").on("click", function (e) {
    afterClickTab (timeFrame)
    
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
    console.log("done ui form")
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
            // getGeolocation ()
            // localStorage.usertoken = response
            selfData.accessToken = response.authResponse.accessToken; 
            console.log("here1")
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

function currentTab () {
    if (timeFrame == 0) {
        return ".lunch-tab"
    } else if (timeFrame == 1){
        return ".dinner-tab"
    } else {
        return ".night-tab"
    }
}

function updatePreferencePrompt () {
    setTimeout(function () {
        if ( localStorage.hasChangedPref == null || localStorage.hasChangedPref == "null") {
            myApp.confirm("Update your preference to let your friend know what you want? ", 
                "Timi", 
                function () {
                    mainView.router.loadPage({"pageName": "personal-setting-page"}); 
                })                            
        }     
    }, 1000)     
}

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
            mainView.router.loadPage({"pageName":"home"})
            $("#explore-tab-button")[0].click()
            $(currentTab())[0].click(); 
            getPersonalInfo ()
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
            console.log(response)
            selfData.userId = response.id;
            selfData.email = response.email;  
            selfData.name = response.name; 
            selfData.friends = response.friends;           
            friendDataEscaped = JSON.stringify(selfData);
            console.log(friendDataEscaped)
            var ajaxUrl = "http://gettimi.com/site/facebookLogin"                      
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                dataType: "jsonp",
                data: ({'selfData':friendDataEscaped}),
                success: function(results) {
                    console.log(results)
                    // localStorage 
                    console.log(JSON.stringify(results))
                    localStorage.usertoken = results["user_token"]
                    console.log(results["phone"].length)
                    if (!results["phone"].length) {
                        // not verified verified users
                        submitCalendar ()
                        myApp.closeModal(".popup-intro")   
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

                        //   phone verified users logged in
                        console.log("Phone verified users logged in")
                        //  recurring user
                        localStorage.checkedPhone = true; 
                        getGeolocation ()
                        mainView.router.loadPage({
                            "pageName":"home"
                        })          
                        myApp.closeModal(".popup-intro")   
                        // $(".statusbar-overlay").css("background", "#ec5298")
                        setTimeout(function () {
                            $("#explore-tab-button")[0].click()
                            $(currentTab())[0].click()
                        }, 400) 

                        updatePreferencePrompt ()
    

          

                        

                    }
                }, 
                error: function (results) {
                    console.log(results)
                    myApp.alert("no good")
                    

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
        setTimeout(function () {
            popupTutorial ()
        }, 200)           
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