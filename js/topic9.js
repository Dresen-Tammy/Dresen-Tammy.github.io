/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// add load event listener, will cause alert on page load.
 addEventListener('load', function() {
     alert('This alert was called by a load event listener');
  });

// add click event that changes text on click
  const clickMe = document.getElementById('clickMe');
  clickMe.addEventListener('click', clicked);
  
function clicked() {
    clickMe.innerHTML = "You clicked on me.";
}

// add dblclick event that triggers animation
const dbl = document.getElementById('dbl');
const bow = document.getElementById('bow');

function rainbow() {
    bow.classList.toggle('rainbow'); 
}
dbl.addEventListener('dblclick', rainbow);



// add mousedown and mouseup event that makes div appear
const mouse = document.getElementById('mouse');

mouse.addEventListener('mouseover', down);
mouse.addEventListener('mouseout', up);
const secret = document.getElementById('secret');
function down() {
    secret.classList.add('reveal');
}
function up() {
    secret.classList.remove('reveal');
}

// add mouseover and mouseout event that changes image
const kitten = document.getElementById('kitten');
kitten.addEventListener('mousedown', function() {
    kitten.src = 'lion.jpg';
});
kitten.addEventListener('mouseup', function() {
    kitten.src = 'kitten.jpg';
    
});

// add get time on button click
function time() {
    const date = new Date();
    let hours = date.getHours();
    let amPm = 'AM'
    if (hours >= 12 && hours < 24) {
        amPm = 'PM'
    } 
    if (hours > 12) {
        hours -= 12;
    }
    let minutes = date.getMinutes();
    
    document.getElementById('timeNow').innerHTML = "The time is " + hours + ":" + minutes + " " + amPm;
    
}

// add keydown event
addEventListener('keydown', steelback);
const html = document.getElementsByTagName('html')[0];
function steelback() {
html.classList.toggle('colorSteel');
}
// add keyup event
addEventListener('keyup', bluecolor);
const keysec = document.getElementById('keysection');
function bluecolor() {
    keysec.classList.toggle('colorLightSteel');
}

// add keypress event
let keys = document.getElementById('keystroke');

addEventListener('keypress', keystrokes);
function keystrokes(event) {
    let key = event.key;
    keys.innerHTML += key;
}

// add touchstart and touchend events
// add mousedown and mouseup event that makes div appear
const touches = document.getElementById('touches');

touches.addEventListener('mouseover', down2);
touches.addEventListener('touchstart', down2);
touches.addEventListener('mouseout', up2);
touches.addEventListener('touchend', up2);
const secret2 = document.getElementById('secret2');
function down2() {
    secret2.classList.add('reveal');
    secret2.preventDefault();
}
function up2() {
    secret2.classList.remove('reveal');
}
// add animation event listeners to rainbow
// add dblclick event that triggers animation
const dbl2 = document.getElementById('dbl2');
const bow2 = document.getElementById('bow2');
const clouds = document.getElementsByClassName('cloud');
function rainbow2() {
    bow2.classList.toggle('rainbow'); 
}
dbl2.addEventListener('dblclick', rainbow2);
dbl2.addEventListener('animationend', animationReset);
function animationReset(e) {

        bow2.classList.remove('rainbow');
        for (let i = 0; i < clouds.length; i++) {
        clouds[i].classList.remove('cloudy');
    }
}


dbl2.addEventListener('animationstart', addClouds);
dbl2.addEventListener('animationiteration', addClouds2);

function addClouds() {
    clouds[0].classList.add('cloudy');
}
function addClouds2(e) {
    console.log(e.elapsedTime);
    if (e.elapsedTime <= 2) {
        clouds[1].classList.add('cloudy');
    } else {
        clouds[2].classList.add('cloudy');
    }
}

// add touch events
var dragArea = document.getElementById('dragArea');
var dragBox = document.getElementById('dragBox');
dragArea.addEventListener('touchstart', function(e) {
    dragBox.src = 'lion.jpg';
});
dragArea.addEventListener('touchmove', function(e) {
    dragBox.src = 'kittencrouch.jpg';
});
dragArea.addEventListener('touchend', function(e) {
    dragBox.src = 'kitten.jpg';
});
dragBox.addEventListener('touchenter', function(e) {
    dragBox.src = 'catinhat.jpg';
});
dragBox.addEventListener('touchleave', function(e) {
    dragBox.src = 'kitten.jpg';
});
dragArea.addEventListener('touchcancel', function(e) {
    dragBox.src = 'kitten.jpg';
});