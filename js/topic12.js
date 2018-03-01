/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
addEventListener('load', function () {
    const scaleObj2 = document.getElementById('scaleObject2');
    scaleObj2.addEventListener('click', scale1);

    const scaleObj = document.getElementById('scaleObject');
    scaleObj.addEventListener('click', scale4);
    const scaleObj3 = document.getElementById('scaleObject3');
    scaleObj3.addEventListener('click', scale3);
    const questions = document.getElementsByClassName('card');
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('mouseover', flip);
        questions[i].addEventListener('mouseout', flip2);
        questions[i].addEventListener('click', stopFlip);
    
    }
    
        }

);

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
}
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
function mx1() {
    const matrix1 = document.getElementById('matrix1');
    matrix1.classList.toggle('matrix1');
}
function mx2() {
    const matrix2 = document.getElementById('matrix2');
    matrix2.classList.toggle('matrix2');
}
function flip(e) {
    e.currentTarget.classList.add('flipIt');
    
}
function flip2(e) {
    e.currentTarget.classList.remove('flipIt');
}
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
