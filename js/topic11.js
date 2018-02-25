/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// header that slides up on scroll.
const page = document.getElementById('body11');
window.addEventListener('scroll', function(e) {
   if(window.scrollY >= 50) {
       page.classList.add('snap');
   }  else {
       page.classList.remove('snap');
   }
});


function change (link) {
    if (page.classList.contains('snap')) {
        window.location.href = "#"+ link;
        window.scrollTo(window.scrollX, window.scrollY - 40);
    }
     else {
    window.location.href = "#"+ link;
    window.scrollTo(window.scrollX, window.scrollY - 150);
}
     }
    
// slideshow
// declare index for images
var index = 1;
// show first slide;
changeSlide(index);


// next/previous controls
function nextSlide(n) {
    var slide = index += n;
    var images = document.getElementsByClassName('slides');
    if (slide < 1) {
        n = images.length;
        index = images.length;
    } else if (slide > images.length) {
        n = 1;
        index = 1;
    } else {
        n = slide;
        index = slide;
    }

    changeSlide(n);
}


// function to change to the next slide.
function changeSlide(n) {
    // get stores and store them in an array
    var images = document.getElementsByClassName('slides');
    var i = 0;
    // for loop to remove activeImg from all slides that have it
    for (i = 0; i < images.length; i++) {
        if (images[i].classList.contains('activeImg')) {
            images[i].classList.remove('activeImg');
        }
    }

    // If number passes beginning than #of slides, loops to end of array
    
    var dots = document.getElementsByClassName('dot');
    // for loop to remove active from all dots that have it
    for (i=0; i< dots.length; i++) {
        if (dots[i].classList.contains('active')) {
            dots[i].classList.remove('active');
        }
    }
    // add activeImg class to the selected image
    images[n - 1].classList.add('activeImg');
    // add active class to the selected dot.
    dots[n-1].classList.add('active');
   
}
// accordian sections 
// onload add click events to elements with open class.

addEventListener('load', function() {
    var sections = document.getElementsByClassName('open');
    var i = 0;
    for (i = 0; i < sections.length; i++) {
        sections[i].addEventListener('click', openSection); 
    }
});
        
        
    function openSection(e) {
            var eventid = e.srcElement.parentNode;
            if (eventid.classList.contains('open')) {
            eventid.classList.toggle('expand');
        }
    };
