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
    const parent = document.getElementById('zipParent');
    createZipSelect(parent);
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

function closeRoutePopupToRoute() {
    // get inputs for zipcode from user
    const zipSelect = document.getElementById('zipSelect').value;
    let addZip = document.getElementById('newZip').value;
    const alert = document.getElementById('zipAlert');
    let zipInfo;
    if (zipSelect == '' && addZip == '') {
        alertError(alert);
        return;
    } else if (addZip != "") {
        zipInfo = checkLocalStorage(addZip);
        
    } else {
        zipInfo = newLocation(zipSelect);
    }
    if (zipInfo == "ZERO_RESULTS" || zipInfo == '') {
        alertError(alert);
        return
    } else {
        let lat = zipInfo.lat
        let lng = zipInfo.lng;
        let city = zipInfo.city;
        document.getElementById('location').innerHTML = city;
        initMap(lat, lng);
        // close zip popup
        closeRoutePopUp();
        // display route info
        displayRoute();
    }
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

function initMap(mylat = 43.8231, mylong = 111.7924) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: mylat, lng: mylong}
        
    });
    //var bikeLayer = new google.maps.BicyclingLayer();
    //bikeLayer.setMap(map);
}

function accordianNext() {
    const date = document.getElementById('dateInput').value;
    const zip = document.getElementById('zipSelect').value;
    const datealert = document.getElementById('zipAlert4');
    const zipalert = document.getElementById('zipAlert5');
    if (date == "" || date == undefined) {
        alertError(datealert);
        return;  
    }
    if (zip == '') {
        alertError(zipalert);
        return;
    }
    const zipInfo = checkLocalStorage(zip);
    const lat = zipInfo.lat;
    const lng = zipInfo.lng;
    sunset(date,lat,lng);
    document.getElementById('back').classList.toggle('hide');
    document.getElementById('next').classList.toggle('hide');
    const sections = document.getElementsByClassName('open');
    
    
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.toggle('expand');
    }
}
function accordianBack() {
    document.getElementById('back').classList.toggle('hide');
    document.getElementById('next').classList.toggle('hide');
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
    let plan = document.getElementById('route');
        plan.classList.toggle('openPlan');
}

// get zipcode entered by user on zip popup
/*function getZip() { 
    // get inputs for zipcode from user
    const zipSelect = document.getElementById('zipSelect').value;
    let addZip = document.getElementById('newZip').value;
    let zipInfo = "";
    
    if (zipSelect == '' && addZip == '') {//1. if inputs not filled in.
        // if both inputs blank, add alert, return to zip popup.
        document.getElementById('zipAlert').classList.toggle('alert');
        return;
    } else if (addZip != "") {// 2. if addZip filled in
        
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
                return zipInfo;
            }
        
        
        } else {// 2b. if localStorage doesn't have ziplist 
        let zipInfo = newLocation(addZip);
        return zipInfo;
        }

    // if zipcode chosen from dropdown list, get zipList from local storage and return
    } else { //3.  zip from select list chosen
        const zipList = JSON.parse(localStorage.getItem('zipList'));
        let i;
        let zipInfo;;
        for (i in zipList) {
            let zipcode = zipList[i].zip;
            if (zipcode == zipSelect) {
                zipInfo = {lat: zipList[i].lat, lng: zipList[i].lng, city: zipList[i].city, state: zipList[i].state, zip: zipList[i].zip};
                return zipInfo;
            }
        }
    }
}*/


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
        plan.classList.toggle('openPlan');
        let header = document.getElementById('homeHeader');
        header.classList.toggle('headerHide');
}

/*********************************
 * Pop up before plan
 ********************************/
/* When app is opened, add event listener to popback click, closePopUp
 * When plan a ride is clicked, checkLocalStorage()
 * first check to see if data is in localStorage
 *     If yes, info from local storage into fields.
 *     If date is past, enter today's date
 *   If no, go to popup
 * Open popup, openPopUp() 
 *   Add event listener for button close.
 * Click sunrise or sunset button
 *   Check to see if valid date and zipcode are entered.
 *     If no, add error warning to zip and date.
 *     If yes, check local storage for zip information. 
 *       if there, bypass zip lookup.
 *       if not, lookup zip info
 *    calculate sunrise or sunset and add to start or end time field
 * Click button on popup closePopToPlan()
 *   Validate input
 *     if valid, open plan page
 *     if invalid highlight invalid value  
 *
 */



// when plan a ride is clicked, checks local storage for valid data
/*function checkLocalStorage() {
 /* check rideStats in localStorage 
 * if present, get rideStats from localStorage
 * insert rideStats into popup.
 * Check date. If dat is in past, use today as rideDate
 * 
 * 
 */
// enter today's date into popup
// 
// check rideStats in localStorage
/*const dateInput = document.getElementById('dateInput');
 const today = new Date();
 const thisDay = getDate(today);
 dateInput.value = thisDay;
 if (localStorage.getItem('rideStats')) {
 // get rideStats from localStorage and parse
 const rideStats = JSON.parse(localStorage.getItem('rideStats')); 
 // save rideStats to variables
 const zipcode = rideStats[zipcode];
 const rideDate = rideStats[rideDate];
 const startTime = rideStats[startTime];
 const endTime = rideStats[endTime];
 const distance = rideStats[distance];
 const speed = rideStats[speed];
 // get elements by id
 const zipInput = document.getElementById('zipcode');
 const startInput = document.getElementById('startTime');
 const endInput = document.getElementById('endTime');
 const distanceInput = document.getElementById('miles');
 const speedInput = document.getElementById('average');
 // enter zip value into popup
 zipInput.value = parseInt(zipcode);
 // enter date value into popup, check to see if past first
 const rideDay = new Date(rideDate).getTime();
 
 let todayNum = today.getTime();
 if (rideDay >= today) {
 dateInput.value = rideDate;
 } else {
 dateInput.value = thisDay;
 }
 // enter start time into popup
 startInput.value = startTime;
 // enter end time into popup
 endInput.value = endTime;
 // enter distance into popup
 distanceInput.value = distance;
 speedInput.value = speed;        
 } else {
 
 }
 // add event listener to button on popup
 const button = document.getElementById('zipbutton');
 button.addEventListener('click', closePopToPlan);
 // open the popup
 openPopup(); 
 }*/
// check to see if items are stored in local storage
// if local storage has zip stored, add value to input.
/*let zipInput;
 let rideDayInput;
 let averageInput;
 if (localStorage.getItem('zipcode')) {
 const zip = localStorage.getItem('zipcode');
 var re = new RegExp("^([0-9]{5,})$");
 if (re.test(zip)) {
 zipInput = document.getElementById('zipcode');
 zipInput.value = parseInt(zip) ;
 }
 }
 // if localStorage has date stored, check if current date.
 // if yes, add value to input.
 rideDayInput = document.getElementById('dateInput');
 if (localStorage.getItem('rideDate')) {
 let rideDate = localStorage.getItem('rideDate');
 const rideDay = new Date(rideDate).getTime();
 let today = new Date();
 let todayNum = today.getTime();
 if (rideDay >= today) {
 
 rideDayInput.value = rideDate;
 } else {
 today = getDate(today);
 rideDayInput.value = today;
 }
 }
 
 // if localStorage has avg stored, add value to input.
 averageInput = document.getElementById('average');
 if (localStorage.getItem('average').value > 0) {
 const average = localStorage.getItem('average').value;
 
 averageInput.value = average;
 } 
 // add event listener to button on popup
 const button = document.getElementById('zipbutton');
 button.addEventListener('click', closePopToPlan);
 // open the popup
 openPopup(); 
 }
 */

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
// display popup
const popcan = document.getElementById('popcan');
        popcan.classList.add('openPop');
        if (popcan.classList.contains('closePop')) {
popcan.classList.remove('closePop');
        }
}


function openPlanZipPopup() {
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
    if (zip == "" || zip == undefined) {
        if (alert.classList.contains('alert')) {
            alert.innnerHTML = 'Make sure zipcode is valid';
            return;
        } else {
            alert.classList.add('alert');
            return;
        }
    } else {
        zipInfo = addZip(zip);
        if (zipInfo == "" || zipInfo == "ZERO_RESULTS" || zipInfo == undefined) {
            if (alert.classList.contains('alert')) {
                alert.innnerHTML = 'Make sure zipcode is valid';
                return;
            } else {
                alert.classList.add('alert');
                return;
            }
        } else {
            const parent = document.getElementById('zipParent2');
            createZipSelect(parent);
            document.getElementById('zipSelect').value = zipInfo.zip;
            document.getElementById('popup3').classList.add('shrink');
            if (alert.classList.contains('alert')) {
                alert.classList.remove('alert');
                return;
            }
        
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
    } else if (miles === '0' || miles < 0) {
        message = 'Distance must be greater than 1.';
        alertError2(alert, message);
    } else if (start == "") {
        choice = start;
        calcRide(choice)
    } else if (end == "") {
        choice = end;
        calcRide(choice)
    } else if (start > end){
        message = "End time must be after Start time.";
        alertError2(alert, message);
    } else if (miles == "") {
        choice = "miles";
        calcRide(choice)
    } else { 
        message = "Leave 1 field blank. Click question mark for help.";
            alertError2(alert, message);
    }
}

function calcRide(choice) {
    const date = document.getElementById('dateInput').value;
    const zip = document.getElementById('zipSelect').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const distance = document.getElementById('miles').value;
    const speed = document.getElementById('average').value;
    // get city info from localStorage
    const zipInfo = checkLocalStorage(zip);
    const city = zipInfo.city;
    const sunInfo = JSON.parse(localStorage.getItem("sunInfo"));
    const sunrise = sunInfo[3];
    const sunset = sunInfo[4];
    // calculate based on choice
    if (choice == "start") {
        start = end - (distance/speed)
    } else if (choice == "end") {
        end = start + (distance/speed)
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
    openPlan();
}

function calcStartTime(end, distance, speed) {
    
}
function calcEndTime(start, distance, speed) {
    const end = start + (distance/speed)
}
function calcDistance(start, end, speed) {
    
}
function openPlan() {
    
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
        const advice = document.getElementById('advice');
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