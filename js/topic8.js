/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function mover2() {
    let updateMove4 = document.getElementById('move4');
    let updateIcon = document.getElementById('menuIcon');
    
       updateMove4.classList.toggle('moveIt');
       updateIcon.classList.toggle('iconOpen');
    }
function mover3() {
    // get icon element and toggle class
    let updateIcon2 = document.getElementById('menuIcon2');
    updateIcon2.classList.toggle('iconOpen');
    // get classlist for move5 element
var move5 = document.getElementById('move5').classList;
// determine which class to add or remove.
if (!move5.contains('moveIt2') && (!move5.contains('moveIt3'))) {
    move5.add('moveIt2');
} else if (move5.contains('moveIt2')) {
    move5.add('moveIt3');
            move5.remove('moveIt2');
} else if (move5.contains('moveIt3')) {
    move5.add('moveIt2');
    move5.remove('moveIt3');
    }
}
    
    