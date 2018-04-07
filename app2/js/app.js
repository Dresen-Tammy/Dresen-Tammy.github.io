/*
 * Race the Sun Cycling App
 */

/*********************************
 * Setup on load
 ********************************/

addEventListener('load', setup);

function setup() {
    //When the app loads, it shows splash screen, then buttons slide in.

    document.getElementById('b1').classList.add('slide');
    document.getElementById('b2').classList.add('slide');
    document.getElementById('b3').classList.add('slide');
    document.removeEventListener('load', setup);

}
/* When app loads, these are the important classes -- alert     -- accordianNext   --openPlanPage
 * Home Page           --openPlanPopUp
 * b1 button b1 slide  -- b1Grow
 *   b1H2              -- headingTop
 * b2 button b2 slide  -- b2Shrink
 *   b2H2
 * b3 button b3 slide  -- b3Shrink
 *   b3H3
 *
 * Plan Popup          -- openPop
 * popup popup
 *   back back open hide                                           hide
 *   next next open expand                                         expand
 * popup3 popup3 shrink
 *
 * timeAlert                                       addedInnerHTML
 * advice2                                                            show
 *
 * plan                                                                            openPlan
 *
 **/

/*********************************
 * plan
 ********************************/


// When Plan Your Ride button is clicked, slides 2 buttons down and opens popup
function openPlanPopup() {
    // get elements for select list
    let parent = document.getElementById('zipParent2');
    // get elements for opening popup
    const popup = document.getElementById('popup');
    const next = document.getElementById('next');
    // get elements for moving home buttons and title
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b1H2 = document.getElementById('b1H2');
    // get elements for autofill today's date
    const rideDate = document.getElementById('dateInput');
    const today = getDate(); // function in model
    // creates select list for plan popup
    createZipSelect(parent); // function in model
    // insert today's date into dateInput
    if (rideDate.value == "" || rideDate < today) {
        rideDate.value = today;
    }
    // move home buttons and title
    b1.classList.add("b1Grow");
    b2.classList.add("b2Shrink");
    b3.classList.add('b3Shrink');
    b1H2.classList.add('headingTop');

    // display popup
    popup.classList.add('openPop');
    if (popup.classList.contains('closePop')) {
        popup.classList.remove('closePop');
    }
}

// when plan popup is open and Add New Zip is clicked
function openPlanZipPopup() {
    document.getElementById('zipAlert3').innerHTML = "";
    const popup = document.getElementById('popup3');
    popup.classList.remove('shrink');

}
// closes add new zip popup back to plan popup
function closePlanZipPopup() {
    const popup = document.getElementById('popup3');
    popup.classList.add('shrink');
}

// when Plan a Ride button is clicked, from plan popup
// validates values and decides which function to perform
function planRide() {
    // get inputs from user
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const miles = document.getElementById('miles').value;
    const alert = document.getElementById('timeAlert');
    alert.innerHTML = "";
    let choice;
    let message;
    // validate inputs. If invalid, return to plan popup. If valid, calls calcRide function
    if ((start == "" && end == "" && miles == "") ||
        (start == "" && end == "") || (start == "" && miles == "") ||
        (end == "" && miles == "")) {
        message = "Fill in 2 text fields. Click ? for help.";
        alertError2(alert, message);
        return;
    } else if (miles === '0' || miles < 0) {
        message = 'Distance must be greater than 1.';
        alertError2(alert, message);
        return;
    } else if (start == "") {
        choice = "start";
        calcRide(choice); // function in model section
    } else if (end == "") {
        choice = "end";
        calcRide(choice); // function in model section
    } else if (start > end) {
        message = "End time must be after Start time.";
        alertError2(alert, message); // function in model section
        return
    } else if (miles == "") {
        choice = "miles";
        calcRide(choice); // function in model section
    } else {
        message = "Leave 1 field blank. Click question mark for help.";
        alertError2(alert, message); // function in model section
        return;
    }
}

// shows advice slider on plan popup
function advice2() {
    const advice = document.getElementById('advice2');
    advice.classList.toggle('show');
}
// advances to next page of popup on plan popup
function accordianNext() {
    // get elements by id
    const date = document.getElementById('dateInput').value;
    const zip = document.getElementById('zipSelect').value;
    const datealert = document.getElementById('zipAlert4');
    let message;
    // validate zip and date info
    const zipalert = document.getElementById('zipAlert5');
    if (date == "" || date == undefined) {
        message = "Please enter a valid date";
        alertError2(datealert, message); // function in model section
        return;
    }
    if (zip == '') {
        message = "Please enter a valid zipcode";
        alertError2(zipalert, message); // function in model section

        return;
    }
    // reset alerts before closing
    datealert.innerHTML = "";
    zipalert.innerHTML = "";
    // get zip info
    const zipInfo = checkLocalStorage(zip);
    // get lat and long coordinates for sunset
    const lat = zipInfo.lat;
    const lng = zipInfo.lng;
    // get elements for closing accordian section
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    const icon = document.getElementById('menuIconP');
    const icon2 = document.getElementById('menuIconP2');
    const sections = document.getElementsByClassName('open');
    // get sunrise and sunset times
    sunset(date, lat, lng); // function in model section
    // close accordian first section and open next section
    if (back.classList.contains('hide')) {
        back.classList.remove('hide');
    }
    back.classList.add('expand');
    next.classList.add('hide');
    if (next.classList.contains('expand')) {
        next.classList.remove('expand');
    }
}

// closes second accordian section and opens first one of plan popup
function accordianBack() {
    // get elements for opening accordian sections
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    // get elements to remove alerts
    const datealert = document.getElementById('zipAlert4');
    const zipalert = document.getElementById('zipAlert5');
    // open and close accordian sections
    back.classList.add('hide');
    if (back.classList.contains('expand')) {
        back.classList.toggle('expand');
    }
    next.classList.add('expand');
    if (next.classList.contains('hide')) {
        next.classList.toggle('hide');
    }
    // remove alert info if backing up to previous screen.
    datealert.innerHTML = "";
    zipalert.innerHTML = "";
}
// opens plan page.  toggled from open2ndPlanPopup and calcRide
function openPlanPage() {
    // gets plan page element
    let plan = document.getElementById('plan');
    // opens the plan page
    if (!plan.classList.contains('openPlan'))
        plan.classList.add('openPlan');

}

// opens the plan popup from the plan page
function open2ndPlanPopup() {
    // get elements to reset accordian to first page
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    // resets accordian
    if (!back.classList.contains('hide')) {
        back.classList.add('hide');
    }
    if (back.classList.contains('expand')) {
        back.classList.remove('expand');
    }
    if (next.classList.contains('hide')) {
        next.classList.remove('hide');
    }
    if (!next.classList.contains('expand')) {
        next.classList.add('expand');
    }
    // once accordian has been reset close plan page
    next.addEventListener('transitionend', function () {
        document.getElementById('plan').classList.remove('openPlan');
    });
}
// resets everything back to the original settings and closes plan page to home screen
function closePlan() {
    // reverts popup and home page buttons back to original
    closePlanPopup();
    // gets elements for resetting accordian
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    const plan = document.getElementById('plan');
    // resets accordian if not already reset
    if (!back.classList.contains('hide')) {
        back.classList.add('hide');
    }
    if (back.classList.contains('expand')) {
        back.classList.remove('expand');
    }
    if (next.classList.contains('hide')) {
        next.classList.remove('hide');
    }
    if (!next.classList.contains('expand')) {
        next.classList.add('expand');
    }
    // once accordian resets, plan page is closed
    next.addEventListener('transitionend', function () {
        document.getElementById('plan').classList.remove('openPlan');
    });
    // in case accordian is already reset, close plan page
    if (plan.classList.contains('openPlan')) {
        plan.classList.remove('openPlan');
    }
}

// actually closes the popup
function closePlanPopup() {
    // get elements by id

    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b1H2 = document.getElementById('b1H2');
    const popup = document.getElementById('popup');


    // add classes to close elements of plan popup
    popup.classList.add('closePop');
    b1.classList.add("b1Ungrow");
    b2.classList.add("b2Unshrink");
    b3.classList.add("b3Unshrink");
    b1H2.classList.add("HeadingTopUnmove");
    // when animation is finished, remove classes that close popup
    b3.addEventListener('animationend', function () {
        b2.classList.remove('b2Unshrink');
        b1.classList.remove('b1Ungrow');
        b3.classList.remove('b3Unshrink');
        b1H2.classList.remove("HeadingTopUnmove");
        popup.classList.remove('closePop');
    });
    // remove classes that opened the popup if present
    const advice = document.getElementById('advice2');
    if (advice.classList.contains('show')) {
        advice.classList.remove('show');
    }
    if (popup.classList.contains('openPop')) {
        popup.classList.remove('openPop');
    }
    if (b1.classList.contains('b1Grow')) {
        b1.classList.remove("b1Grow");
    }
    if (b2.classList.contains('b2Shrink')) {
        b2.classList.remove("b2Shrink");
    }
    if (b3.classList.contains('b3Shrink')) {
        b3.classList.remove('b3Shrink');
    }
    if (b1H2.classList.contains('headingTop')) {
        b1H2.classList.remove('headingTop');
    }
}

/*********************************
 * routes
 ********************************/
/*When get routes is clicked,
 * Popup opens to ask for zipcode.
 * List of previous zipcodes and option to add zipcode.
 * If add zipcode, call get function to get lat/long.
 * Store lat/long/city/state/zip in local storage. */

// When Plan Your Ride button is clicked, slides 2 buttons down and opens popup
function openRoutePopUp() {
    document.getElementById('newZip').value = "";
    document.getElementById('zipAlert').innerHTML = "";
    // get elements for select list
    const parent = document.getElementById('zipParent');
    // get elements for opening popup
    const popup = document.getElementById('popup2');

    // get elements for moving home buttons and title
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b2H2 = document.getElementById('b2H2');
    // creates select list for plan popup
    createZipSelect(parent); // function in model


    // move home buttons and title
    b1.classList.add("b1Shrink");
    b2.classList.add("b2Grow");
    b3.classList.add('b3Shrink2');
    b2H2.classList.add('headingTop');

    // display popup
    popup.classList.add('openPop');
    if (popup.classList.contains('closePop')) {
        popup.classList.remove('closePop');
    }
}

function openRoutePopUp2() {
    document.getElementById('route').classList.remove('openPlan');
    const popup = document.getElementById('popup2');
    popup.classList.add('openPop');
    if (popup.classList.contains('closePop')) {
        popup.classList.remove('closePop');
    }
}

function closeRoutePopUp() {
    // close zip popup
    const popup = document.getElementById('popup2');
    popup.classList.add('closePop');
    if (popup.classList.contains('openPop')) {
        popup.classList.remove('openPop');
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

// closes zip popup open.

function openRoute() {
    let plan = document.getElementById('route');
    if (!plan.classList.contains('openPlan')) {
        plan.classList.add('openPlan');
    }

}

function closeRoute() {

    let plan = document.getElementById('route');
    // get elements for moving home buttons and title
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b2H2 = document.getElementById('b2H2');
    const popup = document.getElementById('popup2');
    b1.classList.add("b1Unshrink");
    b2.classList.add("b2Ungrow");
    b3.classList.add("b3Unshrink2");
    b2H2.classList.add("HeadingTopUnmove");
    // when animation is finished, remove classes that close popup
    b3.addEventListener('animationend', function () {
        b2.classList.remove('b2Ungrow');
        b1.classList.remove('b1Unshrink');
        b3.classList.remove('b3Unshrink2');
        b1H2.classList.remove("HeadingTopUnmove");
        popup.classList.remove('closePop');
    });
    // remove classes that opened the popup if present

    if (popup.classList.contains('openPop')) {
        popup.classList.remove('openPop');
    }
    if (!popup.classList.contains('closePop')) {
        popup.classList.add('closePop');
    }
    if (b2H2.classList.contains('headingTop')) {
        b2H2.classList.remove("headingTop");
    };

    if (b1.classList.contains('b1Shrink')) {
        b1.classList.remove("b1Shrink");
    };
    if (b2.classList.contains('b2Grow')) {
        b2.classList.remove("b2Grow");
    };
    if (b3.classList.contains('b3Shrink2')) {
        b3.classList.remove("b3Shrink2");
    };


    if (plan.classList.contains('openPlan')) {
        plan.classList.remove('openPlan');
    };

}
/*********************************
 * bike
 ********************************/
 function openBike() {
     // get elements for moving home buttons and title
     const b1 = document.getElementById('b1');
     const b2 = document.getElementById('b2');
     const b3 = document.getElementById('b3');
     const b3H2 = document.getElementById('b3H2');
     const bikeBox = document.getElementById('bikeBox');
     fillBikePage();
     // move home buttons and title
     b1.classList.add("b1Shrink2");
     b2.classList.add("b2Shrink2");
     b3.classList.add('b3Grow');
     b3H2.classList.add('headingTop');
     bikeBox.classList.add('openPop')
     if (bikeBox.classList.contains('closePop')) {
       bikeBox.classList.remove('closePop');
     }
 }

 function closeBike() {

   const b1 = document.getElementById('b1');
   const b2 = document.getElementById('b2');
   const b3 = document.getElementById('b3');
   const b2H2 = document.getElementById('b3H2');
   const popup = document.getElementById('bikeBox');
   popup.classList.add('closePop');

   b3.classList.add("b3Ungrow");
   b2.classList.add("b2Unshrink2");
   b1.classList.add("b1Unshrink2");
   b2H2.classList.add("headingTopDown");

   // when animation is finished, remove classes that close popup
   b1.addEventListener('animationend', removeClass);
   // remove classes that opened the popup if present

   if (b2H2.classList.contains('headingTop')) {
       b2H2.classList.remove("headingTop");
   };

   if (b1.classList.contains('b1Shrink2')) {
       b1.classList.remove("b1Shrink2");
   };
   if (b2.classList.contains('b2Shrink2')) {
       b2.classList.remove("b2Shrink2");
   };
   if (b3.classList.contains('b3Grow')) {
       b3.classList.remove("b3Grow");
   };

   if (popup.classList.contains('openPop')) {
     popup.classList.remove('openPop');
   }
   if (popup.classList.contains('closePop')) {
      popup.classList.remove('closePop');
    }
    if (b2H2.classList.contains('headingTopDown')) {
      b2H2.classList.remove('headingTopDown');
    }
  }
function removeClass() {
      b2.classList.remove('b2Unshrink2');
      b1.classList.remove('b1Unshrink2');
      b3.classList.remove('b3Ungrow');
      popup.classList.remove('openPop');
      popup.classList.remove('closePop');
      b2H2.classList.remove('headingTopDown');
      b1.removeEventListener('animationend', removeClass);
  };

  function openBikePopUp() {
    fillBikePop();
    const bikePop = document.getElementById('popup4');
    const bikeBox = document.getElementById('bikeBox')
    bikeBox.classList.remove('openPop');
    bikePop.classList.add('openPop');
    if (bikePop.classList.contains('closePop')) {
      bikePop.classList.remove('closePop');
    }
  }

  function closeBikePopupToBike() {

    const bikeName = document.getElementById('bikeName').value;
    const bikeBrand = document.getElementById('bikeBrand').value;
    const bikeModel = document.getElementById('bikeModel').value;
    const bikeColor = document.getElementById('bikeColor').value;
    const bikeColor2 = document.getElementById('bikeColor2').value;
    const bikeYear = document.getElementById('bikeYear').value;
    const bikeSerial = document.getElementById('bikeSerial').value;
    const bikeSize = document.getElementById('bikeSize').value;
    const bikeTire = document.getElementById('bikeTire').value;
    // save input to assoc timeArray
    let bike = {name: bikeName, brand: bikeBrand, model: bikeModel, color: bikeColor,
      color2: bikeColor2, year: bikeYear, serial: bikeSerial, size: bikeSize, tire: bikeTire};
    bike = JSON.stringify(bike);
    localStorage.setItem('bike', bike);
    openBikeFromBikePop();
}

function openBikeFromBikePop() {
    fillBikePage();
    const bikePop = document.getElementById('popup4');
    const bikeBox = document.getElementById('bikeBox');
    bikeBox.classList.add('openPop');
    bikeBox.classList.remove('closePop');
    if (bikePop.classList.contains('openPop')) {
        bikePop.classList.remove('openPop');
    }
  }
/*********************************
 * model
 ********************************/
// fills info in on bike Page
function fillBikePop() {
  if (localStorage['bike']) {

    const bikeInfo = JSON.parse(localStorage.getItem('bike'));
    document.getElementById('bikeName').value = bikeInfo.name;
    document.getElementById('bikeBrand').value = bikeInfo.brand;
    document.getElementById('bikeModel').value = bikeInfo.model;
    document.getElementById('bikeColor').value = bikeInfo.color;
    document.getElementById('bikeColor2').value = bikeInfo.color2;
    document.getElementById('bikeYear').value = bikeInfo.year;
    document.getElementById('bikeSerial').value = bikeInfo.serial;
    document.getElementById('bikeSize').value = bikeInfo.size;
    document.getElementById('bikeTire').value = bikeInfo.tire;
  } else {
    return;
  }
}
function fillBikePage() {
  if (localStorage['bike']) {

    const bikeInfo = JSON.parse(localStorage.getItem('bike'));
    document.getElementById('yourBike').innerHTML = bikeInfo.name;
    document.getElementById('yourBrand').innerHTML = bikeInfo.brand;
    document.getElementById('yourModel').innerHTML = bikeInfo.model;
    document.getElementById('yourColor').innerHTML = bikeInfo.color;
    document.getElementById('yourColor2').innerHTML = bikeInfo.color2;
    document.getElementById('yourYear').innerHTML = bikeInfo.year;
    document.getElementById('yourSerial').innerHTML = bikeInfo.serial;
    document.getElementById('yourSize').innerHTML = bikeInfo.size;
    document.getElementById('yourTire').innerHTML = bikeInfo.tire;
  } else {
    return;
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
    op1.innerHTML = 'Choose Zip Code';
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
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=&components=postal_code:" +
        zip + "&key=AIzaSyCClyBxAN4UiXaciq3REHpDt1uBNKO7qa8";
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
    const zipInfo = {
        'lat': lat,
        'lng': lng,
        'city': city,
        'state': state,
        'zip': zip
    };
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
    let url = "https://www.google.com/maps/embed/v1/view?key=AIzaSyC1_5qoxKTYV0kfCSCm6q-UV8dGp4aCK7w&center=" +
        lat + "," + lng + "&zoom=14&maptype=roadmap";
    document.getElementById('map').src = url;
}


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


function newLocation(zip) {
    // get zipcode and format it in url

    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=&components=postal_code:" +
        zip + "&key=AIzaSyCClyBxAN4UiXaciq3REHpDt1uBNKO7qa8";
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
    const zipInfo = {
        'lat': lat,
        'lng': lng,
        'city': city,
        'state': state,
        'zip': zip
    };
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

            if (zip == addZip) { // 2a.1 If match in local storage
                zipInfo = zipList[i];
                return zipInfo;
            }
        }
        // if no match found in forloop, get new zip info
        zipInfo = newLocation(addZip);
        if (zipInfo == "ZERO_RESULTS" || zipInfo == '') { //2a.2 if error with get zip ir if zip invalid
            document.getElementById('zipAlert').classList.toggle('alert');
            return zipInfo;
        } else {
            // return new zip info when no error occured.
            zipList.push(zipInfo);
            localStorage.setItem(zipList, JSON.stringify(zipList));
            return zipInfo;
        }


    } else { // 2b. if localStorage doesn't have ziplist
        let zipInfo = newLocation(addZip);
        zipList = {
            lat: zipInfo.lat,
            lng: zipInfo.lng,
            city: zipInfo.city,
            state: zipInfo.state,
            zip: zipInfo.zip
        };
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

function calcRide(choice) {
    // get inputs
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
    const sunrise = sunInfo[2];
    const sunset = sunInfo[3];
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    // calculate based on choice
    if (choice == "start") {
        start = calcStart(end, distance, speed);
        end = amPm(end);
    } else if (choice == "end") {
        end = calcEnd(start, distance, speed);
        start = amPm(start);
    } else {
        distance = calcDistance(start, end, speed);
        start = amPm(start);
        end = amPm(end);
    }

    // put all info into plan page
    document.getElementById('planDate').innerHTML = date;
    document.getElementById('planCity').innerHTML = city;
    document.getElementById('planStart').innerHTML = start;
    document.getElementById('planEnd').innerHTML = end;
    document.getElementById('planDistance').innerHTML = distance;
    document.getElementById('planSpeed').innerHTML = speed;
    document.getElementById('plannedSunrise').innerHTML = sunrise;
    document.getElementById('plannedSunset').innerHTML = sunset;
    // reset planpopup to original settings,
    // close popup

    // open plan page
    openPlanPage();

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
            //get sunrise and sunset and convert to local time
            let sunrise = response.results.sunrise;
            let milSunrise = formatTime(sunrise, date);
            let sunset = response.results.sunset;
            let milSunset = formatTime(sunset, date);
            //Use amPm function to convert from military time.
            sunrise = amPm(milSunrise);
            sunset = amPm(milSunset);
            //milSunset = milTime(sunset);
            //milsunset = amPm(sunset);
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

function formatTime(time, date) {
   // add a zero if hour is less than 12
    const ch2 = time.charAt(1);
    if (ch2 == ":") {
        time = "0" + time;
    }
    // variables
    let ampm = 0;
    let hour = "";
    let min = "";
    hour = parseInt(time.substr(0,2));
    // get hours and change to military time
    if ((time.charAt(9) == "P" && hour != 12) || (time.charAt(9) == "A" && hour == 12)) {
      ampm = 12;
    }

    hour += ampm;
    if (hour == 24) {
      hour = 0;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }

    // get the minutes
    min = time.substr(3,2);
    // format as yyyy-mm-ddThh:mm to create to date object
    const formatted = date + "T" + hour + ":" + min;
    const utcDate = new Date(formatted);
    const offset = utcDate.getTimezoneOffset()/60;
    hour -= offset;
    if (hour < 0) {
      hour += 24;
    } else if (hour > 23){
      hour -= 24;
    } else {
      hour = hour;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    const newTime = hour + ":" + min;
    return newTime;




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
function amPm(milTime) {
    timeArray = milTime.split(":");
    let hour = parseInt(timeArray[0]);
    let newTime;
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

    let minutes = timeArray[1];

    newTime = hour + ":" + minutes + " " + amPm;
    return newTime;
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

/*********************************
 * unused
 *********************************/
/*function addNewZipToPlan() {
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
         openPlanPage();

        }
}*/

/*var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {

        center: {lat: 43.8231, lng: 43.8231},
        zoom: 14

    });
    //var bikeLayer = new google.maps.BicyclingLayer();
    //bikeLayer.setMap(map);
}*/
