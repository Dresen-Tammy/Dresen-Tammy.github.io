/* 
 * Javascript for topic1.html
 * Loops, Conditionals, Statements, Functions, Parameters, Variables, Arrays, 
 * Associative Arrays
 */


// array- create array
    var dogs = ["Fido", "Spot", "Fluffy", "Spike"];
    var cats = new Array(3);
    cats[0] = "Felix"
    cats[1] = "Tom";
    cats[2] = "Garfield";
    
    // associative array - create associative array and display in div
    var john = {firstName: "John", lastName: "Doe", age: "42", sex: "male", marStatus: "single"};
    var info = john.firstName + " " + john["lastName"] + " is " + john.age + " years old.";
    document.getElementById("assoc").innerHTML = info;
    
    // for in loop - use for in loop to loop through associative array
    var output = "<br>John-<br>";
    var n;
    for (n in john) {
        output += n + ": " + john[n] + "<br>";
    }
    document.getElementById("output").innerHTML = "for in output = " + output;
    
// for loop- loop through numbers 0-9 to create string
    var message = "";
    for (var i = 0; i < 10; i++) {
        message += i + ", ";

    }
    document.getElementById("result1").innerHTML = "for loop result = " + message;
    
// while loop- loop through cats array and display results
    var j = 0;
    message = "";
    var cat = "";
    while (j < cats.length) {
        cat = cats[j];
        message += cat + ", ";
        j++;
    }
    document.getElementById("result2").innerHTML = "while loop result = " + message;
    
    // do while loop- try do-while loop with false condition
    var k = 3;
    message = "";
    var dog = "";
    do {
        dog = dogs[k];
        message += dog + ", ";
        k++;
    } while (k < 3);
    document.getElementById("result3").innerHTML = "do while loop result = " + message;
    
// if statement- use if statement to display a message
    var color = 3;
    if (color < 5) {
        document.getElementById("output2").innerHTML = "The sky is blue.";
    }
    
    // if else statement- use if else statement to choose between two messages
    var number = 7;
    if (number < 5) {
        document.getElementById("condition2").innerHTML = "The number " + number + " is less than 5";
    } else {
        document.getElementById("condition2").innerHTML = "The number " + number + " is greater than 5";
    }
    
    // if else if statement- pick random number, then classify using if else if
    var randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
    if (randomNumber <= 25) {
        document.getElementById("condition3").innerHTML = "The number " + randomNumber + " is between 1 and 25";
    } else if (randomNumber <= 50) {
        document.getElementById("condition3").innerHTML = "The number " + randomNumber + " is between 25 and 50";
    } else if (randomNumber <= 75) {
        document.getElementById("condition3").innerHTML = "The number " + randomNumber + " is between 50 and 75";
    } else {
        document.getElementById("condition3").innerHTML = "The number " + randomNumber + " is between 75 and 100";
    }
    // switch- use switch to display message based on input
    function rainbow() {
        var rainbow = document.getElementById("colorInput").value;
        rainbow = rainbow.toUpperCase();
        var text = "";
        switch (rainbow) {
            case "RED":
                text = "I have a dream that one day on the red hills of Georgia, the sons of former slaves and the sons of former slave owners will be able to sit together at the table of brotherhood.<br> -Martin Luther King Jr., www.brainyquote.com ";
                break;
            case "ORANGE":
                text = "I like to peel it and share it with friends. You can spread the love with an orange.<br> - Gina Rodriguez, www.brainyquote.com";
                break;
            case "YELLOW":
                text = "The people who live in a golden age usually go around complaining how yellow everything looks.<br> - Randall Jarrell, www.brainyquote.com";
                break;
            case "GREEN":
                text = "Life expectancy would grow by leaps and bounds if green vegetables smelled as good as bacon.<br> - Doug Larson, www.brainyquote.com";
                break;
            case "BLUE":
                text = "When I feel blue, I start breathing again.<br> -L. Frank Baum, www.brainyquote.com";
                break;
            case "INDIGO":
                text = "Hold on to your divine blush, your innate rosy magic, or end up brown. Once you're brown, you'll find out you're blue. As blue as indigo. And you know what that means. Indigo. Indigoing. Indigone.<br> - Tim Robbins, Jitterbug Perfume";
                break;
            case "VIOLET":
                text = "Forgiveness is the fragrance that the violet sheds on the heel that has crushed it.<br> - Mark Twain, www.brainyquote.com";
                break;
            default:
                text = "Be thou the rainbow in the storms of life. The evening beam that smiles the clouds away, and tints tomorrow with prophetic ray.<br> -George Gordon Byron www.goodreads.com";
        }
        document.getElementById("condition4").innerHTML = text;
    }
    // dog years function - figure person's age in dog years
    function dogYears(name, age) {
        if (age < 15) {
            years = 0;
        } else if (age < 24) {
            years = 1;
        } else {
            years = Math.floor(((age - 23) / 5) + 1);
        }
        return years;
    }
    function getDogYearInput() {
        var age = parseInt(document.getElementById("ageInput").value);
        var name = document.getElementById("nameInput").value;
        if (!age || !name) {
            document.getElementById("output3").innerHTML = "Error: Please enter a name and number.";
        } else {
            var years = dogYears(name, age);
            document.getElementById("output3").innerHTML = name + ", you are in the same stage of life as a  " + years + " year old dog.";
        }
    }
