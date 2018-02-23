/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// add event listener to reload video when ended.
const vid = document.getElementById('vid');
vid.addEventListener('ended', function() { vid.load();});

// animate canvas tag.
const myCanvas = document.getElementById('myCanvas');
function draw() {
   var ctx = myCanvas.getContext('2d'); 
   ctx.fillStyle = 'rgba(255, 25, 52, 0.8)';
   ctx.fillRect(10, 10, 50, 100);s
}


function draw2() { 
   var ctx = myCanvas.getContext('2d'); 
   ctx.fillStyle = 'rgba(100, 99, 200, 0.5)';
   ctx.beginPath();
   ctx.arc(95,110,40,0,2*Math.PI);
   ctx.stroke();
   ctx.fill();
}

function draw3() {
   var ctx = myCanvas.getContext('2d'); 
   ctx.beginPath();
   ctx.arc(200, 200, 80, 3.13, 2*Math.PI);
   ctx.lineTo(240, 200);
   ctx.arc(200,200,40,6,1*Math.PI, 'counter-clockwise');
   ctx.lineTo(120,200);
   var grad = ctx.createRadialGradient(200,200,100,200, 200, 0 );
   grad.addColorStop(.2, 'red');
   grad.addColorStop(.3, 'yellow');
   grad.addColorStop(0.4, 'green');
   grad.addColorStop(.5, 'blue');
   grad.addColorStop(.6, 'purple');
   ctx.fillStyle=grad;
   ctx.stroke();
   ctx.fill();
   
}

function draw4() {
   var ctx = myCanvas.getContext('2d'); 
   ctx.beginPath();
   ctx.lineTo(10,270);
   ctx.lineTo(30,240);
   ctx.lineTo(50,270);
   ctx.moveTo(90,270);
   ctx.lineTo(110,240);
   ctx.lineTo(130,270);
   ctx.moveTo(170,270);
   ctx.lineTo(190,240);
   ctx.lineTo(210,270);
   ctx.moveTo(250,270);
   ctx.lineTo(270,240);
   ctx.lineTo(290,270);
   ctx.moveTo(290,280);
   ctx.lineTo(10, 280);
   ctx.stroke();
}

function draw5() {
   var ctx = myCanvas.getContext('2d');
   ctx.font = "20px Arial";
   ctx.fillText('The Canvas Element', 100, 30);
}