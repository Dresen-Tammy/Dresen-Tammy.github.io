/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// get Lat and Long for US zipcode.
// Synchronous load XMLHTTPRequest
function getLatLong() {
    // get customer input and format it for url
    const zip = document.getElementById('zip').value;
    const address = zip + "+" + "US";
    // concat URL for request
    const url = "https://www.geocode.farm/v3/json/forward/?" + "addr=" + address;
    // create new XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // create new xmlhttprequest object, prepare and send request
    xhr.open("GET", url, false);
    xhr.send();
    // parse response, and get lat and long coordinates from it
    let response = JSON.parse(xhr.responseText);
    let lat = response.geocoding_results.RESULTS[0].COORDINATES.latitude;
    let long = response.geocoding_results.RESULTS[0].COORDINATES.longitude;
    // concat lat and long to work in sunset function, return
    const latLong = "lat=" + lat + "&lng=" + long;
    return latLong;
}

/* request sunset times for certain zip code. 
* Calls getLatLong() function to get coordinates for zip.
* Asynchronous load XMLHTTPRequest */
function sunset() {
    // get user input and check to make sure it isn't undefined
    const days = document.getElementById('day').value;
    const zip = document.getElementById('zip').value;
    if (days == undefined || zip == undefined) {
        alert("Please enter a valid date and zipcode.");
    } else {
        // call function to get lat and long coordinates from zipcode.
        const lonLat = getLatLong();
        // concat URL for request
        const url = "https://api.sunrise-sunset.org/json?" + lonLat + "&date=" + days;
        // create new xmlhttpRequest object
        let xhr = new XMLHttpRequest();
        /* onreadystatechange function for asynchronous load will run when  
         *response is complete 
         */
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // parse response and get sunrise and sunset times from it
                let response = JSON.parse(xhr.responseText);
                let sunrise = response.results.sunrise;
                let sunset = response.results.sunset;
                /* learned how to change from UTC to current user's browser time here: 
                 * https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time*/
                
                /* change utc time to local time. Use amPm function to convert
                 * from military time.
                 */
                sunrise = days + " " + sunrise + " UTC";
                sunrise = new Date(sunrise);
                sunrise = amPm(sunrise);
                sunset = days + " " + sunset + " UTC";
                sunset = new Date(sunset);
                sunset = amPm(sunset);
                // create message with sunrise and sunset times
                let message = "";
                message += "Sunrise:" + sunrise + "<br>"
                        + "Sunset: " + sunset;
                // display message in div
                document.getElementById("sunrise").innerHTML = message;
            }
        };
        /* prepare and send xmlhttpRequest. Once response is loaded, 
         * onreadystatechange function above will run.
         */
        xhr.open("GET", url, true);
        xhr.send();
    }
}
// change military time to normal time with AM or PM.
function amPm(date) {
    let hour = date.getHours();
    let amPm;
    if (hour < 12) {
        amPm = "AM";
    } else if (hour == 12) {
        amPm = "PM";
    } else if (hour < 24) {
        amPm = "PM";
        hour -= 12;
    } else {
        amPm = "AM";
        hour -= 12;
    }
    let minutes = date.getMinutes();
    const time = hour + ":" + minutes + " " + amPm;
    return time;
}