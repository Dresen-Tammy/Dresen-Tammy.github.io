
//On load, add event listeners to all elements needed

addEventListener('load', function () {
    const scaleObj2 = document.getElementById('scaleObject2');
    scaleObj2.addEventListener('click', scale1);

    const scaleObj = document.getElementById('scaleObject');
    scaleObj.addEventListener('click', scale4);
    const scaleObj3 = document.getElementById('scaleObject3');
    scaleObj3.addEventListener('click', scale3);
    // event listener for flashcards
    const questions = document.getElementsByClassName('card');
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('mouseover', flip);
        questions[i].addEventListener('mouseout', flip2);
        questions[i].addEventListener('click', stopFlip);
    const images = document.getElementsByClassName('slides');
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('animationend', removeClass);
    }
    }

}

);
// functions for scale demo
function scale1() {
    const scaleObj2 = document.getElementById('scaleObject2');
    scaleObj2.classList.toggle('bigger');
}

function scale3() {
    const scaleObj3 = document.getElementById('scaleObject3');
    scaleObj3.classList.toggle('wider');
}
function scale4() {
    const scaleObj = document.getElementById('scaleObject');
    scaleObj.classList.toggle('taller');
}
// functions for translate demo
function trans1() {
    const transObject = document.getElementById('transObject1');
    transObject.classList.toggle('trans1');
}

function trans2() {
    const transObject = document.getElementById('transObject2');
    transObject.classList.toggle('trans2');
}
function trans3() {
    const transObject = document.getElementById('transObject3');
    transObject.classList.toggle('trans3');
}
function trans4() {
    const transObject = document.getElementById('transObject4');
    transObject.classList.toggle('trans4');

}// functions for skew demo
function skew1() {
    const skw1 = document.getElementById('skw1');
    skw1.classList.toggle('skew1');
}
function skew2() {
    const skw2 = document.getElementById('skw2');
    skw2.classList.toggle('skew2');
}
function skew3() {
    const skw3 = document.getElementById('skw3');
    skw3.classList.toggle('skew3');
}
// functions for matrix and multiple demos
function mx1() {
    const matrix1 = document.getElementById('matrix1');
    matrix1.classList.toggle('matrix1');
}
function mx2() {
    const matrix2 = document.getElementById('matrix2');
    matrix2.classList.toggle('matrix2');
}

// functions for flashcards
// on mouseover add class
function flip(e) {
    e.currentTarget.classList.add('flipIt');

}
// on mouseout remove class
function flip2(e) {
    e.currentTarget.classList.remove('flipIt');
}

// on click, either remove event listeners and remove class or opposite
function stopFlip(e) {
    const card = e.currentTarget;
    if (card.classList.contains('correct')) {
        card.addEventListener('mouseover', flip);
        card.addEventListener('mouseout', flip2);
        card.classList.remove('correct');
    } else {
        card.removeEventListener('mouseover', flip);
        card.removeEventListener('mouseout', flip2);
        card.classList.add('correct');
    }
}

// 



function slideshow() {
    const slide12 = document.getElementsByClassName('slide');
    let i = 0;

    for (i = 0; i < slide12.length; i++) {
        
        if (i === 0) {
            if (slide12[slide12.length-1].classList.contains('show')) {
                slide12[slide12.length-1].classList.remove('show');
            }
        }
        if (i !== 0) {
            if (slide12[i - 1].classList.contains('show')) {
                slide12[i - 1].classList.remove('show');
            }
        }
        slide12[i].classList.add('show');



        setTimeout(slideshow, 2000);
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
    var dots = document.getElementsByClassName('dot');
    var i = 0;
    // add activeImg class to the selected image
    for (i=0; i< images.length; i++) {
        if (images[i].classList.contains('z')) {
            images[i].classList.remove('z');
        }
    } 
    images[n-1].classList.add('z');
    images[n - 1].classList.add('activeImg2');
    
    for (i=0; i< dots.length; i++) {
        if (dots[i].classList.contains('active')) {
            dots[i].classList.remove('active');
        }
    }
    
   
    
    
    // add active class to the selected dot.
    dots[n-1].classList.add('active');
    
   
}
function removeClass(e) {
    // get all the slides
    const images = document.getElementsByClassName('slides');
    // get the current slide id
    const current = e.currentTarget.id;
    
    
     // for loop to remove activeImg from all slides that have it except current one.
        for (i = 0; i < images.length; i++) {
            // if slide has activeImg2 class
            if (images[i].classList.contains('activeImg2')) {
                // get the id of the class
                let j = images[i].id;
                // if not the current slide
                if (current != j) {
                // remove active class
                images[i].classList.remove('activeImg2');
                }
            }
        }
    };

    
    
