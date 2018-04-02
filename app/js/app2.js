/* 
 * model layer
 */
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

