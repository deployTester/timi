// var offlineApp = new Framework7({
//   modalTitle: 'Timi'
// })
// function popupNetworkButton () {
//   offlineApp.confirm("Please get online to use Timi", function (){
//     if (navigator.onLine) {
//       location.reload()
//     } else {
//       popupNetworkButton ()
//     }
//   });            

// }
// setTimeout(function () {
//   var online = navigator.onLine;
//   if (online) {
//     console.log("is online")
//   }
//   else {
//     popupNetworkButton()
//     // offlineApp.popup(".popup-nothing")
//   }     
// }, 1000)



document.addEventListener('deviceready', onLocalDeviceReady);
function onLocalDeviceReady()
{
    var success = function(status) {
    	// alert("good")
        console.log('Message: ' + status);
    }

    var error = function(status) {
    	// alert("error")
        console.log('Error: ' + status);
    }

    window.cache.clear( success, error );
}          
var hasLoadedGoogleMapScript = false; 
var hasInitApp = false
function mapLoaded () {
    console.log(0)
    hasLoadedGoogleMapScript = true
    if (hasInitApp) {
        console.log(1)
        ondeviceready()
    }
}   
