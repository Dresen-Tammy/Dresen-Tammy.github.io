/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// creat object
let pizza = {
    name: "Pizza",
    foodGroup: "junk food", 
    yummy: true,
    calories: 650,
    toppings: ["Peperoni","Sausage","Cheese","Olives","Mushrooms"],
    message: function() {return "Yummy in my tummy!";}
};

// json stringify to convert pizza
pizza = JSON.stringify(pizza);

document.getElementById('pizza').innerHTML = pizza;

// json string
let milkshake = '{"name":"Milkshake","foodGroup":"dessert","yummy":true,"calories":800,"toppings":["Butterfinger","Oreos","Snickers"]}';
// parse string

milkshake = JSON.parse(milkshake);
//for in loop to display object
let key;
let milkshakeObject = "";
for (key in milkshake) {
    milkshakeObject += key + ": " + milkshake[key] + "<br>";
}
document.getElementById('milkshake').innerHTML =  milkshakeObject;

const numbers = {1: "1", 2: "2", 3: "3", 4: "4", 5: "5"};
const numbersString = JSON.stringify(numbers);
let message = "";

const numbersReviver = JSON.parse(numbersString, function(key, value) {

    if (key > 0 && key < 6) {
        return value * 5; 
    } else { return value;
    }});

for (key in numbersReviver) {
    message += key + ": " + numbersReviver[key] + ", ";
}
 

document.getElementById("numbersReviver").innerHTML = message;
