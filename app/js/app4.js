/* 
 * Controller
 */


// home page buttons

// plan button on home page
function openPlanPopup() {
    // create select list
    const parent = document.getElementById('zipParent2');
    const popcan = document.getElementById('popcan');
        createZipSelect(parent);
        // display popup

        popcan.classList.add('openPop');
        if (popcan.classList.contains('closePop')) {
            popcan.classList.remove('closePop');
        }
}
// close plan popup
function closePlanPopup() {
    const popcan = document.getElementById('popcan');
    const advice = document.getElementById('advice');
    const advice2 = document.getElementById('advice2');
        popcan.classList.add('closePop');
        if (advice.classList.contains('show')) {
            advice.classList.remove('show');
        }
        if (advice2.classList.contains('show')) {
            advice2.classList.remove('show');
        }
        if (popcan.classList.contains('openPop')) {
            popcan.classList.remove('openPop');
        }
}

// route button on home page
function openRoutePopUp() {
    // get list of zips from localStorage and create select list for zipPopUp
    const parent = document.getElementById('zipParent');
    const popcan2 = document.getElementById('popcan2');
        createZipSelect(parent);
        // open zip popup

        popcan2.classList.add('openPop');
        if (popcan2.classList.contains('closePop')) {
            popcan2.classList.remove('closePop');
        }

}
// closes route popup 
function closeRoutePopUp() {
    // close zip popup
    const popcan = document.getElementById('popcan2');
    const alert = document.getElementById('zipAlert');
        popcan.classList.add('closePop');
        if (popcan2.classList.contains('openPop')) {
            popcan2.classList.remove('openPop');
        }
        if (alert.classList.contains('alert')) {
            alert.classList.remove('alert');
        }
}
// add bike button on home page
// TODO: create function
function openBikePopUp() {
    
}
function closeBikePopUp() {
    // TODO: create function
}





// plan popup functions
// 

function openSection(e) {
    var eventid = e.srcElement.parentNode;
    if (eventid.classList.contains('open')) {
    eventid.classList.toggle('expand');
    }
};

// opens zip popup from plan popup
function openPlanZipPopup() {
    const popup = document.getElementById('popup3');
        popup.classList.remove('shrink');
}
function closePlanZipPopup() {
    const popup = document.getElementById('popup3');
    const alert = document.getElementById('zipAlert3');
        popup.classList.add('shrink');
        if (alert.classList.contains('alert')) {
            alert.classList.remove('alert');
        }
}

// opens/closes advice on plan popup
function advice2() {
    const advice = document.getElementById('advice2');
        advice.classList.toggle('show');
}
function advice() {
    const advice = document.getElementById('advice');
        advice.classList.toggle('show');
}
addEventListener('load')

// functional buttons
// when sunrise button is clicked fillSunrise()
// TODO: make function correctly
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


// enter on plan popup
function ClosePlanPopupToPlan() {
    // TODO: make function
}

// enter on zip popup on plan popup

function addNewZipToPlan() { 
    //// validate entry, check localStorage, getNewZip, Save to localStorage, 
    ////closePopup, Select in plan popup 
    
// get user entered zipcode info
    const zip = document.getElementById('addZip').value;
    const alert = document.getElementById('zipAlert3');
    let zipInfo;
    if (zip == "" || zip == undefined) {
        alertError(alert);
        return;
    } else {
        zipInfo = addZip(zip);
        if (zipInfo == "" || zipInfo == "ZERO_RESULTS" || zipInfo == undefined) {
            alertError(alert);
            return;  
        } else {
            
            createZipSelect(parent);
            closePlanZipPopup();
            return;
        }
        
    }
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
function accordianLast() {
    
}



// functions on route popup
// close route popup
function closeRoutePopupToRoute() {
    // get inputs for zipcode from user
    const zipSelect = document.getElementById('zipSelect').value;
    let addZip = document.getElementById('newZip').value;
    const alert = document.getElementById('zipAlert');
    let zipInfo = "";
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
        openRoute();
    }
}
// open route page
function openRoute() {
    let plan = document.getElementById('route');
        plan.classList.toggle('openPlan');
}

// close route page
function closeRoute() {
    let plan = document.getElementById('route');
        plan.classList.toggle('openPlan');
        let header = document.getElementById('homeHeader');
        header.classList.toggle('headerHide');
}

