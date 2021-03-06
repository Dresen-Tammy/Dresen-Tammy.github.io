/* 
 * Race the Sun Cycling App
 */

/*********************************
 * Setup on load
 ********************************/

addEventListener('load', setup);


function setup() {
    //add event listener to close popup for zipcode.
    const popback = document.getElementById('popback');
    popback.addEventListener('click', closePlanPopup);
    const popback2 = document.getElementById('popback2');
    popback2.addEventListener('click', closeRoutePopUp);
}
/*********************************
 * get routes
 ********************************/
/*When get routes is clicked,
 * Popup opens to ask for zipcode.
 * List of previous zipcodes and option to add zipcode.
 * If add zipcode, call get function to get lat/long.
 * Store lat/long/city/state/zip in local storage. */



function openRoutePopUp() {
    // get list of zips from localStorage and create select list for zipPopUp
    document.getElementById('newZip').value = "";
    const parent = document.getElementById('zipParent');
    createZipSelect(parent);
    document.getElementById('zipAlert').innerHTML = "";
    // open zip popup
    const popcan2 = document.getElementById('popcan2');
    popcan2.classList.add('openPop');
    if (popcan2.classList.contains('closePop')) {
        popcan2.classList.remove('closePop');
    }

}



// adds zipcode select list to either popup
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
function alertError2(alert, message) {
    alert.innerHTML = message;
    return;
    
}
function addNewZip() {
// get user entered zipcode info
    const zip = document.getElementById('addZip').value;
    const alert = document.getElementById('zipAlert3'); 
    let zipInfo;
    let message;
    document.getElementById('zipAlert4').innerHTML = "";
    document.getElementById('zipAlert5').innerHTML = "";
    if (zip == "" || zip == undefined) {
        message = "Enter valid zipcode";
        alertError2(alert, message);
    } else {
        zipInfo = addZip(zip);
        if (zipInfo == "" || zipInfo == "ZERO_RESULTS" || zipInfo == undefined) {
            message = "Make sure zipcode is valid";
            alertError2(alert, message);
            return;
        } else {
            const parent = document.getElementById('zipParent2');
            createZipSelect(parent);
            document.getElementById('zipSelect').value = zipInfo.zip;
            document.getElementById('popup3').classList.add('shrink');
            alert.innerHTML = "";
        
        }
    }
}

function closeRoutePopupToRoute() {
    // get inputs for zipcode from user
    const zipSelect = document.getElementById('zipSelect').value;
    let Zip = document.getElementById('newZip').value;
    const alert = document.getElementById('zipAlert');
    let message;
    let zipInfo;
    if (zipSelect == '' && Zip == '') {
        message = 'Enter valid ZIP Code';
        alertError2(alert, message);
        return;
    } else if (Zip != "") {
        zipInfo = addZip(Zip);
        if (zipInfo == "ZERO_RESULTS" || zipInfo == '') {
            message = 'Make sure ZIP Code is valid';
            alertError2(alert, message);
            return
        }           
    } else {
        zipInfo = checkLocalStorage(zipSelect);
    }
    let lat = zipInfo.lat
    let lng = zipInfo.lng;
    let city = zipInfo.city;
    document.getElementById('location').innerHTML = city;
    //initMap();
    addMap(lat, lng);
    // close zip popup
    closeRoutePopUp();
    // display route info
    openRoute();
    
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
        zipInfo = newLocation(zipcode);
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
function closeZipToMap() {
    // get user entered zipcode info
    let zipInfo = getZip();
    if (zipInfo == "" || zipInfo == "ZERO_RESULTS" || zipInfo == undefined) {
        return;
    }
    // get map
    let lat = zipInfo.lat;
    let lng = zipInfo.lng;
    let city = zipInfo.city;
    document.getElementById('location').innerHTML = city;
    initMap(lat, lng);
    // close zip popup
    closeRoutePopUp();
    // display route info
    displayRoute();
}

function addMap(lat = 43.8231, lng = -111.29) {
let url = "https://www.google.com/maps/embed/v1/view?key=AIzaSyC1_5qoxKTYV0kfCSCm6q-UV8dGp4aCK7w&center="  
        + lat + "," + lng + "&zoom=14&maptype=roadmap";
document.getElementById('map').src = url;
}
/*var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        
        center: {lat: 43.8231, lng: 43.8231},
        zoom: 14
        
    });
    //var bikeLayer = new google.maps.BicyclingLayer();
    //bikeLayer.setMap(map);
}*/

function accordianNext() {
    const date = document.getElementById('dateInput').value;
    const zip = document.getElementById('zipSelect').value;
    const datealert = document.getElementById('zipAlert4');
    let message;
    
    const zipalert = document.getElementById('zipAlert5');
    if (date == "" || date == undefined) {
        message = "Please enter a valid date";
        alertError2(datealert, message);
        return;  
    }
    if (zip == '') {
        message = "Please enter a valid zipcode";
        alertError2(zipalert, message);
        
        return;
    }
    datealert.innerHTML = "";
    zipalert.innerHTML = "";
    const zipInfo = checkLocalStorage(zip);
    const lat = zipInfo.lat;
    const lng = zipInfo.lng;
    sunset(date,lat,lng);
    const back = document.getElementById('back');
    back.classList.toggle('hide');
    back.addEventListener('click', accordianBack);
    const next = document.getElementById('next');
    next.classList.toggle('hide');
    next.removeEventListener('click', accordianNext);
    const sections = document.getElementsByClassName('open');
    
    
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.toggle('expand');
    }
}
function accordianBack() {
    const back = document.getElementById('back');
    back.classList.toggle('hide');
    back.removeEventListener('click', accordianBack);
    const next = document.getElementById('next');
    next.classList.toggle('hide');
    next.addEventListener('click', accordianNext);
    const sections = document.getElementsByClassName('open');
    
    
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.toggle('expand');
    }
}

function fillSunrise() {
    if (localStorage['sunInfo']) {
        let sunInfo = JSON.parse(localStorage.getItem('sunInfo'));
        let sunrise = sunInfo[0];
        document.getElementById('start').value = sunrise;
    }
} 
function fillSunset() {
    if (localStorage['sunInfo']) {
        let sunInfo = JSON.parse(localStorage.getItem('sunInfo'));
        let sunset = sunInfo[1];
        document.getElementById('end').value = sunset;
    } 
}
// closes zip popup open.
function closeRoutePopUp() {
    // close zip popup
    const popcan = document.getElementById('popcan2');
    popcan.classList.add('closePop');
    if (popcan2.classList.contains('openPop')) {
        popcan2.classList.remove('openPop');
    }
}
function openRoute() {
    if (!document.getElementById('footer').classList.contains('footerZ')) {
        document.getElementById('footer').classList.add('footerZ');
    }
    let plan = document.getElementById('route');
        if (!plan.classList.contains('openPlan')) {
           plan.classList.add('openPlan'); 
        }    
    
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




function closeRoute() {

let plan = document.getElementById('route');
    if (document.getElementById('footer').classList.contains('footerZ')) {
        document.getElementById('footer').classList.remove('footerZ');
    }    
        plan.classList.toggle('openPlan');
        let header = document.getElementById('homeHeader');
        header.classList.toggle('headerHide');
}

/*********************************
 * Pop up before plan
 ********************************/


// get today's date and change it to correct format for html5 date.
function getDate() {
let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        const yyyy = today.getFullYear();
        if (dd < 10) {
dd = '0' + dd;
        }
if (mm < 10) {
mm = '0' + mm;
        }
today = yyyy + '-' + mm + '-' + dd;
        return today;
}

// actually opens the popup
function openPlanPopup() {
   // create select list
   const parent = document.getElementById('zipParent2');
    createZipSelect(parent);
    const next = document.getElementById('next');
    next.addEventListener('click', accordianNext);
    // insert today's date into dateInput
    const today = getDate();
    const rideDate = document.getElementById('dateInput');
    if (rideDate.value == "" || rideDate < today) {
        rideDate.value = today;
    }
// display popup
const popcan = document.getElementById('popcan');
        popcan.classList.add('openPop');
        if (popcan.classList.contains('closePop')) {
popcan.classList.remove('closePop');
        }
}


function openPlanZipPopup() {
    document.getElementById('zipAlert3').innerHTML = "";
    const popup = document.getElementById('popup3');
    popup.classList.remove('shrink');
    
}
function closePlanZipPopup() {
    const popup = document.getElementById('popup3');
    popup.classList.add('shrink');
}
function addNewZipToPlan() { 
    //// validate entry, check localStorage, getNewZip, Save to localStorage, 
    ////closePopup, Select in plan popup 
    
// get user entered zipcode info
    const zip = document.getElementById('addZip').value;
    const alert = document.getElementById('zipAlert3');
    let zipInfo;
    if (zip == "" || zip == undefined) {
        alert(alert);
        return
    } else {
        zipInfo = addZip(zip);
        if (zipInfo == "" || zipInfo == "ZERO_RESULTS" || zipInfo == undefined) {
            alert(alert);
            return  
        } else {
            const parent = document.getElementById('zipParent2');
            createZipSelect(parent);
            closePlanZipPopup();
            return;
        }
        
    }
}

function addNewZip() {
// get user entered zipcode info
    const zip = document.getElementById('addZip').value;
    const alert = document.getElementById('zipAlert3'); 
    let zipInfo;
    let message;
    document.getElementById('zipAlert4').innerHTML = "";
    document.getElementById('zipAlert5').innerHTML = "";
    if (zip == "" || zip == undefined) {
        message = "Enter valid zipcode";
        alertError2(alert, message);
    } else {
        zipInfo = addZip(zip);
        if (zipInfo == "" || zipInfo == "ZERO_RESULTS" || zipInfo == undefined) {
            message = "Make sure zipcode is valid";
            alertError2(alert, message);
            return;
        } else {
            const parent = document.getElementById('zipParent2');
            createZipSelect(parent);
            document.getElementById('zipSelect').value = zipInfo.zip;
            document.getElementById('popup3').classList.add('shrink');
            alert.innerHTML = "";
        
        }
    }
}

function addZip(addZip) {
    if (localStorage['zipList']) { // 2a. if local storage has zipList
            const zipList = JSON.parse(localStorage.getItem('zipList'));
            let i;
            // check to see if zip is already in local storage
            for (i in zipList) { // loop through local storage
                let zip = zipList[i].zip;
                
                if (zip == addZip) {// 2a.1 If match in local storage
                    zipInfo = zipList[i];
                    return zipInfo;
                }
            }
            // if no match found in forloop, get new zip info
            zipInfo = newLocation(addZip);
            if (zipInfo == "ZERO_RESULTS" || zipInfo == '') {//2a.2 if error with get zip ir if zip invalid 
                document.getElementById('zipAlert').classList.toggle('alert');
                return zipInfo;
            } else {
                // return new zip info when no error occured.
                zipList.push(zipInfo);
                localStorage.setItem(zipList, JSON.stringify(zipList));
                return zipInfo;
            }
        
        
        } else {// 2b. if localStorage doesn't have ziplist 
        let zipInfo = newLocation(addZip);
        zipList = {lat: zipInfo.lat, lng: zipInfo.lng, city: zipInfo.city, state: zipInfo.state, zip: zipInfo.zip};
        localStorage.setItem(zipList, zipList);        
        return zipInfo;
        }
}

function checkZipDate() {
const zip = document.getElementById('zipcode').value;
        const rideDate = document.getElementById('dateInput').value;
        if (rideDate == "" || zip == "") {
if (document.getElementById('sunAlert')) {
document.getElementById('sunAlert').innerHTML = "Please enter valid zipcode and date";
        } else {
let newPar = document.createElement('p');
        const textnode = document.createTextNode("Valid zipcode and Date are required");
        newPar.appendChild(textnode);
        newPar.classList.add('alert');
        newPar.id = 'sunAlert';
        document.getElementById('logistics').appendChild(newPar);
        return false;
        }
} else {
if (document.getElementById('sunAlert')) {
const sunAlert = document.getElementById('sunAlert');
        sunAlert.parentNode.removeChild(sunAlert);
        }
return true;
        }
}
// when Plan a Ride button is clicked, 
// validates values and decides which function to perform
function planRide () {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const miles = document.getElementById('miles').value;
    const alert = document.getElementById('timeAlert');
    alert.innerHTML = "";
    let choice;
    let message;
    if ((start == "" && end == "" && miles == "") 
            || (start == "" && end == "") || (start == "" && miles == "")
            ||(end == "" && miles == "")) {
        message = "Fill in 2 text fields. Click question mark for help.";
            alertError2(alert, message);
            return;
    } else if (miles === '0' || miles < 0) {
        message = 'Distance must be greater than 1.';
        alertError2(alert, message);
        return;
    } else if (start == "") {
        choice = start;
        calcRide(choice)
    } else if (end == "") {
        choice = end;
        calcRide(choice)
    } else if (start > end){
        message = "End time must be after Start time.";
        alertError2(alert, message);
        return
    } else if (miles == "") {
        choice = "miles";
        calcRide(choice)
    } else { 
        message = "Leave 1 field blank. Click question mark for help.";
            alertError2(alert, message);
            return;
    }
}

function calcRide(choice) {
    const date = document.getElementById('dateInput').value;
    const zip = document.getElementById('zipSelect').value;
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let distance = document.getElementById('miles').value;
    const speed = document.getElementById('average').value;
    // get city info from localStorage
    const zipInfo = checkLocalStorage(zip);
    const city = zipInfo.city;
    const sunInfo = JSON.parse(localStorage.getItem("sunInfo"));
    const sunrise = sunInfo[3];
    const sunset = sunInfo[4];
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    // calculate based on choice
    if (choice == "start") {
        start = calcStart(end, distance, speed);
    } else if (choice == "end") {
        end = calcEnd(start, distance, speed);
    } else {
        distance = calcDistance(start, end, speed);
    }
    // put all info into plan page
    document.getElementById('planDate').innerHTML = date;
    document.getElementById('planCity').innerHTML = city;
    document.getElementById('planStart').innerHTML = start;
    document.getElementById('planEnd').innerHTML = end;
    document.getElementById('planDistance').innerHTML = distance;
    document.getElementById('planSpeed').innerHTML = speed;
    document.getElementById('planSunrise').innerHTML = sunrise;
    document.getElementById('planSunset').innerHTML = sunset;
    // reset planpopup to original settings, 
    // close popup
    closePlanPopup();
    back.classList.remove('expand');
    back.classList.add('hide');
    back.removeEventListener('click', accordianBack);
    next.classList.add('expand');
    next.classList.remove('hide');
    // open plan page
    openPlan();
}
function calcEnd(start, distance, speed) {
    return "end";
}
function calcStart(end, distance, speed) {
    return "start";
}
function calcDistance(start, end, speed) {
    return "distance";
}

function openPlan() {
    let plan = document.getElementById('plan');
    if (!plan.classList.contains('openPlan'))
    plan.classList.add('openPlan');
}
function closePlan() {
    let plan = document.getElementById('plan');
    plan.classList.toggle('openPlan');
}
     

function closePopToPlan() {
// Initialize variables
let zipInput = "";
        let dateInput = "";
        let startInput = "";
        let endInput = "";
        let distanceInput = "";
        let speedInput = "";
        // get values by id from popup and validate
        //validate zipcode
        zip = document.getElementById('zipcode');
        if (!/(^\d{5}$)/.test(zip.value)) {
zip.classList.add('warning');
        } else {
// remove warning border around zipcode
if (zip.classList.contains('warning')) {
zip.classList.remove('warning');
        zipInput = zip;
        }
// since only valid date is possible, 
dateInput = document.getElementById('dateInput');
        // sinc
        startInput = document.getElementById('start');
        endInput = document.getElementById('end');
        distanceInput = document.getElementById('miles');
        speedInput = document.getElementById('average');
        // store values in assoc array
        let rideStats = {zipcode: zipInput, rideDate: dateInput, startTime: startInput, endTime: endInput, distance: distanceInput, speed: speedInput};
        /*const zip = document.getElementById('zipcode');
         const average = document.getElementById('average');
         const date = document.getElementById('date');
         // if zipcode has a value
         if (!/(^\d{5}$)/.test(zip.value)) {
         zip.classList.add('warning');
         } else {
         
         // remove warning border around zipcode
         if(zip.classList.contains('warning')) {
         zip.classList.remove('warning');
         }
         // save zipcode and speed to local storage
         localStorage.setItem('zipcode', zip.value);
         localStorage.setItem('speed', average.value);
         localStorage.setItem('rideDate', dateInput.value);
         // close the popup 
         closePopup();
         
         const button = document.getElementById('zipbutton');
         button.removeEventListener('click', closePopToPlan); 
         openPlan();*/

        }
}
// actually closes the popup
function closePlanPopup() {
const popcan = document.getElementById('popcan');
        popcan.classList.add('closePop');
        const advice = document.getElementById('advice2');
        if (advice.classList.contains('show')) {
advice.classList.remove('show');
        }
if (popcan.classList.contains('openPop')) {
popcan.classList.remove('openPop');
        }
}
// toggle average speed advice
function advice() {
const advice = document.getElementById('advice');
        advice.classList.toggle('show');
}
function advice2() {
const advice = document.getElementById('advice2');
        advice.classList.toggle('show');
}

/*********************************
 * Planning section
 ********************************/



/* request sunset times for certain zip code. 
 * Calls getLatLong() function to get coordinates for zip.
 * Asynchronous load XMLHTTPRequest */

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
                document.getElementById('planSunrise').innerHTML = "Sunrise:" + sunrise;
                document.getElementById('planSunset').innerHTML = "Sunset:" + sunset;

            }
        }
        
        
        
        /* prepare and send xmlhttpRequest. Once response is loaded, 
         * onreadystatechange function above will run.
         */
        xhr.open("GET", url, true);
        xhr.send();
    }

function milTime(time) {
            let hour = time.getHours();
            if (hour < 10) {
                hour = "0" + hour;
            }
            let minute = time.getMinutes();
            if (minute < 10) {
                minute = "0" + minute;
            }
            time = hour + ":" + minute;
            return time;
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