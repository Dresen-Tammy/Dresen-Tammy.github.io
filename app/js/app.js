/* 
 * Race the Sun Cycling App
 */

// set up event listeners on load
addEventListener('load', setup);
function setup() {
    // add event listener to close popup for zipcode.
    const popback = document.getElementById('popback');
    popback.addEventListener('click', closePopup);
}
// when plan a ride is clicked, opens popup to add zipcode
function openPopupRide() {
    // if local storage has zipcode stored, add value to input.
    if (localstorage.getItem('zip')) {
        const zip = localStorage.getItem('zip');
        document.getElementById('zipcode').value = zip;
    }
    // open the popup
    openPopup();
    // add event listener to button on popup
    const button = document.getElementById('zipbutton');
    button.addEventListener('click', openPlanRide);
    
}
// actually opens the popup
function openPopup() {
    const popcan = document.getElementById('popcan');
    popcan.classList.add('openPop');
    if (popcan.classList.contains('closePop')) {
        popcan.classList.remove('closePop');
    }
}
    
    // actually closes the popup
function closePopup() {
        const popcan = document.getElementById('popcan');
        popcan.classList.add('closePop');
        if (popcan.classList.contains('openPop')) {
            popcan.classList.remove('openPop');
        }
    }
    // when zipcode button is clicked after popup opens on plan a ride, opens the plan feature.
function openPlanRide() {
    const zip = document.getElementById('zipcode').value;
    
    // 
    closePopup();
    
    const button = document.getElementById('zipbutton');
    button.removeEventListener('click', openPlanRide);
}
    