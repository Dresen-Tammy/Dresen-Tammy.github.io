/* 
 * Model Layer
 */
// onload function set up close popup event listeners
addEventListener('load', setup);

function setup() {
    //add event listener to close popup for zipcode.
    const popback = document.getElementById('popback');
    popback.addEventListener('click', closePlanPopup);
    const popback2 = document.getElementById('popback2');
    popback2.addEventListener('click', closeRoutePopUp);
}

    


// if validated info is invalid
function alertError(alert) {
    if (alert.classList.contains('alert')) {
        alert.innnerHTML = 'Make sure zipcode is valid';
        return;
    } else {
        alert.classList.add('alert');
        return;
    }
}

// gets zipcode list from localStorage and uses to construct select dropdown
function createZipSelect(parent) {
    if (document.getElementById('zipSelect')) {
    const child = document.getElementById('zipSelect');
        child.parentNode.removeChild(child);
        }
    let select = document.createElement('select');
    select.id = 'zipSelect';
    select.classList.add('zipcode');
    const op1 = document.createElement('option');
    op1.value = '';
    op1.innerHTML = '--';
    select.appendChild(op1);
    if (localStorage['zipList']) {
        const zipList = JSON.parse(localStorage.getItem('zipList'));
        let i;
        let op;
        for (i in zipList) {
            op = document.createElement('option');
            op.value = zipList[i].zip;
            op.innerHTML = zipList[i].city + " (" + zipList[i].zip + ")";
            select.appendChild(op);
        }

    }
    parent.appendChild(select);
}

function checkLocalStorage(zipcode) {
    let zipList = JSON.parse(localStorage.getItem('zipList'));
    let i;
    let zip; 
    let zipInfo;
        // check to see if zip is already in local storage
        for (i in zipList) { // loop through local storage
            zip = zipList[i].zip;
            if (zip == zipcode) {
                zipInfo = zipList[i];
                return zipInfo;
            } 
        }
        let zipInfo = newLocation(zipcode);
        return zipInfo;

}


function newLocation(zip) {
    // get zipcode and format it in url
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=&components=postal_code:"
        + zip + "&key=AIzaSyCClyBxAN4UiXaciq3REHpDt1uBNKO7qa8";
    // create new XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // prepare and send request
    xhr.open("GET", url, false);
    xhr.send();
    let response = JSON.parse(xhr.responseText);
    if (response.status == "ZERO_RESULTS") {
        return response.status;
    }
    const lat = response.results[0].geometry.location.lat;
    const lng = response.results[0].geometry.location.lng;
    const city = response.results[0].address_components[1].long_name;
    const state = response.results[0].address_components[2].short_name;
    const zipInfo = {'lat': lat, 'lng': lng, 'city': city, 'state': state, 'zip': zip};
    let zipList;
    if (localStorage['zipList']) {
        zipList = JSON.parse(localStorage.getItem('zipList'));
        zipList.push(zipInfo);
    } else {
        zipList = [zipInfo];
    }
    localStorage.setItem('zipList', JSON.stringify(zipList));
    return zipInfo;
}

function initMap(mylat = 43.8231, mylong = 111.7924) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: mylat, lng: mylong}
        
    });
    //var bikeLayer = new google.maps.BicyclingLayer();
    //bikeLayer.setMap(map);
}

function sunset(date, lat, lng) {

        const lonLat = "lat=" + lat + "&lng=" + lng;
        // concat URL for request
        const url = "https://api.sunrise-sunset.org/json?" + lonLat + "&date=" + date;
        // create new xmlhttpRequest object
        let xhr = new XMLHttpRequest();
        /* onreadystatechange function for asynchronous load will run when  
         *response is complete 
         */

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // parse response and get sunrise and sunset times from it
                let response = xhr.responseText;
                response = JSON.parse(response);
                let sunrise = response.results.sunrise;
                let sunset = response.results.sunset;
                let milSunrise;
                let milSunset;
                /* learned how to change from UTC to current user's browser time here: 
                 * https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time*/
                
                /* change utc time to local time. Use amPm function to convert
                 * from military time.
                 */
                sunrise = date + " " + sunrise + " UTC";
                sunrise = new Date(sunrise);
                milSunrise = milTime(sunrise);
                sunrise = amPm(sunrise);
                sunset = date + " " + sunset + " UTC";
                sunset = new Date(sunset);
                milSunset = milTime(sunset);
                sunset = amPm(sunset);
                // create message with sunrise and sunset times
                let sunInfo = [milSunrise, milSunset, sunrise, sunset];
                localStorage.setItem('sunInfo', JSON.stringify(sunInfo));
                document.getElementById('planSunrise').innerHTML += sunrise;
                document.getElementById('planSunset').innerHTML += sunset;

            }
        }
        
        function milTime(time) {
            let hour = time.getHours();
            let minute = minute.getMinutes();
            time = hour + ":" + minute;
            return time;
        }
        
        /* prepare and send xmlhttpRequest. Once response is loaded, 
         * onreadystatechange function above will run.
         */
        xhr.open("GET", url, true);
        xhr.send();
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
let zero = "";
        let minutes = date.getMinutes();
        if (minutes < 10) {
zero = "0";
        }
const time = hour + ":" + zero + minutes + " " + amPm;
        return time;
}

function closePlan() {

let plan = document.getElementById('plan');
        plan.classList.toggle('openPlan');
        let header = document.getElementById('homeHeader');
        header.classList.toggle('headerHide');
}