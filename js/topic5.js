/* 
 * Javascript for topic 5
 */

// save string to local storage.
    localStorage.setItem('name', "Tammy");
    // save key-value pair to local storage.
    localStorage.setItem('name2', "Crush")
    let colors = ['blue', 'orange', 'teal', 'black'];
    localStorage.setItem('colors', JSON.stringify(colors));
    // save associative array to local storage
    let sizes = {small: "48 cm", medium: "51 cm", large: "54 cm"};
    localStorage.setItem('sizes', JSON.stringify(sizes));
    // get string from local storage
    const myName = localStorage.getItem('name');
    // get key-value pair from local storage
    const bikeName = localStorage.getItem('name2');
    // get array from local storage
    const rainbow = JSON.parse(localStorage.getItem('colors'));
    // get associative array from local storage
    const size = JSON.parse(localStorage.getItem('sizes'));
    // set object to local storage
    let bike = {name: bikeName, color: rainbow[2], owner: myName, size: size['medium'], brand: "Specialized", };
    localStorage.setItem('bike', JSON.stringify(bike));
    // get object from local storage
    let myBike = JSON.parse(localStorage.getItem('bike'));
    // display myBike object
    let key;
    let message = "";
    for (key in myBike) {
        message += key + ": " + myBike[key] + "<br>";
    }
    document.getElementById('name').innerHTML = "myBike: </br> " + message;
