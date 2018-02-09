/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// select all p elements where the parent is a div.
    let select = document.getElementById('select');
    select.innerHTML = "Inserted text goes here";
    //select the third h3 on the page.
    let headings = document.getElementsByTagName('h3');
    headings[2].style.textDecoration = "underline";
    // will select the first item with that class name.
    let added = document.getElementsByClassName('added');

    added[1].innerHTML += "Content added here.";
    added[0].classList.add('bolder');
    // add new paragraph to div.
    let newPar = document.createElement('p');
    newPar.innerHTML = "2. This paragraph is appended to the end of parentDiv.";
    document.getElementById('parentDiv').appendChild(newPar);
    // add new paragraph before the div.
    let secondP = document.createElement('p');
    secondP.innerHTML = "3. This paragraph is inserted before the first child of parentDiv.";
    let parentDiv = document.getElementById('parentDiv');
    parentDiv.insertBefore(secondP, parentDiv.childNodes[0]);

    function changes() {
        // make changes to dom when button is clicked.
        let w = document.querySelectorAll("div > p");
        // select multiple types of elements, (all headings)
        let x = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        // select element with index number or for loop
        for (let i = 0; i < x.length; i++) {
            x[i].classList.add('colorBlue');
        }
        // select by class name
        let y = document.querySelectorAll('.yellow');
        y[1].classList.add('colorYellow');
        // select type of element, (title of document)
        let z = document.querySelectorAll('title');
        w[1].innerHTML = "Document Title: " + z[0].innerHTML;

    }
    function changeColor() {
        // change background color of body when button is clicked.
        document.body.classList.add('colorChange');
    }
    function removeP() {
        // remove paragraph from parent div.
        let parent = document.getElementById('parent');
        let child = parent.querySelectorAll('p');
        parent.removeChild(child[2]);

    }
    function removeP2() {
      // identify child
            let p2 = document.getElementById('p2');
            // remove child
            p2.parentNode.removeChild(p2);
    }
    function replaceFirstP() {
      let p1 = document.getElementById('p1');
      let parents = p1.parentNode;
      let p5 = document.createElement('p');
      p5.id = "p5";
      p5.innerHTML = "PARAGRAPH 5";
      parents.replaceChild(p5, p1);
    }